import { test } from "node:test";
import assert from "node:assert/strict";
import { canonicalUrl, jsonLd, resolveConfiguration } from "../src/lib/config.ts";
import { pages, routePaths } from "../src/data/pages.ts";

test("public configuration uses owned destinations and preserves explicit configuration", () => {
  const defaults = resolveConfiguration({});
  assert.equal(defaults.siteUrl, "https://blakdna-landing.pages.dev");
  assert.equal(defaults.salesUrl, "https://www.yumait.com.au/contact");
  assert.equal(defaults.indexing, true);
  const custom = resolveConfiguration({ PUBLIC_SITE_URL: "https://blakdna.yumait.com.au/", PUBLIC_SALES_URL: "https://www.yumait.com.au/contact?product=blakdna", PUBLIC_INDEXING: "0" });
  assert.equal(custom.siteUrl, "https://blakdna.yumait.com.au");
  assert.equal(custom.salesUrl, "https://www.yumait.com.au/contact?product=blakdna");
  assert.equal(custom.indexing, false);
});
test("configuration rejects malformed, credential-bearing, and non-HTTPS destinations", () => {
  for (const value of ["javascript:alert(1)", "http://localhost", "https://example.com", "https://user:secret@host.invalid", "https://safe.test/#fragment"]) {
    assert.throws(() => resolveConfiguration({ PUBLIC_SALES_URL: value }));
  }
  assert.throws(() => resolveConfiguration({ PUBLIC_SITE_URL: "https://blakdna.yumait.com.au/nested" }));
  assert.throws(() => resolveConfiguration({ PUBLIC_INDEXING: "maybe" }));
});
test("canonical URLs are local and JSON-LD cannot break out of its data block", () => {
  assert.equal(canonicalUrl("https://blakdna-landing.pages.dev", "/architecture/"), "https://blakdna-landing.pages.dev/architecture/");
  for (const path of ["//evil.invalid", "https://evil.invalid", "/path?token=secret", "/path#fragment", "/\\evil.invalid"]) assert.throws(() => canonicalUrl("https://blakdna-landing.pages.dev", path));
  assert.ok(!jsonLd({ value: "</script><script>alert(1)</script>" }).includes("<"));
});
test("every editorial route has substantive, distinct content and valid related routes", () => {
  assert.equal(new Set(routePaths).size, routePaths.length);
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);
  for (const page of pages) {
    assert.ok(page.sections.length >= 2, page.slug);
    assert.ok(page.sections.flatMap((section) => section.paragraphs).join(" ").split(/\s+/).length >= 100, page.slug);
    assert.ok(page.related.every((slug) => pages.some((item) => item.slug === slug)), page.slug);
    assert.ok(!JSON.stringify(page).includes("—"), page.slug);
  }
});
