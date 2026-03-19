import { test, expect } from "@playwright/test";
import { getHomeContent } from "../lib/content";

test.describe("Home Page", () => {
  test("should load the home page and display main content", async ({ page }) => {
    await page.goto("/");

    // Load content fixture directly from the same source the app uses
    const content = await getHomeContent("en");

    // Verify main heading exists using fixture
    await expect(page.getByRole("heading", { name: content.title, level: 1 })).toBeVisible();

    // Verify introductory text exists using fixture
    await expect(page.getByText(content.intro)).toBeVisible();
  });
});
