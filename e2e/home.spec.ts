import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page and display main content", async ({ page }) => {
    await page.goto("/");

    // Verify main heading exists
    await expect(page.getByRole("heading", { name: "Home", level: 1 })).toBeVisible();

    // Verify introductory text exists
    await expect(page.getByText("Building resilient web products with clear UX and measurable outcomes.")).toBeVisible();
  });
});
