# Contact form email setup

The contact page and welcome popup both submit to `POST /api/contact`. The
server sends one HTML/plain-text enquiry email to the clinic using Resend's
REST API. No additional package or database is required. If the visitor supplies
an email, it becomes the Reply-To address; no automatic visitor email is sent.

## Free plan

Checked 27 October 2026: Resend's transactional Free plan is $0/month for
3,000 emails/month, with a 100 emails/day limit. One clinic recipient means
one email per enquiry. Each additional recipient counts separately. Any other
usage in the same Resend account also uses the allowance. Website hosting and
domain costs are separate.

Source: https://resend.com/pricing

## Activate

1. Create a free Resend account at https://resend.com/signup.
2. Add `theblessedwomb.in` in the Resend Domains dashboard and add the exact
   DNS records it provides at the domain's DNS provider. Keep existing website
   and mailbox records. Wait for Resend to show the sending domain as verified.
   If you verify a subdomain instead, use that subdomain in the sender address.
3. Create a sending API key, ideally restricted to that domain.
4. Add these server environment variables to `.env.local` for local use and
   the hosting project's environment settings for deployment:

   ```dotenv
   RESEND_API_KEY=re_replace_with_your_key
   CONTACT_FROM_EMAIL=The Blessed Womb <enquiries@theblessedwomb.in>
   CONTACT_TO_EMAIL=drjyoticares@gmail.com
   ```

   Never put the API key in a `NEXT_PUBLIC_` variable, source control, or browser
   code. The sender must belong to your verified domain. The clinic can receive
   at Gmail; a Gmail address cannot be the verified sender. Resend's default
   `onboarding@resend.dev` sender is for limited account-owner testing.
5. Restart the local server or redeploy the site after setting the variables.
   This route needs a Next.js server/serverless deployment, not static export.
6. Submit a test enquiry from `/contact`, then from the welcome popup. Check
   Resend's email logs and the clinic inbox/spam folder, and verify that replying
   addresses the visitor. A successful API response means Resend accepted the
   email; check delivery separately. Confirm the popup success message fits on
   mobile. Automated checks do not verify the API key, sender-domain status or
   actual inbox delivery; confirm those with this real submission.

Domain guide: https://resend.com/docs/dashboard/domains/introduction

## Test locally before deploying

Production deployment is not required to send real emails. The local Next.js
server reads `.env.local` and calls Resend over the internet; localhost itself
does not need DNS verification. The domain in `CONTACT_FROM_EMAIL` must be
verified in Resend, and the API key must have permission to send from it.

1. Stop and restart the development server after editing `.env.local`:

   ```sh
   npm run dev
   ```

2. Open `http://localhost:3000/contact` (or the port printed in your terminal).
   Enter clearly marked dummy details, such as name `Website Test`, reason
   `Other`, and message `Local email delivery test; no appointment requested`.
   Use a phone number you control, and optionally an email inbox you control
   to test Reply-To. Submit once. This sends one real email to the configured
   clinic inbox and uses the Resend allowance.
3. Check for the form's success message, then open Resend's Emails dashboard.
   Confirm the email's delivery status and check `drjyoticares@gmail.com`,
   including Spam. Provider acceptance and delivery into the inbox are separate
   checks. Open the email to inspect the logo, formatting and enquiry details.
4. If you supplied an email, confirm that Reply addresses that email. You do
   not need to send the reply. Repeat from the welcome popup on the homepage
   to verify that entry point too; it uses the same backend.
5. If submission fails, use the browser's Network panel to inspect
   `POST /api/contact`. A `503` indicates missing/invalid environment settings;
   `502` indicates a Resend rejection, timeout or network issue; check Resend's
   Logs for sender-domain, API-key or quota errors. A `429` means the local
   attempt limit was reached; wait 15 minutes or restart the local server.

For deployment, copy the three server environment variables into Vercel's
project Settings → Environment Variables for Production (and Preview if you
want preview deployments to send email), then redeploy. `.env.local` is
ignored by Git and is not uploaded automatically. Test the deployed form once
afterward as well. An email provider webhook is not needed for this sending
flow, and a local tunnel is not required.

## Behaviour and verification

- The form preserves fields after errors, disables submission during sending,
  and only records the anonymous analytics event after provider acceptance.
- Retries of an unchanged enquiry reuse an idempotency key. Resend deduplicates
  these keys for 24 hours. Changing the enquiry starts a new submission.
- The server validates and bounds input, escapes HTML, enforces same-origin
  browser submissions, and uses a honeypot plus a best-effort per-instance
  limit of five attempts per IP per 15 minutes. Hosting edge bot protection can
  supplement this; counters do not span server instances or survive restarts.
- Missing configuration, provider errors, timeouts and quota failures show an
  error and a clinic phone link. Enquiries are not saved in a database.
- Run `node tests/contact-server.test.mjs` and `npm run build` to verify
  the implementation without sending real email.
