import { test, expect } from "@playwright/test";

test.describe("Keystatic Admin Panel", () => {
  test("should respond with 200 OK", async ({ page }) => {
    // Navigate to the keystatic admin route and wait for the response
    const response = await page.goto("/keystatic");

    // Check that the server responded successfully, confirming the route exists
    // and didn't crash on the server side.
    expect(response?.status()).toBe(200);
  });
});

