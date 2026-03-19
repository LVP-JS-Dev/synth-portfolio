import { collection, config, fields, singleton } from "@keystatic/core";

export const isDevelopment = process.env.NODE_ENV === "development";
export const allowAdminUIFromEnv =
  process.env.KEYSTATIC_ENABLE_ADMIN_UI === "true" &&
  process.env.KEYSTATIC_ALLOW_PROD_ADMIN === "true";
export const showAdminUI = isDevelopment || allowAdminUIFromEnv;

export default config({
  // Local mode: reads/writes content to the filesystem.
  // Suitable for development only — not persistent on serverless (e.g. Vercel).
  // Production strategy: migrate to GitHub mode with a GitHub App for
  // git-backed editing. See: https://keystatic.com/docs/github-mode
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "slug",
      path: "content/projects/*",
      schema: {
        slug: fields.text({ label: "Slug" }),
        titleEn: fields.text({ label: "Title (EN)" }),
        titleRu: fields.text({ label: "Title (RU)" }),
        summaryEn: fields.text({ label: "Summary (EN)", multiline: true }),
        summaryRu: fields.text({ label: "Summary (RU)", multiline: true }),
        year: fields.integer({ label: "Year" }),
        stack: fields.array(fields.text({ label: "Technology" }), { label: "Stack" }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: "Home Page",
      path: "content/pages/home",
      schema: {
        titleEn: fields.text({ label: "Title (EN)" }),
        titleRu: fields.text({ label: "Title (RU)" }),
        descriptionEn: fields.text({ label: "Description (EN)", multiline: true }),
        descriptionRu: fields.text({ label: "Description (RU)", multiline: true }),
        introEn: fields.text({ label: "Intro (EN)", multiline: true }),
        introRu: fields.text({ label: "Intro (RU)", multiline: true }),
      },
    }),
    projectsPage: singleton({
      label: "Projects Page",
      path: "content/pages/projects",
      schema: {
        titleEn: fields.text({ label: "Title (EN)" }),
        titleRu: fields.text({ label: "Title (RU)" }),
        descriptionEn: fields.text({ label: "Description (EN)", multiline: true }),
        descriptionRu: fields.text({ label: "Description (RU)", multiline: true }),
      },
    }),
    legal: singleton({
      label: "Legal Page",
      path: "content/pages/legal",
      schema: {
        titleEn: fields.text({ label: "Title (EN)" }),
        titleRu: fields.text({ label: "Title (RU)" }),
        descriptionEn: fields.text({ label: "Description (EN)", multiline: true }),
        descriptionRu: fields.text({ label: "Description (RU)", multiline: true }),
        bodyEn: fields.text({ label: "Body (EN)", multiline: true }),
        bodyRu: fields.text({ label: "Body (RU)", multiline: true }),
      },
    }),
  },
});
