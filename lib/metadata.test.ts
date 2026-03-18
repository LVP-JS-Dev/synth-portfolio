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

  it("includes expected hreflang entries", () => {
    const metadata = buildMetadata("/projects");
    expect(metadata.alternates?.languages).toEqual({
      en: "https://example.com/projects",
      ru: "https://example.ru/projects",
      "x-default": "https://example.com/projects",
    });
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
