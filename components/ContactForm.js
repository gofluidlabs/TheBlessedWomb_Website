"use client";

import { ArrowUpRight } from "./Icons";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";
import { CONTACT_REASONS, CONTACT_LOCATIONS } from "@/lib/contact-options.mjs";
import { buildWhatsAppEnquiry } from "@/lib/contact-whatsapp.mjs";
import { CLINIC } from "@/lib/seo";

export default function ContactForm({ idPrefix = "cf" }) {
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setError("");
    try {
      const values = Object.fromEntries(new FormData(form));
      const url = buildWhatsAppEnquiry(values, CLINIC.phone);
      // Keep this synchronous with the click so browsers can open a new tab.
      // noopener/noreferrer may return null even when it opens successfully.
      window.open(url, "_blank", "noopener,noreferrer");
      setWhatsappUrl(url);
      trackEvent("whatsapp_click", {
        form_location: CONTACT_LOCATIONS[idPrefix] || "other",
      });
    } catch (cause) {
      setWhatsappUrl("");
      setError(cause instanceof Error ? cause.message : "WhatsApp could not open. Please call the clinic.");
    }
  }

  return (
    <>
      <h3>Book a Consultation</h3>
      <form className="contact-form" onSubmit={handleSubmit} onChange={() => { setWhatsappUrl(""); setError(""); }} aria-describedby={`${idPrefix}-whatsapp-note`}>
        <p className="cf-note" id={`${idPrefix}-whatsapp-note`}>Your details will open in WhatsApp for {CLINIC.name}. Review the message and tap Send there to send your enquiry.</p>
        <div className="cf-row">
          <div>
            <label htmlFor={`${idPrefix}-name`}>Name</label>
            <input id={`${idPrefix}-name`} name="name" type="text" placeholder="Your name" autoComplete="name" minLength={2} maxLength={100} required />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-phone`}>Phone Number</label>
            <input id={`${idPrefix}-phone`} name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" pattern={"\\+?[0-9\\s\\(\\).\\-]{7,40}"} title="Enter a phone number with 7 to 15 digits; spaces, brackets, hyphens and a leading + are allowed." maxLength={40} required />
          </div>
        </div>

        <div className="cf-row">
          <div>
            <label htmlFor={`${idPrefix}-reason`}>Reason for Visit</label>
            <select id={`${idPrefix}-reason`} name="reason" defaultValue="">
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
            <input id={`${idPrefix}-date`} name="date" type="date" />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-message`}>Message</label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            maxLength={2000}
            placeholder="Tell us a little about your requirement"
          />
        </div>

        <div className="cf-honeypot" aria-hidden="true">
          <label htmlFor={`${idPrefix}-website`}>Leave this field empty</label>
          <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={200} />
        </div>

        <button type="submit" className="btn">
          Continue on WhatsApp
          <span className="btn-ico">
            <ArrowUpRight />
          </span>
        </button>
        <div aria-live="polite" aria-atomic="true">
          {whatsappUrl && <div className="cf-status" role="status"><p>Your message is ready. Review it in WhatsApp and tap Send to deliver it. Your appointment is not confirmed.</p><button type="button" className="cf-whatsapp-fallback" onClick={() => window.location.assign(whatsappUrl)}>WhatsApp didn’t open? Open it in this tab</button></div>}
          {error && <p className="cf-status cf-status-error" role="alert">{error} <a href={CLINIC.phoneHref}>Call {CLINIC.phone}</a>.</p>}
        </div>
      </form>
    </>
  );
}
