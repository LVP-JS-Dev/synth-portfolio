import { test, expect } from "@playwright/test";

const RU_BASE = "http://localhost:3001";

test.describe("I18n (domain-based)", () => {
  test("EN renders lang=en and canonical on EN origin", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe("http://localhost:3000/projects/");
  });

  test("RU renders lang=ru and canonical on RU origin", async ({ page }) => {
    await page.goto(`${RU_BASE}/projects`);
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBe("http://localhost:3001/projects/");
  });

  test("language switcher preserves path, query, and hash", async ({ page }) => {
    await page.goto("/projects?q=1#foo");

    await page.getByRole("link", { name: /switch language/i }).click();

    await expect(page).toHaveURL(/http:\/\/localhost:3001\/projects\/?\?q=1#foo/);
  });
});
