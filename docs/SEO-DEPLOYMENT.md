# SEO, Webmaster, and Analytics Deployment

This site is a static website deployed from the repository root. The production domain used by the page canonicals, sitemap, and robots file is `https://sarvekanksham.com`.

## Before connecting Netlify

1. Push the site source to a private or public GitHub repository as appropriate.
2. In Netlify, import that repository. `netlify.toml` sets the publish directory to the repository root; no build command is needed.
3. Add `sarvekanksham.com` as the production domain in Netlify and configure DNS as Netlify instructs. Enable HTTPS and select the `www` or apex domain as the primary domain consistently. If the primary host changes, update every canonical, structured-data URL, Open Graph URL, `robots.txt`, and sitemap URL to match.
4. In the Netlify site dashboard, open **Site configuration** → **Notifications** → **Emails and webhooks** (or **Forms** → **Form notifications**, depending on the dashboard version). Add an **Email notification**, choose the `consultation-request` form, and set the recipient to `sarvekankshamassociates@gmail.com`. Save the notification. A `data-netlify` form stores submissions in Netlify, but does not send email to this address until this notification is configured.
5. Submit a test consultation from the deployed HTTPS website and confirm it appears under **Forms** and an email notification arrives. Use dummy details for testing. Do not test by opening `contact.html` directly as a `file://` URL; there is no form backend on the local filesystem.
6. Configure any additional notification recipients and form-retention settings in Netlify according to the firm's privacy and data-handling practices.
5. Test the Maps iframe after deployment. The Netlify `_headers` Content Security Policy permits only the Google Maps frame hosts used by the contact page.

## Google Search Console

1. Add and verify a **Domain property** for `sarvekanksham.com` in Google Search Console using the DNS TXT record supplied by Google. Add the record at the authoritative DNS provider, then use Google's verification flow. DNS verification does not require placing a secret in the public repository.
2. Once DNS has propagated and the site is live over HTTPS, submit `https://sarvekanksham.com/sitemap.xml` under **Sitemaps**.
3. Use **URL Inspection** on the home page, contact page, and each practice-topic URL. Request indexing after confirming the inspected canonical is the intended URL.
4. Review indexing, enhancement, mobile, and Core Web Vitals reports periodically. Search Console verification is not a ranking guarantee.

An HTML-tag verification method is also available if needed: place the exact `google-site-verification` meta tag supplied by Search Console inside the `<head>` of the home page, deploy it, and click Verify. Do not commit a made-up token or an account-specific token from an unrelated property.

## Bing Webmaster Tools

1. Add `https://sarvekanksham.com` in Bing Webmaster Tools. Importing the verified Google Search Console property is the simplest option when available.
2. Alternatively, use Bing's DNS TXT verification. If choosing its HTML file method, place Bing's exact supplied verification file in the published site root and keep it there.
3. Submit `https://sarvekanksham.com/sitemap.xml` and monitor crawl/index reports.

Do not add an `msvalidate.01` tag until Bing supplies the actual verification value. Never substitute placeholder text for a verification token.

## Google Tag Manager and Google Analytics 4

Tracking is **not installed yet**. No GTM container ID, GA4 measurement ID, or analytics consent decision was supplied, so no tracking code or fabricated identifiers are included.

To enable measurement:

1. Create a Google Tag Manager web container and a GA4 property/stream. Record the real `GTM-...` container ID and `G-...` measurement ID.
2. Decide and publish an appropriate privacy/cookie notice and consent behavior before activating analytics. Consultation form submissions contain personal information; never send names, phone numbers, emails, free-text form values, or other sensitive matter details to analytics.
3. Add the GTM bootstrap in the `<head>` and its `<noscript>` iframe immediately after `<body>` on every page, using Google's exact snippets and the real container ID. Configure a GA4 Google tag in GTM with the measurement ID, and publish the container only after preview/testing.
4. Update the Content Security Policy in `_headers` to allow only the Google hosts required by the published tags and consent mode (including script, image, and connection endpoints). Keep the policy restrictive; do not solve blocked tags by allowing arbitrary sources or adding broad `unsafe-inline`.
5. Use GTM Preview and GA4 DebugView to check page views and consent behavior. Confirm form field values and personal data are not included in URLs, events, or page titles.

If using direct GA4 instead of GTM, install Google's exact Google tag snippet with the real measurement ID on all pages. Do not install both direct GA4 and a GTM-fired GA4 tag unless duplicate events are intentionally prevented.

## Existing on-page search signals

- Every page has a page-specific title, description, canonical, Open Graph, and Twitter metadata.
- Organization/LegalService and page-specific structured data are provided as JSON-LD where relevant. Structured data must accurately reflect visible content and does not guarantee a rich result.
- `sitemap.xml` lists the public pages and practice topics; `robots.txt` allows major web search and answer-engine crawlers and points to the sitemap.
- Practice topics use `practice-detail.html?topic=...` and populate topic content, canonical, metadata, and Service structured data with JavaScript. Google can render JavaScript, but some social-preview crawlers and search crawlers may initially see the default topic. For the strongest per-topic indexing and sharing support, generate statically rendered HTML URLs for each topic before relying on those pages as primary landing pages; verify the live rendered result in both Google URL Inspection and Bing URL Inspection.
- AEO/GEO work is primarily clear, original, accurate, well-structured content and crawlable pages. Allowing an answer-engine bot does not guarantee that it will cite the site.

## Release checks

- Visit `/`, each page, and all nine practice-topic URLs over HTTPS; confirm no broken assets, redirect loops, or browser console errors.
- Confirm each page's canonical and social preview URL match the chosen primary domain.
- Validate the XML sitemap and JSON-LD, then use Google Rich Results Test and Schema Markup Validator where applicable.
- Confirm `robots.txt` and `sitemap.xml` return HTTP 200, and that the sitemap contains only canonical URLs.
- Re-test the Netlify contact form and Maps embed after production headers are active.
