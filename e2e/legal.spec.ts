import { test, expect } from "@playwright/test";
import { getLegalContent } from "../lib/content";

test.describe("Legal Page", () => {
  test("should load the legal page and display content", async ({ page }) => {
    await page.goto("/legal");

    const content = await getLegalContent("en");

    // Verify main heading exists using CMS fixture
    await expect(page.getByRole("heading", { name: content.title, level: 1 })).toBeVisible();

    // Verify legal body text exists using CMS fixture
    await expect(page.getByText(content.body)).toBeVisible();
  });
});
