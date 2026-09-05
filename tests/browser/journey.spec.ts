import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routePaths } from "../../src/data/pages";

test("visitor follows the organism, contact and buyer handoff", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("cyber DNA");
  await expect(page.getByRole("link", { name: "Discuss an evaluation" })).toHaveAttribute("href", process.env.PUBLIC_SALES_URL ?? "https://www.yumait.com.au/contact");
  await page.getByRole("link", { name: "Follow a mutation" }).click();
  await expect(page).toHaveURL(/\/how-it-works\/$/);
  if (isMobile) {
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("button", { name: "Menu" }).click();
  }
  await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.getByRole("link", { name: "Discuss an evaluation" })).toHaveAttribute("href", process.env.PUBLIC_SALES_URL ?? "https://www.yumait.com.au/contact");
  await page.getByRole("navigation", { name: "Operate", exact: true }).getByRole("link", { name: "Deployment", exact: true }).click();
  await expect(page.getByRole("link", { name: "Deployment repository", exact: false }).first()).toHaveAttribute("href", process.env.PUBLIC_DEPLOY_URL ?? "https://github.com/yumaitau/blakDNA-aws-deploy");
  expect(errors).toEqual([]);
});

test("keyboard skip, disclosure and missing-page recovery work", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  const disclosure = page.getByText("Does normal behaviour become trusted automatically?", { exact: true });
  await disclosure.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("No. Normal and secure remain separate judgements.", { exact: false })).toBeVisible();
  const missing = await page.goto("/missing-page-for-journey/");
  expect(missing?.status()).toBe(404);
  await page.getByRole("link", { name: "Return to blakDNA" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("every page is accessible, responsive and free of third-party trackers", async ({ page }) => {
  const destinations = new Set<string>();
  page.on("request", (request) => { destinations.add(new URL(request.url()).origin); });
  for (const route of routePaths) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? "")), route).toEqual([]);
  }
  expect(destinations.size).toBe(1);
  expect(await page.context().cookies()).toEqual([]);
});

for (const route of ["/", "/architecture/", "/aws-marketplace/", "/contact/"]) {
  test(`visual baseline ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    for (const picture of await page.getByRole("img").all()) {
      await picture.scrollIntoViewIfNeeded();
      await picture.evaluate((element) => (element as HTMLImageElement).decode());
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot(`${route === "/" ? "home" : route.split("/")[1]}.png`, { fullPage: true });
  });
}

test("actual product tour exposes every desktop and mobile capture", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore all 12 product states" }).click();
  await expect(page).toHaveURL(/\/product\/#product-tour$/);
  await expect(page.locator("#product-tour")).toContainText("deterministic Hermes test adapter");
  const chapters = page.locator(".tour-chapter");
  await expect(chapters).toHaveCount(12);
  for (const chapter of await chapters.all()) {
    const picture = chapter.getByRole("img");
    await picture.scrollIntoViewIfNeeded();
    await expect.poll(() => picture.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    for (const label of ["Full desktop screen", "Full mobile screen"]) {
      const href = await chapter.getByRole("link", { name: label, exact: true }).getAttribute("href");
      const response = await page.request.get(href!);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await chapters.nth(5).screenshot({ path: testInfo.outputPath("product-tour-critical.png") });
  await chapters.nth(11).screenshot({ path: testInfo.outputPath("product-tour-recurrence.png") });
});
