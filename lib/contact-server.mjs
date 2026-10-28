import { createHash } from "node:crypto";
import { CONTACT_REASONS, CONTACT_LOCATIONS } from "./contact-options.mjs";
import { renderClinicEnquiry } from "./email-templates.mjs";

const MAX_BODY_BYTES = 16_384;
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const UUID = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
const NO_CONTROLS = /[\u0000-\u001f\u007f]/;

function response(status, error) {
  return Response.json(error ? { error } : { ok: true }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function normalizeSubmission(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const bounds = { name: 100, phone: 40, email: 254, reason: 100, date: 10, message: 2000, website: 200, formLocation: 30, submissionId: 36 };
  const values = {};
  for (const [field, max] of Object.entries(bounds)) {
    const value = input[field] ?? "";
    if (typeof value !== "string" || value.length > max) return null;
    values[field] = value.trim();
    if (field !== "message" && NO_CONTROLS.test(value)) return null;
  }
  if (values.name.length < 2 || !/^\+?[\d\s().-]+$/.test(values.phone)) return null;
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  if (values.email && !EMAIL.test(values.email)) return null;
  if (values.reason && !CONTACT_REASONS.includes(values.reason)) return null;
  if (values.website || !UUID.test(values.submissionId)) return null;
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(values.message)) return null;
  if (values.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) return null;
    const parsed = new Date(`${values.date}T12:00:00Z`);
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== values.date) return null;
  }
  if (![...Object.values(CONTACT_LOCATIONS), "other"].includes(values.formLocation)) return null;
  return values;
}

async function readBody(request) {
  const length = Number(request.headers.get("content-length"));
  if (length > MAX_BODY_BYTES) throw new Error("body-too-large");
  if (!request.body) throw new Error("empty-body");
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("body-too-large");
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

// Best-effort protection per server instance. Counters contain hashed keys,
// expire after 15 minutes and are bounded. Distributed bot protection belongs
// at the hosting edge; this Map is not shared between Vercel instances.
export function createContactRateLimiter({ limit = 5, windowMs = 15 * 60_000, now = Date.now } = {}) {
  const counters = new Map();
  return (request) => {
    const ip = (request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
    const key = createHash("sha256").update(ip).digest("hex");
    const time = now();
    for (const [stored, counter] of counters) if (counter.expires <= time) counters.delete(stored);
    const counter = counters.get(key);
    if (counter && counter.count >= limit) return false;
    if (counter) counter.count++;
    else {
      if (counters.size >= 5000) return false;
      counters.set(key, { count: 1, expires: time + windowMs });
    }
    return true;
  };
}

function emailConfiguration(env) {
  const key = env.RESEND_API_KEY?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  const to = (env.CONTACT_TO_EMAIL || "drjyoticares@gmail.com").split(",").map((value) => value.trim()).filter(Boolean);
  const senderAddress = from?.match(/<([^<>]+)>$/)?.[1] || from;
  if (!key || !from || NO_CONTROLS.test(from) || !EMAIL.test(senderAddress) || !to.length || to.length > 5 || to.some((email) => NO_CONTROLS.test(email) || !EMAIL.test(email))) return null;
  return { key, from, to };
}

export function createContactHandler({ fetchImpl = fetch, env = () => process.env, allowRequest = createContactRateLimiter() } = {}) {
  return async function handleContact(request) {
    // Browser submissions must originate on the same deployment. The API
    // never accepts arbitrary mail recipients or emits submitted data in errors.
    const origin = request.headers.get("origin");
    const publicUrl = new URL(request.url);
    // Next.js can construct request.url with its internal localhost hostname.
    // The incoming Host retains the public hostname, including preview ports.
    const host = request.headers.get("host");
    if (host) publicUrl.host = host;
    if (!origin || origin !== publicUrl.origin) return response(403, "Please submit the form from this website.");
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") || "")) return response(415, "Please submit the website form.");
    if (!allowRequest(request)) return response(429, "Too many attempts. Please try later or call the clinic.");

    let input;
    try { input = await readBody(request); }
    catch (error) { return response(error.message === "body-too-large" ? 413 : 400, "Please check the form and try again."); }
    const values = normalizeSubmission(input);
    if (!values) return response(400, "Please check your name, phone number and other form details.");

    const config = emailConfiguration(env());
    if (!config) return response(503, "Email enquiries are temporarily unavailable. Please call the clinic.");
    const template = renderClinicEnquiry(values);
    try {
      const sent = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `contact-enquiry/${values.submissionId}`,
        },
        body: JSON.stringify({
          from: config.from,
          to: config.to,
          ...template,
          ...(values.email ? { reply_to: values.email } : {}),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      const result = await sent.json().catch(() => null);
      if (!sent.ok || typeof result?.id !== "string" || !result.id) return response(502, "Your enquiry could not be sent. Please try again or call the clinic.");
      // Accepted by the provider; final inbox delivery is verified separately.
      return response(200);
    } catch {
      return response(502, "Your enquiry could not be sent. Please try again or call the clinic.");
    }
  };
}
