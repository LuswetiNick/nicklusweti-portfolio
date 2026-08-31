# SEO deployment checklist

## Before deployment

1. Link the repository to the production Vercel project, or authenticate the Vercel CLI in this workspace.
2. Confirm the production domain is `https://luswetinick.cc.cd`.
3. Keep the existing Resend variables configured in Vercel.
4. If Google Search Console provides an HTML verification token, set it as `GOOGLE_SITE_VERIFICATION` before the production build.
5. Run `pnpm build`, start the production server with `pnpm start`, and run `pnpm seo:check` in a second terminal.

## Immediately after deployment

1. Run the regression check against production:

   ```bash
   SEO_BASE_URL=https://luswetinick.cc.cd pnpm seo:check
   ```

2. Confirm that HTTP redirects to HTTPS and the root page returns `200`.
3. Confirm these public endpoints return `200`:
   - `https://luswetinick.cc.cd/robots.txt`
   - `https://luswetinick.cc.cd/sitemap.xml`
4. Open all four sitemap URLs and confirm their canonicals point to themselves.
5. Check the production deployment in Vercel Analytics and Speed Insights for incoming data and Core Web Vitals.

## Google Search Console

1. Prefer a Domain property when DNS access is available. Otherwise, create the URL-prefix property `https://luswetinick.cc.cd/` and use the `GOOGLE_SITE_VERIFICATION` token.
2. Submit `https://luswetinick.cc.cd/sitemap.xml`.
3. Use URL Inspection for the homepage and each project case study, then request indexing if Google has not discovered the new version.
4. Check Page Indexing, HTTPS, Core Web Vitals, and Enhancements after Google recrawls the site.

## Measurement cadence

- After 72 hours: confirm the sitemap was read and the four intended URLs were discovered.
- Weekly for the first month: record clicks, impressions, click-through rate, average position, indexed pages, and Core Web Vitals.
- After 28 days: compare Search Console query data with `docs/seo-keyword-map.md` before creating any new landing pages.
- Investigate unexpected indexed URLs, duplicate canonicals, or a drop in valid indexed pages before publishing additional SEO content.
