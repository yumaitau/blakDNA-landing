# Launch and ongoing ownership

- Content and deployment owner: Yuma IT, contacted through hello@yumait.com.au.
- Production origin: https://blakdna-landing.pages.dev. A custom domain requires a separate DNS and canonical-URL change with the same validation gates.
- Analytics decision: disabled. There are no tracking scripts, visitor cookies, forms, or telemetry endpoints in this site. Document consent, purpose, retention, and provider before adding analytics.
- Support and private disclosure: support@yumait.com.au. Do not request credentials or customer incident evidence through public GitHub issues.
- Release gate: reviewed source and visual baselines, green CI, immutable merged commit, then an operator-authenticated Pages upload. Record the commit, CI run, deployment identifier, and external HTTPS verification in the release PR.
- Rollback: in Cloudflare Pages, select the preceding verified production deployment and use Rollback. Alternatively rebuild its exact Git commit with the recorded production configuration and upload that build. Verify canonical, sitemap, navigation, and deployment links afterwards.
- Maintenance: review contact/legal content quarterly and when data collection changes; update dependency locks through tested PRs; rerun external links before each release. Review product claims whenever a supported integration or Marketplace offer becomes available.
- Public boundaries: this repository contains only new marketing code, public corporate facts, and the approved banner. The separate public deployment repository must link back here; private application source and history must never be published.

## Initial evidence

On 5 September 2026, the native Linux homelab completed 21 Chromium journeys covering all 16 indexable routes, keyboard navigation, mobile layouts, axe accessibility, and desktop dark/light and mobile dark visual baselines. All 12 full-page baseline images were visually inspected before acceptance. Four Lighthouse mobile runs scored 100 for performance, accessibility, best practices, and SEO. These are laboratory results, not a guarantee of scores on every visitor's device or network.

## Verified initial production deployment

- Merged site commit: `5f37cd881418d0dc095637f7548b8c9efb050673`, from [PR 1](https://github.com/yumaitau/blakDNA-landing/pull/1).
- [CI 33937050819](https://github.com/yumaitau/blakDNA-landing/actions/runs/33937050819) passed before merge, including the native homelab browser/Lighthouse journey and Trivy vulnerability/secret gate. CodeRabbit was still pending at merge; no independent approval is claimed.
- Cloudflare Pages production deployment: `bb6dab31-30d9-4053-96bb-fe822af69808`, completed 5 September 2026 at 01:52:29 UTC. Its recorded source commit matches the merged site commit.
- Production origin: https://blakdna-landing.pages.dev; immutable deployment URL: https://bb6dab31.blakdna-landing.pages.dev.
- External HTTPS verification at 01:52:44 UTC passed for all 16 routes, canonical/indexing metadata, sitemap, robots, llms.txt, real 404, CSP, HSTS, and nosniff.
- The deployed banner exactly matches SHA-256 `19a5e578084fe7a332dde4fa0dc5d2be5901af905bde35ddcf10ddfb4a04df5e`.
- The homelab browser ran the same 21 tests against the production HTTPS origin, without updating screenshots: 21 passed in 37.8 seconds. This includes all-route accessibility, no tracker requests/cookies, navigation, CTAs, 404, and all 12 visual comparisons.

Use `node scripts/verify-production.mjs` to repeat the external HTTP and asset checks. Set `BLAKDNA_SITE_TEST_URL=https://blakdna-landing.pages.dev` for the existing Playwright suite to exercise production rather than its local server.
