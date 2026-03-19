import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { buildMetadata } from "./metadata";

const originalEnv = process.env;

describe("buildMetadata", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.SITE_ORIGIN_EN = "https://example.com";
    process.env.SITE_ORIGIN_RU = "https://example.ru";
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("generates EN canonical", () => {
    const metadata = buildMetadata("/projects");
    expect(metadata.alternates?.canonical).toBe("https://example.com/projects");
  });

  it("generates RU canonical", () => {
    const metadata = buildMetadata("/projects", "ru");
    expect(metadata.alternates?.canonical).toBe("https://example.ru/projects");
  });

  it("includes expected hreflang entries without RU", () => {
    const metadata = buildMetadata("/projects");
    expect(metadata.alternates?.languages).toEqual({
      en: "https://example.com/projects",
      "x-default": "https://example.com/projects",
    });
    expect(metadata.alternates?.languages).not.toHaveProperty("ru");
  });

  it("applies metadata overrides", () => {
    const metadata = buildMetadata("/projects", "en", {
      title: "Projects",
      description: "Case studies",
    });

    expect(metadata.title).toBe("Projects");
    expect(metadata.description).toBe("Case studies");
  });

  it("omits title and description when overrides are absent", () => {
    const metadata = buildMetadata("/projects");
    expect(metadata).not.toHaveProperty("title");
    expect(metadata).not.toHaveProperty("description");
  });

  it("falls back when SITE_ORIGIN_EN is missing", () => {
    delete process.env.SITE_ORIGIN_EN;
    const metadata = buildMetadata("/projects");
    expect(metadata.alternates?.languages?.en).toBe("https://example.com/projects");
  });

  it("falls back when SITE_ORIGIN_RU is missing", () => {
    delete process.env.SITE_ORIGIN_RU;
    const metadata = buildMetadata("/projects", "ru");
    expect(metadata.alternates?.canonical).toBe("https://example.ru/projects");
  });
});
