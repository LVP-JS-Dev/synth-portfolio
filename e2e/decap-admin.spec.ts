import { expect, test } from "@playwright/test";

test.describe("Decap CMS Admin", () => {
  test("should respond with 200 OK", async ({ page }) => {
    const response = await page.goto("/admin");
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Content Manager");
  });
});
