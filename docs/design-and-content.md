# Design and content decisions

## Design read

Trust-first B2B marketing for technical buyers. An editorial copper-and-charcoal identity follows the supplied blakDNA banner rather than a generic security dashboard or neon AI theme.

- DESIGN_VARIANCE: 4. Clear reading order and restrained asymmetry suit evidence-led evaluation.
- MOTION_INTENSITY: 2. Only brief link feedback; no autoplay, scroll hijacking, continuous motion, or hidden content awaiting animation.
- VISUAL_DENSITY: 4. The homepage introduces the model; substantive detail lives on distinct focused pages.
- Native CSS tokens, a single copper accent family, a 4px radius, system sans-serif fonts, and automatic light/dark palettes. Both modes retain one consistent theme across all sections.
- Layer scale: ordinary content 0, sticky navigation 2, keyboard skip link 3. No decorative overlays or tracking integrations.
- The attack path and architecture sequence are labelled conceptual illustrations, not fabricated product screenshots. The only photographic/illustrated brand asset is the approved local banner.

## Provenance and claims

The banner was supplied and approved for blakDNA by the project owner. It is bundled locally and is not an expiring hotlink. Brand and trademark rights remain with Yuma IT.

Public corporate contact, legal entity, address, ABN, and support information were checked against [Yuma IT contact](https://www.yumait.com.au/contact) and [privacy information](https://www.yumait.com.au/privacy) on 5 September 2026. The static site has its own narrow privacy notice and links to the company's separate enquiry-handling policy. No analytics provider is enabled. Enabling one requires documenting provider, purpose, retention, consent, and configuration before code is deployed.

Product copy describes the security-genome architecture and tested synthetic AWS/GitHub vertical slice. It deliberately does not claim customer deployment counts, threat statistics, certifications, independently audited controls, prevention rates, resilience percentages, a live Marketplace listing, or a commercially supported integration catalogue. Request current readiness and supporting evidence from the team.

The commercial terms of supply and any Marketplace contract must be agreed separately. Website information is not a commercial offer or legal assurance. Review policy content when the website starts collecting additional data, analytics are introduced, or commercial availability changes.

## Accessibility and review

Use semantic landmarks, one h1 per page, meaningful link names, visible focus, a skip link, keyboard-operable mobile navigation and disclosures, and a no-JavaScript navigation fallback. Reduced motion does not remove content. Test desktop/mobile and both colour modes with axe and Chromium. Review every visual baseline before accepting it.

The homepage uses different section structures rather than repeated equal feature cards. Related links and the footer are navigation, not duplicated conversion buttons. Each search-focused page has distinct context and limitations; no doorway pages or repeated keyword filler are generated.

Astro builds static output. The small same-origin navigation script is external so the CSP does not require unsafe inline JavaScript. JSON-LD is an escaped data block. Site checking enforces internal links, canonical URLs, sitemap/robots policy, structured data, public-only content, and a 10KB total client-JavaScript budget.
