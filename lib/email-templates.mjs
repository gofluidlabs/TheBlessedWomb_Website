import { CLINIC, DOCTOR, SITE_URL } from "./seo.js";

const escape = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const sourceLabel = (value) => ({ contact_page: "Contact page", welcome_modal: "Welcome consultation form" }[value] || "Website form");

function frame({ preheader, eyebrow, title, intro, content, notice }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${escape(title)} | ${escape(CLINIC.name)}</title>
<style>@media only screen and (max-width:620px){.outer{padding:16px 8px!important}.pad{padding:28px 22px!important}.headline{font-size:29px!important;line-height:36px!important}.brand-name{font-size:23px!important}.detail-label{width:100px!important}.action{display:block!important;margin:0 0 12px!important;text-align:center!important}}</style></head>
<body style="margin:0;padding:0;background:#fbf1ee;color:#3b2a4d;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${escape(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf1ee"><tr><td class="outer" align="center" style="padding:40px 16px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff;border:1px solid #efe7ec;border-radius:24px;overflow:hidden">
<tr><td class="pad" style="padding:32px 40px;border-bottom:1px solid #efe7ec"><table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="72" style="vertical-align:middle"><a href="${SITE_URL}" style="text-decoration:none"><img src="${SITE_URL}/icons/icon-192.png" width="56" height="56" alt="The Blessed Womb logo" style="display:block;border:0;border-radius:15px"></a></td><td style="vertical-align:middle"><a class="brand-name" href="${SITE_URL}" style="font-family:Georgia,'Times New Roman',serif;font-size:27px;font-weight:bold;color:#3b2a4d;text-decoration:none">The Blessed Womb</a><div style="font-size:10px;letter-spacing:2px;color:#827689;margin-top:6px">COMPLETE CARE OF MOTHERHOOD</div></td></tr></table></td></tr>
<tr><td class="pad" style="padding:36px 40px;background:#fdf5f2;border-bottom:4px solid #e89385"><div style="font-size:11px;font-weight:bold;letter-spacing:2px;color:#86606b;margin-bottom:14px">${escape(eyebrow)}</div><h1 class="headline" style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:43px;font-weight:normal;color:#3b2a4d">${escape(title)}</h1><p style="margin:0;font-size:15px;line-height:25px;color:#6b6075">${escape(intro)}</p></td></tr>
<tr><td class="pad" style="padding:32px 40px">${content}</td></tr>
<tr><td style="padding:22px 30px;background:#3b2a4d;color:#fff;text-align:center"><p style="margin:0 0 5px;font-family:Georgia,'Times New Roman',serif;font-size:18px">${escape(DOCTOR.name)}</p><p style="margin:0;font-size:12px;line-height:20px;color:#e8dfe9">Obstetrician &amp; Gynaecologist · Alpha I, Greater Noida</p><p style="margin:12px 0 0"><a href="${SITE_URL}" style="font-size:12px;color:#f4c3b9;text-decoration:underline">theblessedwomb.in</a></p></td></tr>
</table><p style="max-width:540px;margin:20px auto 0;font-size:11px;line-height:18px;color:#817587;text-align:center">${escape(notice)}</p>
</td></tr></table></body></html>`;
}

function detail(label, value) {
  return `<tr><td class="detail-label" width="128" style="padding:13px 12px 13px 0;border-bottom:1px solid #efe7ec;vertical-align:top;color:#827689;font-size:13px">${escape(label)}</td><td style="padding:13px 0;border-bottom:1px solid #efe7ec;color:#3b2a4d;font-size:14px;line-height:22px;word-break:break-word">${escape(value)}</td></tr>`;
}

export function renderClinicEnquiry(values) {
  const phone = values.phone.replace(/[^+\d]/g, "");
  const text = [
    "New website enquiry | The Blessed Womb", "",
    `Name: ${values.name}`, `Phone: ${values.phone}`,
    `Email: ${values.email || "Not supplied"}`, `Reason for visit: ${values.reason || "Not specified"}`,
    `Preferred date: ${values.date || "Not specified"}`, `Submitted from: ${sourceLabel(values.formLocation)}`,
    "", "Message:", values.message || "No message supplied.", "",
    "Please contact the visitor to confirm availability. This enquiry is not a confirmed appointment.",
  ].join("\n");
  const content = `<h2 style="font-size:16px;margin:0 0 6px;color:#3b2a4d">Enquiry details</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detail("Name", values.name)}${detail("Phone", values.phone)}${detail("Email", values.email || "Not supplied")}${detail("Visit reason", values.reason || "Not specified")}${detail("Preferred date", values.date || "Not specified")}${detail("Received from", sourceLabel(values.formLocation))}</table>
