# GA4 and Google Tag Manager — diagnosis and setup

Checked against the live website on **29 October 2026**.

## Confirmed diagnosis

The site installs and loads **GTM-WX29F2LZ**, but that container's publicly
served configuration is empty: resource version `3`, `tags: []`,
`predicates: []`, `rules: []`. No GA4 tag or measurement ID was found in it.
The resource version field is reported as observed, not as proof of a specific
GTM workspace publication number.

A clean Chrome visit to the homepage, followed by in-site navigation to
`/process` and back, confirmed:

- The GTM script loaded with HTTP 200.
- `window.google_tag_manager['GTM-WX29F2LZ']` was present.
- `gtm.js`, `gtm.dom` and `gtm.load` appeared in the data layer.
- Navigation produced `navigation_click` and `spa_page_view` events.
- No GA4 collection request or GA4 script was observed during the check.
- No failed analytics network request was observed.

This is a missing **published tag configuration**, not a missing website GTM
loader. The GA4 screenshot's inactive-data warning is consistent with this.
There may be unpublished workspace changes or tags in a different container;
private GTM workspaces and GA4 reports were not accessible in this audit.

The screenshot identifies the intended GA4 stream as **The Blessed Womb (Web)**
at `https://theblessedwomb.in`, with measurement ID **G-NE7EYJFPV7**. Copy the
ID directly from that stream before configuring the tag to avoid transcription
errors. A `GTM-...` container ID and a `G-...` measurement ID serve different
purposes; do not interchange them.

## First restore basic collection

1. Open https://tagmanager.google.com and select the website's container.
   Confirm its ID is **GTM-WX29F2LZ**, matching the live site.
2. Open **Workspace → Tags**. If a Google tag already exists in the workspace,
   inspect it first rather than creating a duplicate. An existing draft tag
   will not run for ordinary visitors until the workspace is published.
3. If absent, choose **Tags → New → Tag Configuration → Google tag**. Some
   newer interfaces offer **Google Analytics → Google Analytics** as a
   destination tag. Set the Tag ID to the measurement ID copied from the
   existing web stream, **G-NE7EYJFPV7**. Do not create a new GA4 property.
4. Name it **Google tag — Blessed Womb GA4**. Choose the built-in
   **Initialization — All Pages** trigger (the interface may call this
   **All Initialization Events**). Keep the normal initial page-view behaviour.
   Do not restrict it to the old `www` hostname. If a hostname restriction is
   deliberately used, include the actual non-www production hostname.
5. **Save**, then choose **Preview**, enter `https://theblessedwomb.in`, and
   connect Tag Assistant. Verify the Google tag fires on initialization and
   sends a `page_view` to the intended `G-...` destination.
6. In GA4, select this property and open **Realtime**; use **DebugView** for
   the Tag Assistant/debug session. Test with a clean browser without an ad
   blocker. If a consent tool is configured in GTM, honour its consent choices
   and verify collection under an appropriate consent state.
7. In GTM select **Submit → Publish and Create Version → Publish**. Saving a
   tag, entering Preview or selecting only Create Version does not publish it
   for normal visitors.
8. Verify again in a fresh non-Preview visit. The public container should now
   contain the configured tag and the browser should make GA4 collection
   requests for the correct measurement ID.

No website redeployment or Vercel variable change is needed merely to publish
tags inside the existing GTM container. Keep
`NEXT_PUBLIC_GTM_ID=GTM-WX29F2LZ`; do not replace it with the GA4 ID. Do not
add a second hardcoded GA4 installation alongside the GTM-managed Google tag.

## Track page changes in this Next.js site once

The site already emits `spa_page_view` for client-side route transitions and
skips that event on the initial load. Without additional setup, a base tag
alone does not establish whether every virtual route is tracked correctly.

Use the existing app event as the virtual page-view trigger:

1. In **GA4 → Admin → Data streams → the web stream → Enhanced measurement
   settings → Page views → Show advanced settings**, clear **Page changes
   based on browser history events**. Retain page-load measurement.
2. In **GTM → Variables → New**, create Data Layer Variables using Data Layer
   Version 2: **DLV — page_path** with name `page_path`, and
   **DLV — page_title** with name `page_title`. Enable built-in **Page URL**.
3. Create a **Custom Event** trigger named **CE — spa_page_view**, event name
   exactly `spa_page_view`, firing on All Custom Events for that event name.
