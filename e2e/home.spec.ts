import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page and display main content", async ({ page }) => {
    const browserErrors: string[] = [];

    page.on("pageerror", (error) => {
      browserErrors.push(error.message);
    });

    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") {
        browserErrors.push(message.text());
      }
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Experience", level: 2 })).toBeVisible();

    await page.waitForTimeout(250);

    const hydrationIssues = browserErrors.filter((text) => {
      return (
        /hydration failed/i.test(text) ||
        /hydration mismatch/i.test(text) ||
        /didn't match the client properties/i.test(text) ||
        /hydrated but some attributes/i.test(text) ||
        /script tag while rendering react component/i.test(text)
      );
    });

    expect(hydrationIssues, hydrationIssues.join("\n")).toHaveLength(0);
  });
});