<div style="margin:26px 0;padding:20px;background:#fdf5f2;border-left:3px solid #e89385;border-radius:0 12px 12px 0"><h2 style="font-size:14px;margin:0 0 10px">Visitor's message</h2><p style="margin:0;font-size:14px;line-height:24px;word-break:break-word">${escape(values.message || "No message supplied.").replace(/\r?\n/g, "<br>")}</p></div>
<p style="margin:0 0 24px;font-size:13px;line-height:22px;color:#6b6075">Please contact the visitor to confirm availability and the next steps.</p>
<a class="action" href="tel:${escape(phone)}" style="display:inline-block;padding:14px 22px;background:#3b2a4d;color:#fff;border-radius:10px;text-decoration:none;font-size:13px;font-weight:bold;margin-right:10px">Call visitor</a>
${values.email ? `<a class="action" href="mailto:${escape(encodeURIComponent(values.email))}" style="display:inline-block;padding:13px 21px;background:#fff;color:#3b2a4d;border:1px solid #d8cbdc;border-radius:10px;text-decoration:none;font-size:13px;font-weight:bold">Reply by email</a>` : ""}
<p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #efe7ec;font-size:11px;line-height:19px;color:#827689">A preferred date is a request, not a confirmed appointment.</p>`;
  return {
    subject: "New website enquiry | The Blessed Womb",
    text,
    html: frame({ preheader: "A new consultation enquiry is ready for your follow-up.", eyebrow: "NEW WEBSITE ENQUIRY", title: "A new conversation.\nA moment of care.", intro: "Someone has reached out through your website. Their details are below, ready for your personal follow-up.", content, notice: "Private clinic correspondence. This email may contain personal information; share it only with authorised clinic staff." }),
  };
}

// Design-only companion template. The contact API does not send visitor
// acknowledgements, so an unverified visitor address cannot receive emails.
export function renderPatientAcknowledgement() {
  return {
    subject: "We've received your enquiry | The Blessed Womb",
    text: `Thank you for contacting The Blessed Womb. The clinic will contact you to discuss your enquiry and availability. Your appointment is not confirmed yet. Call ${CLINIC.phone} for clinic enquiries. This inbox is not an emergency service. ${SITE_URL}/clinic`,
    html: frame({ preheader: "Thank you for reaching out. Your appointment still needs confirmation.", eyebrow: "THANK YOU FOR REACHING OUT", title: "Your next step,\nwith care.", intro: "Thank you for contacting The Blessed Womb. Our clinic team will be in touch to discuss your enquiry and availability.", content: `<div style="padding:22px;background:#fdf5f2;border-radius:14px;margin-bottom:24px"><h2 style="font-size:16px;margin:0 0 10px">What happens next?</h2><p style="font-size:14px;line-height:24px;margin:0;color:#6b6075">The clinic will contact you using the details you provided. We will discuss your enquiry and confirm the next steps with you.</p></div><p style="font-size:14px;line-height:24px;margin:0 0 24px;color:#6b6075"><strong style="color:#3b2a4d">Your appointment is not confirmed yet.</strong> Please wait for confirmation from the clinic before making arrangements.</p><a class="action" href="${SITE_URL}/clinic" style="display:inline-block;padding:14px 22px;background:#3b2a4d;color:#fff;border-radius:10px;text-decoration:none;font-size:13px;font-weight:bold">Clinic details &amp; directions</a><p style="margin:24px 0 0;font-size:13px;line-height:23px;color:#6b6075">Questions? Call <a href="${CLINIC.phoneHref}" style="color:#3b2a4d">${escape(CLINIC.phone)}</a>.</p>`, notice: "This acknowledgement is not medical advice or an appointment confirmation. For an emergency, seek immediate medical care." }),
  };
}
