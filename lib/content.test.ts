import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/content-store", () => ({
  listProjectSlugs: vi.fn(),
  readAllProjects: vi.fn(),
  readProject: vi.fn(),
  readSingleton: vi.fn(),
}));

describe("content reader hardening", () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("normalizes malformed stack entries", async () => {
    const store = await import("@/lib/content-store");
    vi.mocked(store.readAllProjects).mockResolvedValue([
      {
        slug: "malformed",
        entry: {
          slug: "malformed",
          titleEn: "M",
          titleRu: "м",
          summaryEn: "S",
          summaryRu: "с",
          year: 2020,
          stack: "not-array",
          featured: true,
        },
      },
    ]);

    const content = await import("./content");
    const result = await content.getAllProjects();

    expect(result).toHaveLength(1);
    expect(result[0].stack).toEqual([]);
  });

  it("fills missing singleton fields with fallbacks", async () => {
    const store = await import("@/lib/content-store");
    vi.mocked(store.readSingleton).mockResolvedValue({ titleEn: "Custom" });

    const content = await import("./content");
    const result = await content.getHomeContent("en");

    expect(result.title).toBe("Custom");
    expect(result.description).not.toHaveLength(0);
    expect(result.intro).not.toHaveLength(0);
  });

  it("returns fallback when singleton read throws", async () => {
    const store = await import("@/lib/content-store");
    vi.mocked(store.readSingleton).mockRejectedValue(new Error("boom"));

    const content = await import("./content");
    const result = await content.getHomeContent("en");

    expect(result.title).toBe("Home");
  });

  it("returns null when project read throws", async () => {
    const store = await import("@/lib/content-store");
    vi.mocked(store.readProject).mockRejectedValue(new Error("boom"));

    const content = await import("./content");
    const result = await content.getProjectBySlug("missing");

    expect(result).toBeNull();
  });
});
