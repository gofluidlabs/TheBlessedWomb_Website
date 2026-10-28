"use client";

import { ArrowUpRight } from "./Icons";
import { trackEvent } from "@/lib/analytics";
import { useRef, useState } from "react";
import { CONTACT_REASONS, CONTACT_LOCATIONS } from "@/lib/contact-options.mjs";

export default function ContactForm({ idPrefix = "cf" }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const pendingSubmission = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (sending.current || !form.reportValidity()) return;
    sending.current = true;
    setStatus("sending");
    setError("");

    try {
      const values = Object.fromEntries(new FormData(form));
      values.formLocation = CONTACT_LOCATIONS[idPrefix] || "other";
      const serialized = JSON.stringify(values);
      // Reuse the key after a network failure so retrying an unchanged
      // enquiry cannot send a second email if Resend already accepted it.
      if (pendingSubmission.current?.serialized !== serialized) {
        pendingSubmission.current = { serialized, id: crypto.randomUUID() };
      }
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, submissionId: pendingSubmission.current.id }),
        signal: AbortSignal.timeout(15_000),
      });
      const data = await result.json().catch(() => null);
      if (!result.ok || data?.ok !== true) {
        throw new Error(data?.error || "Your enquiry could not be sent. Please try again or call the clinic.");
      }
      form.reset();
      pendingSubmission.current = null;
      setStatus("success");
      trackEvent("contact_form_submit", {
        form_location: values.formLocation,
      });
    } catch (cause) {
      setError(cause instanceof Error && !["TimeoutError", "AbortError", "TypeError"].includes(cause.name)
        ? cause.message
        : "We couldn't confirm your enquiry was sent. Please try again or call the clinic.");
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <>
      <h3>Book a Consultation</h3>
      <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === "sending"}>
        <div className="cf-row">
          <div>
            <label htmlFor={`${idPrefix}-name`}>Name</label>
            <input id={`${idPrefix}-name`} name="name" type="text" placeholder="Your name" autoComplete="name" minLength={2} maxLength={100} disabled={status === "sending"} required />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-phone`}>Phone Number</label>
            <input id={`${idPrefix}-phone`} name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" pattern={"\\+?[0-9\\s\\(\\).\\-]{7,40}"} title="Enter a phone number with 7 to 15 digits; spaces, brackets, hyphens and a leading + are allowed." maxLength={40} disabled={status === "sending"} required />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`}>Email</label>
          <input id={`${idPrefix}-email`} name="email" type="email" placeholder="Your email address" autoComplete="email" maxLength={254} disabled={status === "sending"} />
        </div>

        <div className="cf-row">
          <div>
            <label htmlFor={`${idPrefix}-reason`}>Reason for Visit</label>
            <select id={`${idPrefix}-reason`} name="reason" defaultValue="" disabled={status === "sending"}>
              <option value="" disabled>
                Select a reason
              </option>
              {CONTACT_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${idPrefix}-date`}>Preferred Date</label>
            <input id={`${idPrefix}-date`} name="date" type="date" disabled={status === "sending"} />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-message`}>Message</label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            maxLength={2000}
            disabled={status === "sending"}
            placeholder="Tell us a little about your requirement"
          />
        </div>

        <div className="cf-honeypot" aria-hidden="true">
          <label htmlFor={`${idPrefix}-website`}>Leave this field empty</label>
          <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={200} />
        </div>

        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Enquiry"}
          <span className="btn-ico">
            <ArrowUpRight />
          </span>
        </button>
        <div aria-live="polite" aria-atomic="true">
          {status === "success" && <p className="cf-status" role="status">Thank you. Your enquiry has been sent. The clinic will contact you to confirm availability. Your appointment is not yet confirmed.</p>}
          {status === "error" && <p className="cf-status cf-status-error" role="alert">{error} <a href="tel:+918882663284">Call +91 88826 63284</a>.</p>}
        </div>
      </form>
    </>
  );
}
