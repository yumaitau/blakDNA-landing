import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const build = (environment) => execFileSync("pnpm", ["build"], { stdio: "inherit", env: { ...process.env, ...environment } });
try {
  build({ PUBLIC_SITE_URL: "https://blakdna-preview.pages.dev", PUBLIC_SALES_URL: "https://www.yumait.com.au/contact?product=blakdna", PUBLIC_INDEXING: "0" });
  execFileSync(process.execPath, ["scripts/check-site.mjs"], { stdio: "inherit", env: { ...process.env, CHECK_EXTERNAL_LINKS: "0" } });
  assert.ok(readFileSync("dist/index.html", "utf8").includes("https://www.yumait.com.au/contact?product=blakdna"));
  assert.ok(readFileSync("dist/robots.txt", "utf8").includes("Disallow: /"));
  assert.throws(() => execFileSync("pnpm", ["exec", "astro", "build"], { stdio: "pipe", env: { ...process.env, PUBLIC_SITE_URL: "http://localhost" } }));
} finally { build({ PUBLIC_SITE_URL: "https://blakdna-landing.pages.dev", PUBLIC_SALES_URL: "https://www.yumait.com.au/contact", PUBLIC_INDEXING: "1" }); }
