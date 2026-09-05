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

Production verification and CI identifiers are recorded after deployment, not assumed from the local build.
