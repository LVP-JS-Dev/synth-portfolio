import { test, expect } from "@playwright/test";

test.describe("Legal Page", () => {
  test("should load the legal page and display content", async ({ page }) => {
    await page.goto("/legal");

    // Verify main heading exists
    await expect(page.getByRole("heading", { name: "Legal", level: 1 })).toBeVisible();

    // Verify legal body text exists
    await expect(page.getByText("This page describes legal and privacy commitments for this portfolio website.")).toBeVisible();
  });
});
