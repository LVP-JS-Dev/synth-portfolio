import { test, expect } from "@playwright/test";
import { getProjectsPageContent, getAllProjects, getProjectBySlug } from "../lib/content";

test.describe("Projects Page", () => {
  test("should load the projects list", async ({ page }) => {
    await page.goto("/projects");

    const content = await getProjectsPageContent("en");

    // Verify page heading
    await expect(page.getByRole("heading", { name: content.title, level: 1 })).toBeVisible();

    // Verify page description
    await expect(page.getByText(content.description)).toBeVisible();

    // Verify that at least one project from CMS exists if there are any
    const projects = await getAllProjects();
    if (projects.length > 0) {
      const firstProject = projects[0];
      const projectLink = page.getByRole("link", { name: firstProject.titleEn });
      await expect(projectLink).toBeVisible();
    }
  });

  test("project links should navigate correctly", async ({ page }) => {
    const projects = await getAllProjects();
    if (projects.length === 0) {
      test.skip();
      return;
    }

    await page.goto("/projects");

    const firstProject = projects[0];

    // Click on the specific project link
    const projectLink = page.getByRole("link", { name: firstProject.titleEn });
    await expect(projectLink).toBeVisible();
    await projectLink.click();

    // Wait for navigation and verify URL contains the expected slug
    await expect(page).toHaveURL(new RegExp(`/projects/${firstProject.slug}/?$`), { timeout: 30_000 });
  });

  test("design v2 case route should resolve", async ({ page }) => {
    const project = await getProjectBySlug("realtime-collaboration-suite");
    expect(project, "design v2 slug must exist in content/projects").not.toBeNull();

    await page.goto("/projects/realtime-collaboration-suite");
    await expect(page.getByRole("heading", { level: 1, name: project!.titleEn })).toBeVisible();
  });
});
