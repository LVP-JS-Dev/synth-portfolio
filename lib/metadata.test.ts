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
    const metadata = buildMetadata("/projects", "en");
    expect(metadata.alternates?.canonical).toBe("https://example.com/projects");
  });

  it("generates RU canonical", () => {
    const metadata = buildMetadata("/projects", "ru");
    expect(metadata.alternates?.canonical).toBe("https://example.ru/projects");
  });

  it("includes expected hreflang entries", () => {
    const metadata = buildMetadata("/projects", "en");
    expect(metadata.alternates?.languages).toEqual({
      en: "https://example.com/projects",
      ru: "https://example.ru/projects",
      "x-default": "https://example.com/projects",
    });
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
    const metadata = buildMetadata("/projects", "en");
    expect(metadata).not.toHaveProperty("title");
    expect(metadata).not.toHaveProperty("description");
  });

  it("falls back when SITE_ORIGIN_EN is missing", () => {
    delete process.env.SITE_ORIGIN_EN;
    const metadata = buildMetadata("/projects", "en", undefined, {
      host: "localhost:3000",
      proto: "http",
    });
    expect(metadata.alternates?.languages?.en).toBe("http://localhost:3000/projects");
  });

  it("falls back when SITE_ORIGIN_RU is missing", () => {
    delete process.env.SITE_ORIGIN_RU;
    const metadata = buildMetadata("/projects", "ru", undefined, {
      host: "localhost:3000",
      proto: "http",
    });
    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/projects");
  });
});
