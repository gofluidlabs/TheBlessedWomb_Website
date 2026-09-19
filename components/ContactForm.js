"use client";

import { ArrowUpRight } from "./Icons";
import { trackEvent } from "@/lib/analytics";

const REASONS = [
  "Antenatal Care",
  "Pregnancy Scans & Ultrasound",
  "Doppler Studies",
  "Gynaecological Care",
  "Infertility Care",
  "Other",
];

const FORM_LOCATIONS = {
  cf: "contact_page",
  wcf: "welcome_modal",
};

export default function ContactForm({ idPrefix = "cf" }) {
  // NOTE: this form has no backend yet (no fetch/API call — see
  // components/ContactForm.js history) — there is no true "submission
  // succeeded" signal to hook into. Firing on every click of the submit
  // button (regardless of whether the required fields are filled in)
  // would misrepresent enquiry volume in GA4, so this only fires once
  // the browser's native validation passes (all `required` fields
  // filled, valid email/tel format) — the closest available proxy for
  // "the user completed and submitted the form" today. Once a real
  // backend/API route exists, move this to fire only after that call
  // resolves successfully (e.g. inside the fetch's `.then()`), not here.
  function handleSubmit(e) {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      trackEvent("contact_form_submit", {
        form_location: FORM_LOCATIONS[idPrefix] || "other",
      });
    }
  }

  return (
    <>
      <h3>Book a Consultation</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="cf-row">
          <div>
            <label htmlFor={`${idPrefix}-name`}>Name</label>
            <input id={`${idPrefix}-name`} type="text" placeholder="Your name" required />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-phone`}>Phone Number</label>
            <input id={`${idPrefix}-phone`} type="tel" placeholder="Your phone number" required />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`}>Email</label>
          <input id={`${idPrefix}-email`} type="email" placeholder="Your email address" />
        </div>

        <div className="cf-row">
          <div>
            <label htmlFor={`${idPrefix}-reason`}>Reason for Visit</label>
            <select id={`${idPrefix}-reason`} defaultValue="">
              <option value="" disabled>
                Select a reason
              </option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${idPrefix}-date`}>Preferred Date</label>
            <input id={`${idPrefix}-date`} type="date" />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-message`}>Message</label>
          <textarea
            id={`${idPrefix}-message`}
            placeholder="Tell us a little about your requirement"
          />
        </div>

        <button type="submit" className="btn">
          Send Enquiry
          <span className="btn-ico">
            <ArrowUpRight />
          </span>
        </button>
      </form>
    </>
  );
}
