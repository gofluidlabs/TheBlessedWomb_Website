"use client";

import { ArrowUpRight } from "./Icons";

const REASONS = [
  "Antenatal Care",
  "Pregnancy Scans & Ultrasound",
  "Doppler Studies",
  "Gynaecological Care",
  "Infertility Care",
  "Other",
];

export default function ContactForm({ idPrefix = "cf" }) {
  return (
    <>
      <h3>Book a Consultation</h3>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
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
