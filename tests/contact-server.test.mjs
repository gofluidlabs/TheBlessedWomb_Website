import assert from "node:assert/strict";
import { test } from "node:test";
import { createContactHandler, createContactRateLimiter } from "../lib/contact-server.mjs";

const env = () => ({
  RESEND_API_KEY: "re_test_only",
  CONTACT_FROM_EMAIL: "The Blessed Womb <enquiries@example.com>",
  CONTACT_TO_EMAIL: "clinic@example.com",
});
const submission = {
  name: "Test Visitor", phone: "+91 99999 99999", email: "visitor@example.com",
  reason: "Other", date: "2026-11-10", message: "A question <script>alert(1)</script>\nThank you.",
  website: "", formLocation: "contact_page", submissionId: "58279a80-a140-4cb8-a566-2d9b987d6174",
};
const request = (values = submission, headers = {}) => new Request("https://example.com/api/contact", {
  method: "POST", headers: { origin: "https://example.com", "content-type": "application/json", ...headers },
  body: JSON.stringify(values),
});
const accepted = () => Response.json({ id: "test-email-id" });
const handler = (options = {}) => createContactHandler({ env, allowRequest: () => true, fetchImpl: accepted, ...options });

test("sends an escaped clinic email with Reply-To and a stable idempotency key", async () => {
  const calls = [];
  const handle = handler({ fetchImpl: async (url, options) => { calls.push({ url, ...options }); return accepted(); } });
  for (let i = 0; i < 2; i++) {
    const result = await handle(request());
    assert.equal(result.status, 200);
    assert.deepEqual(await result.json(), { ok: true });
    assert.equal(result.headers.get("cache-control"), "no-store");
  }
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(calls[0].headers.Authorization, "Bearer re_test_only");
  assert.equal(calls[0].headers["Idempotency-Key"], calls[1].headers["Idempotency-Key"]);
  const email = JSON.parse(calls[0].body);
  assert.deepEqual(email.to, ["clinic@example.com"]);
  assert.equal(email.reply_to, submission.email);
  assert.match(email.text, /Test Visitor/);
  assert.match(email.html, /&lt;script&gt;/);
  assert.doesNotMatch(email.html, /<script>/);
});

test("optional fields and the popup source are supported without emailing the visitor", async () => {
  let email;
  const result = await handler({ fetchImpl: async (_, options) => { email = JSON.parse(options.body); return accepted(); } })(request({
    ...submission, email: "", reason: "", date: "", message: "", formLocation: "welcome_modal", to: "attacker@example.com",
  }));
  assert.equal(result.status, 200);
  assert.equal(email.reply_to, undefined);
  assert.deepEqual(email.to, ["clinic@example.com"]);
  assert.match(email.text, /Welcome consultation form/);
});

test("rejects invalid data before contacting Resend", async (t) => {
  const invalid = [
    { name: "A" }, { phone: "abc" }, { phone: "123456" }, { phone: "1".repeat(16) },
    { email: "wrong" }, { reason: "Unknown reason" }, { date: "2026-02-30" },
    { message: "x".repeat(2001) }, { name: "Test\r\nBcc: bad@example.com" },
    { website: "bot.example" }, { submissionId: "invalid" }, { formLocation: "unknown" }, { name: [] },
  ];
  for (const patch of invalid) await t.test(JSON.stringify(patch).slice(0, 90), async () => {
    const result = await handler({ fetchImpl: () => { assert.fail("must not send"); } })(request({ ...submission, ...patch }));
    assert.equal(result.status, 400);
  });
});

test("rejects cross-origin and non-JSON submissions", async () => {
  const handle = handler({ fetchImpl: () => { assert.fail("must not send"); } });
  assert.equal((await handle(request(submission, { origin: "https://attacker.example" }))).status, 403);
  assert.equal((await handle(request(submission, { origin: "" }))).status, 403);
  assert.equal((await handle(request(submission, { "content-type": "text/plain" }))).status, 415);
});

test("accepts the public Host when Next.js uses an internal request hostname", async () => {
  const proxied = new Request("http://localhost:3107/api/contact", {
    method: "POST", headers: { host: "127.0.0.1:3107", origin: "http://127.0.0.1:3107", "content-type": "application/json" },
    body: JSON.stringify(submission),
  });
  assert.equal((await handler()(proxied)).status, 200);
  const forged = request(submission, { host: "another.example.com" });
  assert.equal((await handler()(forged)).status, 403);
});

test("rejects oversized streamed bodies and malformed JSON", async () => {
  const handle = handler();
  assert.equal((await handle(request({ ...submission, message: "x".repeat(17000) }))).status, 413);
  const malformed = new Request("https://example.com/api/contact", {
    method: "POST", headers: { origin: "https://example.com", "content-type": "application/json" }, body: "{",
  });
  assert.equal((await handle(malformed)).status, 400);
});

test("missing or invalid server configuration fails without sending", async () => {
  for (const config of [{}, { ...env(), CONTACT_FROM_EMAIL: "bad" }, { ...env(), CONTACT_TO_EMAIL: "bad" }]) {
    const result = await handler({ env: () => config, fetchImpl: () => { assert.fail("must not send"); } })(request());
    assert.equal(result.status, 503);
  }
});

test("provider rejection, quota limits, invalid responses and network failure never report success", async () => {
  for (const fetchImpl of [
    () => Response.json({ message: "secret provider error" }, { status: 422 }),
    () => Response.json({ message: "quota exceeded" }, { status: 429 }),
    () => Response.json({}),
    () => new Response("not JSON"),
    () => { throw new Error("secret network details"); },
    () => { throw new DOMException("timeout", "TimeoutError"); },
  ]) {
    const result = await handler({ fetchImpl })(request());
    assert.equal(result.status, 502);
    assert.doesNotMatch(JSON.stringify(await result.json()), /secret|re_test_only/);
  }
});

test("rate limiting prevents sends and expires independently per IP", async () => {
  let time = 0;
  const allowRequest = createContactRateLimiter({ limit: 2, windowMs: 100, now: () => time });
  const handle = handler({ allowRequest });
  assert.equal((await handle(request())).status, 200);
  assert.equal((await handle(request())).status, 200);
  assert.equal((await handle(request())).status, 429);
  assert.equal((await handle(request(submission, { "x-forwarded-for": "192.0.2.2" }))).status, 200);
  time = 100;
  assert.equal((await handle(request())).status, 200);
});
