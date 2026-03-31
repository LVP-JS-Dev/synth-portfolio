import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page and display main content", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Experience", level: 2 })).toBeVisible();
  });
});
