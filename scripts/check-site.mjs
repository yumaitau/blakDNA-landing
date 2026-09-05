import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
import { routePaths } from "../src/data/pages.ts";

const root = resolve("dist");
const external = new Set();
async function exists(path) { try { return (await stat(path)).isFile(); } catch { return false; } }
const robots = await readFile(resolve(root, "robots.txt"), "utf8");
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
const indexing = robots.includes("Allow: /");
const sitemapOrigin = new URL(robots.match(/Sitemap: (\S+)/)[1]).origin;
for (const route of routePaths) {
  const file = resolve(root, `.${route}`, "index.html");
  const html = await readFile(file, "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route}: one h1`);
  assert.ok(html.includes('name="description"'), `${route}: description`);
  assert.ok(html.includes(`rel="canonical" href="${sitemapOrigin}${route}"`), `${route}: canonical`);
  assert.ok(html.includes('name="twitter:card"'), `${route}: social metadata`);
  assert.equal(sitemap.includes(`<loc>${sitemapOrigin}${route}</loc>`), indexing, `${route}: sitemap policy`);
  assert.ok(html.includes(indexing ? 'content="index, follow"' : 'content="noindex, nofollow"'), `${route}: indexing policy`);
  assert.ok(!/github\.com\/yumaitau\/blakdna(?:[\/#?"']|$)/i.test(html), `${route}: private repository URL`);
  assert.ok(!/AKIA[A-Z0-9]{16}|ASIA[A-Z0-9]{16}|ghp_[A-Za-z0-9]{30,}|-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(html), `${route}: secret material`);
  const data = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(data.length, 1, `${route}: structured data`);
  for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    assert.ok(script[1].includes('type="application/ld+json"') || /\bsrc="/.test(script[1]), `${route}: executable inline script violates CSP`);
  }
  const graph = JSON.parse(data[0][1]);
  assert.equal(graph["@context"], "https://schema.org");
  assert.ok(graph["@graph"].some((item) => item["@type"] === "Organization"));
  for (const match of html.matchAll(/<(?:a|img|link|script)\b[^>]*?\b(?:href|src)="([^"]+)"/g)) {
    const target = match[1].replaceAll("&amp;", "&");
    if (/^https:\/\//.test(target)) { if (match[0].startsWith("<a")) external.add(target); continue; }
    if (target.startsWith("mailto:")) continue;
    const url = new URL(target, `https://local.invalid${route}`);
    let targetFile = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (url.pathname.endsWith("/")) targetFile = resolve(targetFile, "index.html");
    assert.ok(await exists(targetFile), `${route}: missing ${target}`);
    if (url.hash) assert.ok((await readFile(targetFile, "utf8")).includes(`id="${url.hash.slice(1)}"`), `${route}: broken anchor ${target}`);
  }
}
assert.ok((await readFile(resolve(root, "404.html"), "utf8")).includes("noindex, nofollow"));
assert.ok((await readFile(resolve(root, "llms.txt"), "utf8")).includes(`${sitemapOrigin}/architecture/`));
const scripts = (await readdir(root, { recursive: true })).filter((name) => name.endsWith(".js"));
const scriptBytes = (await Promise.all(scripts.map((name) => stat(resolve(root, name))))).reduce((total, file) => total + file.size, 0);
assert.ok(scriptBytes < 10_000, `Client JavaScript budget exceeded: ${scriptBytes}`);
if (process.env.CHECK_EXTERNAL_LINKS === "1") for (const url of external) {
  const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20_000) });
  assert.ok(response.ok, `External destination failed: ${url} (${response.status})`);
}
console.log(`${routePaths.length} routes verified; ${scriptBytes} client JavaScript bytes; structured data, links, privacy boundaries and indexing pass.`);
