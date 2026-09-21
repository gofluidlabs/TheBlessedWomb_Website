import { SITE_URL } from "@/lib/seo";

/**
 * AI crawlers, named explicitly.
 *
 * They already match the "*" rule, so listing them changes nothing today —
 * the point is that it makes the decision deliberate and visible. If a
 * restrictive rule is ever added to "*" (a scraper, a bandwidth problem),
 * these entries keep the assistants that send real patients unaffected
 * instead of silently cutting them off.
 *
 * Two different jobs are mixed in here on purpose, because the clinic
 * benefits from both:
 *
 *  - `cite` bots fetch a page to answer a question being asked right now,
 *    and usually surface a visible link. This is the one that produces
 *    "The Blessed Womb, Greater Noida" appearing in a ChatGPT/Perplexity/
 *    AI-Overview answer with a citation.
 *  - `train` bots collect pages into a model's training corpus. No
 *    immediate traffic, but it is how a model comes to know the clinic
 *    exists at all when asked without browsing.
 *
 * To opt out of model training while staying citable in AI answers, move
 * the `train` entries to `disallow: "/"` — the `cite` ones are what matter
 * for being found.
 */
const AI_CRAWLERS = [
  // OpenAI
  { name: "GPTBot", job: "train" },
  { name: "OAI-SearchBot", job: "cite" },
  { name: "ChatGPT-User", job: "cite" },
  // Anthropic
  { name: "ClaudeBot", job: "train" },
  { name: "Claude-SearchBot", job: "cite" },
  { name: "Claude-User", job: "cite" },
  // Google — note Googlebot itself is configured separately below.
  // Google-Extended does NOT control search indexing; it is the separate
  // opt-in for Gemini and AI Overviews grounding.
  { name: "Google-Extended", job: "train" },
  // Perplexity
  { name: "PerplexityBot", job: "cite" },
  { name: "Perplexity-User", job: "cite" },
  // Microsoft Copilot rides on Bingbot, which matches "*" already.
  // Apple Intelligence / Siri
  { name: "Applebot", job: "cite" },
  { name: "Applebot-Extended", job: "train" },
  // Meta AI
  { name: "meta-externalagent", job: "train" },
  // Common Crawl — the corpus behind a large share of open models
  { name: "CCBot", job: "train" },
  // Others that surface business answers
  { name: "DuckAssistBot", job: "cite" },
  { name: "Amazonbot", job: "cite" },
  { name: "cohere-ai", job: "train" },
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api/ holds the enquiry-form endpoint — nothing there is a page,
        // and letting crawlers hit it just wastes crawl budget.
        disallow: ["/api/"],
      },
      // Google's crawlers get explicit entries for the same reason the AI
      // crawlers do: so a future rule on "*" can't restrict them by accident.
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Googlebot-Image", allow: "/" },
      ...AI_CRAWLERS.map(({ name }) => ({
        userAgent: name,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
