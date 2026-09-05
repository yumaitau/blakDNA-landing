import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  reporter: [["list"], ["html", { open: "never" }]],
  snapshotPathTemplate: "{testDir}/visual/{projectName}/{arg}{ext}",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.004, animations: "disabled" } },
  use: { baseURL: process.env.BLAKDNA_SITE_TEST_URL ?? "http://127.0.0.1:4321", trace: "retain-on-failure", reducedMotion: "reduce" },
  projects: [
    { name: "desktop-dark", use: { browserName: "chromium", viewport: { width: 1440, height: 1000 }, colorScheme: "dark" } },
    { name: "mobile-dark", use: { browserName: "chromium", viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1, colorScheme: "dark" } },
    { name: "desktop-light", use: { browserName: "chromium", viewport: { width: 1440, height: 1000 }, colorScheme: "light" } },
  ],
  ...(process.env.BLAKDNA_SITE_TEST_URL ? {} : { webServer: { command: "node scripts/serve.mjs", url: "http://127.0.0.1:4321", reuseExistingServer: !process.env.CI } }),
});
