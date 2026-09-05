import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { testTarget } from "./test-target.ts";

const origin = testTarget(process.env.BLAKDNA_SITE_TEST_URL).baseURL;
const budgets = { performance: 0.9, accessibility: 0.95, "best-practices": 0.95, seo: 0.95 };
await mkdir(".lighthouseci", { recursive: true });
const chrome = await launch({ chromePath: chromium.executablePath(), chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"] });
let failed = false;
try {
  for (const route of ["/", "/architecture/", "/aws-marketplace/", "/contact/"]) {
    const result = await lighthouse(new URL(route, origin).href, { port: chrome.port, output: "json", logLevel: "error", onlyCategories: Object.keys(budgets), formFactor: "mobile" });
    if (!result) throw new Error("Lighthouse produced no result");
    await writeFile(`.lighthouseci/${route === "/" ? "home" : route.split("/")[1]}.json`, JSON.stringify(result.lhr));
    const scores = Object.fromEntries(Object.keys(budgets).map((category) => [category, result.lhr.categories[category]?.score ?? 0]));
    console.log(JSON.stringify({ route, scores }));
    for (const [category, threshold] of Object.entries(budgets)) if (scores[category] < threshold) failed = true;
  }
} finally { chrome.kill(); }
if (failed) throw new Error("Mobile Lighthouse budgets failed; inspect .lighthouseci reports");
