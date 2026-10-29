import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWhatsAppEnquiry } from "../lib/contact-whatsapp.mjs";

const sample = { name: "Test Visitor", phone: "+91 90000 00000", reason: "Other", date: "2026-11-05", message: "Question & answer? #1\nनमस्ते 👋", website: "" };

test("opens only the configured clinic destination and preserves encoded enquiry details", () => {
  const url = new URL(buildWhatsAppEnquiry({ ...sample, to: "attacker", email: "unused@example.com" }, "+91 88826 63284"));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/918882663284");
  assert.equal(url.hash, "");
  assert.deepEqual([...url.searchParams.keys()], ["text"]);
  const text = url.searchParams.get("text");
  for (const value of [sample.name, sample.phone, sample.reason, sample.date, sample.message]) assert.ok(text.includes(value));
  assert.doesNotMatch(text, /attacker|unused@example.com|undefined/);
  assert.match(text, /not a confirmed booking/);
});

test("supports minimal enquiries without adding missing optional data", () => {
  const text = new URL(buildWhatsAppEnquiry({ name: " Test Visitor ", phone: "9000000000" }, "918882663284")).searchParams.get("text");
  assert.match(text, /Name: Test Visitor\n/);
  assert.match(text, /Reason for visit: Not specified/);
  assert.match(text, /No additional message/);
});

test("rejects invalid input before opening WhatsApp", () => {
  for (const patch of [{ name: "A" }, { name: "Visitor\nPhone: fake" }, { phone: "abc" }, { phone: "123456" }, { phone: "1".repeat(16) }, { reason: "Invalid" }, { date: "2026-02-30" }, { date: "bad" }, { message: "x".repeat(2001) }, { website: "bot" }, { name: [] }]) {
    assert.throws(() => buildWhatsAppEnquiry({ ...sample, ...patch }, "918882663284"));
  }
  assert.throws(() => buildWhatsAppEnquiry(sample, "not configured"));
});
