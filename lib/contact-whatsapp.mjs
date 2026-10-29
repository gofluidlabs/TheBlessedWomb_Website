import { CONTACT_REASONS } from "./contact-options.mjs";

// The destination comes from clinic configuration, never visitor input.
export function buildWhatsAppEnquiry(input, clinicPhone) {
  const limits = { name: 100, phone: 40, reason: 100, date: 10, message: 2000, website: 200 };
  const values = {};
  for (const [field, limit] of Object.entries(limits)) {
    const value = input[field] ?? "";
    if (typeof value !== "string" || value.length > limit) throw new Error("Please check your form details.");
    values[field] = value.trim();
    if (field !== "message" && /[\u0000-\u001f\u007f]/.test(value)) throw new Error("Please check your form details.");
  }
  if (values.website) throw new Error("Please check your form details.");
  if (values.name.length < 2) throw new Error("Please enter your name.");
  const digits = values.phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15) {
    throw new Error("Please enter a valid phone number with 7 to 15 digits.");
  }
  if (values.reason && !CONTACT_REASONS.includes(values.reason)) throw new Error("Please select a reason from the list.");
  if (values.date) {
    const date = new Date(`${values.date}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== values.date) {
      throw new Error("Please select a valid preferred date.");
    }
  }
  const destination = String(clinicPhone).replace(/\D/g, "");
  if (!/^[1-9]\d{6,14}$/.test(destination)) throw new Error("WhatsApp is unavailable. Please call the clinic.");
  const message = [
    "Hello The Blessed Womb, I would like to enquire about a consultation.", "",
    `Name: ${values.name}`, `Phone: ${values.phone}`,
    `Reason for visit: ${values.reason || "Not specified"}`,
    `Preferred date: ${values.date || "Not specified"}`, "",
    "Message:", values.message || "No additional message.", "",
    "Please confirm availability. This is an appointment enquiry, not a confirmed booking.",
  ].join("\n");
  return `https://wa.me/${destination}?text=${encodeURIComponent(message)}`;
}
