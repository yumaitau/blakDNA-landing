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

test("footer identifies the maker and links its supplier certification", async ({ page }) => {
  await page.goto("/");
  const credentials = page.locator(".footer-credentials");
  await credentials.scrollIntoViewIfNeeded();
  await expect(credentials.getByRole("link", { name: "Visit Yuma IT" })).toHaveAttribute("href", "https://www.yumait.com.au/");
  await expect(credentials.getByRole("link", { name: /Supply Nation Certified/ })).toHaveAttribute("href", "https://ibd.supplynation.org.au/public/s/supplierprofile?accid=a1GOd0000047QDBMA2");
  for (const logo of await credentials.getByRole("img").all()) {
    await expect.poll(() => logo.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
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

test("product tour focuses on six consequential outcomes", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Follow the product journey" }).click();
  await expect(page).toHaveURL(/\/product\/#product-tour$/);
  await expect(page.locator("#product-tour")).toContainText("synthetic organisation");
  const chapters = page.locator(".tour-chapter");
  await expect(chapters).toHaveCount(6);
  await expect(page.locator("#product-tour")).not.toContainText(/sign.in|password|administration|empty state/i);
  for (const chapter of await chapters.all()) {
    const picture = chapter.getByRole("img");
    await picture.scrollIntoViewIfNeeded();
    await expect.poll(() => picture.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    for (const label of ["Desktop detail", "Mobile detail"]) {
      const href = await chapter.getByRole("link", { name: label, exact: true }).getAttribute("href");
      const response = await page.request.get(href!);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await chapters.nth(0).screenshot({ path: testInfo.outputPath("product-tour-critical.png") });
  await chapters.nth(5).screenshot({ path: testInfo.outputPath("product-tour-recurrence.png") });
});

test("DNA connections support touch, keyboard, motion controls and linked outcomes", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#living-genome");
  const explorer = page.locator(".dna-explorer");
  await expect(explorer).toHaveAttribute("data-ready", "true");
  const canvas = explorer.locator("canvas");
  const rotation = page.getByRole("slider", { name: "Rotate DNA" });
  await expect(page.getByRole("button", { name: "Play animation" })).toBeVisible();
  const initial = await canvas.getAttribute("data-rotation");
  await rotation.focus();
  await page.keyboard.press("ArrowRight");
  await expect(canvas).not.toHaveAttribute("data-rotation", initial!);
  await expect(rotation).toHaveValue("36");
  await canvas.scrollIntoViewIfNeeded();
  const bounds = await canvas.boundingBox();
  await page.mouse.move(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds!.x + bounds!.width / 2 + 50, bounds!.y + bounds!.height / 2, { steps: 6 });
  await page.mouse.up();
  await expect(rotation).not.toHaveValue("36");
  for (const feature of await explorer.locator(".dna-feature").all()) {
    const summary = feature.locator("summary");
    if ((await feature.getAttribute("open")) === null) await summary.click();
    await expect(feature).toHaveAttribute("open", "");
    await expect(feature.locator("a")).toBeVisible();
  }
  await page.getByRole("button", { name: "Play animation" }).scrollIntoViewIfNeeded();
  await canvas.scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Play animation" }).click();
  await canvas.scrollIntoViewIfNeeded();
  const before = await canvas.getAttribute("data-rotation");
  await expect(canvas).not.toHaveAttribute("data-rotation", before!);
  await page.getByRole("button", { name: "Pause animation" }).click();
  const paused = await canvas.getAttribute("data-rotation");
  await expect.poll(async () => {
    await page.waitForTimeout(150);
    return canvas.getAttribute("data-rotation");
  }).toBe(paused);
  await page.getByText("Verify the fix", { exact: true }).click();
  const results = await new AxeBuilder({ page }).include("#living-genome").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("interactive-dna.png"), fullPage: true });
  await page.getByRole("link", { name: "See verified remediation" }).click();
  await expect(page).toHaveURL(/\/product\/#screen-09-verified-remediation$/);
  expect(errors).toEqual([]);
});

test("DNA content remains usable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL: baseURL!, javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
  const page = await context.newPage();
  await page.goto("/#living-genome");
  await expect(page.locator(".dna-poster")).toBeVisible();
  await expect(page.locator(".dna-controls")).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByText("Verify the fix", { exact: true }).click();
  await page.getByRole("link", { name: "See verified remediation" }).click();
  await expect(page).toHaveURL(/\/product\/#screen-09-verified-remediation$/);
  await context.close();
});

test("DNA callouts stay clear at tablet widths and motion stops offscreen", async ({ page }) => {
  await page.goto("/#living-genome");
  for (const width of [820, 1024]) {
    await page.setViewportSize({ width, height: 1000 });
    const features = page.locator(".dna-feature");
    for (let index = 0; index < 4; index++) {
      const feature = features.nth(index);
      if ((await feature.getAttribute("open")) === null) await feature.locator("summary").click();
      const bounds = await feature.boundingBox();
      const next = await features.nth(index + 2).boundingBox();
      expect(bounds!.y + bounds!.height, `Callout ${index} at ${width}px`).toBeLessThanOrEqual(next!.y);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const canvas = page.locator(".dna-explorer canvas");
  await canvas.scrollIntoViewIfNeeded();
  const rotating = await canvas.getAttribute("data-rotation");
  await expect(canvas).not.toHaveAttribute("data-rotation", rotating!);
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const offscreen = await canvas.getAttribute("data-rotation");
  await page.waitForTimeout(200);
  await expect(canvas).toHaveAttribute("data-rotation", offscreen!);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await canvas.scrollIntoViewIfNeeded();
  await expect(page.getByRole("button", { name: "Play animation" })).toBeVisible();
});
