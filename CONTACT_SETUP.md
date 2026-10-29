# WhatsApp enquiry form setup

The contact page and welcome popup use the same WhatsApp click-to-chat form.
The destination is **+91 88826 63284**, read from `CLINIC.phone` in `lib/seo.js`.
Confirm that this number is active on WhatsApp before deploying.

## Visitor flow

1. Enter a name and phone number, with an optional reason, preferred date and
   message. Email is no longer requested.
2. Select **Continue on WhatsApp**. The browser opens `wa.me` in a separate tab
   with the enquiry text. On mobile, WhatsApp can hand off to the installed app;
   desktop visitors can use WhatsApp Web or the desktop app.
3. Review the message and tap **Send** in WhatsApp. Opening the link alone
   does not send anything. An enquiry does not confirm an appointment.
4. If the new tab does not open, the form offers **Open it in this tab**.
   Form fields are preserved so visitors can edit or retry. Editing any field
   clears the previously prepared handoff status.

The site cannot determine whether the visitor actually sent the message or
whether WhatsApp delivered it. The UI therefore never reports a sent enquiry.
No submission is stored in a website database or sent to a website API.
The prepared text is passed to WhatsApp in the click-to-chat URL; do not paste
filled enquiry URLs into logs, analytics, screenshots or support tickets.

## Configuration and deployment

- No Resend account, email template, messaging API key, paid WhatsApp Business
  Platform account or new DNS record is needed for this flow.
- The email endpoint and its server implementation have been removed. The old
  `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` entries were
  removed from `.env.local` and `.env.example`.
- In **Vercel → Project → Settings → Environment Variables**, remove those
  three old email variables from Production/Preview where configured, then
  deploy this change. Keep the existing site URL, analytics and verification
  settings.
- If the Resend key was used only for this website, revoke it in Resend's API
  Keys dashboard. Do not revoke a key used by another app. Existing domain
  verification/DNS records do not need to change for WhatsApp to work.
- The clinic's public email addresses and ordinary email contact links remain
  available; the form's automatic email delivery has been removed.

## Analytics

The form emits `whatsapp_click` with its form location only, indicating an
attempt to open WhatsApp. It does not emit `contact_form_submit`, because
delivery cannot be confirmed. No names, phone numbers, dates, reasons,
messages or prepared WhatsApp URLs are passed to analytics by the form.
If GTM/GA4 used `contact_form_submit` as a conversion, review that setup:
WhatsApp clicks represent contact intent, not verified delivered enquiries.

## Verification

- Run `node tests/contact-whatsapp.test.mjs` and `npm run build`.
- On `http://localhost:3000/contact`, test with dummy details. Inspect the
  opened WhatsApp recipient and text without pressing Send.
- Test the welcome popup on the homepage too (it appears after five seconds
  once per tab session; it does not appear on `/contact`).
- Check the popup and contact form on desktop and mobile. Test empty required
  fields, phone validation, optional fields and special characters in messages.
- Block popups and verify the same-tab fallback is available. A WhatsApp login
  may be required on desktop; the website cannot sign visitors in.
- Repeat after deploying. Testing the handoff does not require sending an
  actual WhatsApp message.

Official click-to-chat instructions:
https://faq.whatsapp.com/5913398998672934
