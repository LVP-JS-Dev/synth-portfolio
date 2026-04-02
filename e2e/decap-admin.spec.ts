import { expect, test } from "@playwright/test";

test.describe("Decap CMS Admin", () => {
  test.skip(process.env.E2E_SERVER_MODE === "prod", "Decap admin is dev-only in production builds");

  test("should respond with 200 OK", async ({ page }) => {
    const response = await page.goto("/admin/index.html", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("Content Manager");
  });
});
