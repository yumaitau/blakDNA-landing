import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { routePaths } from "../src/data/pages.ts";
import { resolveConfiguration } from "../src/lib/config.ts";

const configuration = resolveConfiguration(process.env);
const origin = configuration.siteUrl;
const get = async (path) => {
  const response = await fetch(new URL(path, origin), { redirect: "error", signal: AbortSignal.timeout(20_000) });
  assert.equal(response.status, path === "/missing-page-for-journey/" ? 404 : 200, path);
  assert.ok(response.headers.get("content-security-policy")?.includes("script-src 'self'"), `${path}: CSP`);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff", `${path}: nosniff`);
  assert.ok(response.headers.get("strict-transport-security"), `${path}: HSTS`);
  return response;
};
for (const route of routePaths) {
  const html = await (await get(route)).text();
  assert.ok(html.includes(`rel="canonical" href="${origin}${route}"`), `${route}: canonical`);
  assert.ok(html.includes('content="index, follow"'), `${route}: indexed`);
}
const sitemap = await (await get("/sitemap.xml")).text();
for (const route of routePaths) assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), route);
assert.ok((await (await get("/robots.txt")).text()).includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok((await (await get("/llms.txt")).text()).includes(`${origin}/architecture/`));
assert.ok((await (await get("/missing-page-for-journey/")).text()).includes("Return to blakDNA"));
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const banner = Buffer.from(await (await get("/images/blakdna-banner.jpg")).arrayBuffer());
assert.equal(digest(banner), digest(await readFile("public/images/blakdna-banner.jpg")));
console.log(JSON.stringify({ origin, routes: routePaths.length, bannerSha256: digest(banner), verifiedAt: new Date().toISOString(), result: "pass" }));
