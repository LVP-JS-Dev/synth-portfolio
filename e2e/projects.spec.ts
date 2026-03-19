import { test, expect } from "@playwright/test";

test.describe("Projects Page", () => {
  test("should load the projects list", async ({ page }) => {
    await page.goto("/projects");

    // Verify page heading
    await expect(page.getByRole("heading", { name: "Projects", level: 1 })).toBeVisible();

    // Verify page description
    await expect(page.getByText("Case studies, implementation notes, and outcomes.")).toBeVisible();

    // Verify the project from CMS exists
    const projectLink = page.getByRole("link", { name: "Synth Portfolio v2" });
    await expect(projectLink).toBeVisible();
  });

  test("project links should navigate correctly", async ({ page }) => {
    await page.goto("/projects");

    // Click on the specific project link
    await page.getByRole("link", { name: "Synth Portfolio v2" }).click();

    // Wait for navigation and verify URL contains the expected slug
    await expect(page).toHaveURL(/.*\/projects\/synth-portfolio-v2/);
  });
});