4. Create a Google tag named **Google tag — SPA Update**, using the same
   measurement ID. Add configuration parameters `page_location` =
   `{{Page URL}}`, `page_title` = `{{DLV — page_title}}`, and `update` = `true`.
   Give it no standalone trigger: it will be a setup tag for the next step.
5. Create a **Google Analytics: GA4 Event** tag named **GA4 — Virtual Page View**.
   Use the stream's measurement ID and event name **`page_view`**. Add
   `page_location` = `{{Page URL}}`, `page_path` = `{{DLV — page_path}}`, and
   `page_title` = `{{DLV — page_title}}`. Trigger it on **CE — spa_page_view**.
6. Under that event tag's **Advanced Settings → Tag Sequencing**, select
   **Fire a tag before ... fires**, choosing **Google tag — SPA Update**.
7. Preview a fresh homepage load, then click Process and return Home. Expect
   exactly one initial `page_view` and one per actual route transition. Check
   page location, title and previous-page referrer in DebugView. Test browser
   Back/Forward too before publishing.

This uses the app event instead of also firing on History Change. Do not add
an additional History Change page-view trigger or turn GA4 automatic history
views back on alongside it. One tracking mechanism per route transition avoids
duplicate page views. Future changes to the GTM approach should replace this
mapping rather than stack another one on top.

## Send existing contact and navigation events to GA4

The site's `dataLayer.push(...)` calls do not send data to GA4 by themselves.
For each event below, create a **Google Analytics: GA4 Event** tag with the same
event name and measurement ID, and a **Custom Event** trigger with that exact
event name. Start with event names only; no patient information is needed.

| Data-layer event / GA4 event name | Meaning |
| --- | --- |
| `phone_click` | Visitor clicked a clinic call link |
| `email_click` | Visitor clicked a public email contact link |
| `directions_click` | Visitor opened clinic directions |
| `whatsapp_click` | Visitor clicked/opened WhatsApp; delivery is unconfirmed |
| `appointment_click` | Visitor clicked a booking/contact CTA |
| `navigation_click` | Visitor used tracked navigation |

The form now uses WhatsApp click-to-chat. It no longer emits
`contact_form_submit`. Opening WhatsApp is contact intent, not a confirmed
enquiry or appointment. Do not call it a verified lead or booking. Review any
old key-event/conversion configuration based on the removed email workflow.
If enhanced measurement **Form interactions** is enabled, consider disabling
it for this handoff flow so a generic `form_submit` is not mistaken for
confirmed WhatsApp delivery.

For richer reports, add Data Layer Variables only for deliberately selected
non-identifying context such as `link_location`, `form_location`,
`navigation_item` and `navigation_location`, mapping them only to the relevant
event tags. Register event-scoped custom dimensions in GA4 when those fields
are needed in reports. Never include visitor names, phone numbers, message
text, preferred dates, reasons for consultation or filled WhatsApp URLs in
event parameters, tag variables or custom dimensions.

## What to expect after publishing

- Realtime and DebugView are the first places to check collection.
- Standard reports and explorations can take **24–48 hours** to process data.
  Waiting alone will not fix a container with no tags.
- The Google stream warning may clear after collection is recognised; use
  actual requests and Realtime/DebugView to verify the fix rather than relying
  only on that banner.
- Visits that were never collected by this setup cannot be reconstructed
  retroactively in GA4. Search Console and Vercel statistics are separate data
  sources with different counting methods.

## Evidence and scope

The browser evidence is saved locally under
`seo-audit/2026-10-29/gtm-ga4-browser-evidence.json`. This audit did not publish
GTM changes, change GA4 settings, submit patient forms or send WhatsApp messages.
No tracking code or environment values were changed to bypass the missing tag.

Primary documentation checked:

- Google tag installation, Preview and publication:
  https://support.google.com/tagmanager/answer/9442095
- Custom GA4 events in GTM:
  https://support.google.com/tagmanager/answer/13034206
- Data-layer events and triggers:
  https://developers.google.com/tag-platform/tag-manager/datalayer
- SPA collection and duplicate prevention:
  https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications
  and https://developers.google.com/analytics/devguides/collection/ga4/measure-spa-gtm
- Realtime, DebugView and processing time:
  https://support.google.com/analytics/answer/9333790
