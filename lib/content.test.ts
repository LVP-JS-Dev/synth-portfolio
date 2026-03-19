import { describe, expect, it, vi, beforeEach } from "vitest";

const createReaderMock = vi.fn();

vi.mock("@/keystatic.config", () => ({
  __esModule: true,
  default: {},
}));
vi.mock("@keystatic/core/reader", () => ({
  createReader: createReaderMock,
}));

type ReaderStub = ReturnType<typeof createReaderMock>;

const createReaderStub = () => {
  const singletonFactory = () => ({ read: vi.fn() });

  return {
    singletons: {
      home: singletonFactory(),
      projectsPage: singletonFactory(),
      legal: singletonFactory(),
    },
    collections: {
      projects: {
        all: vi.fn(),
        read: vi.fn(),
      },
    },
  };
};

describe("content reader hardening", () => {
  let readerStub: ReaderStub;

  beforeEach(async () => {
    vi.resetModules();
    readerStub = createReaderStub() as ReaderStub;
    createReaderMock.mockReturnValue(readerStub);
  });

  it("normalizes malformed stack entries", async () => {
    readerStub.collections.projects.all.mockResolvedValue([
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
    readerStub.singletons.home.read.mockResolvedValue({ titleEn: "Custom" });

    const content = await import("./content");
    const result = await content.getHomeContent("en");

    expect(result.title).toBe("Custom");
    expect(result.description).not.toHaveLength(0);
    expect(result.intro).not.toHaveLength(0);
  });

  it("returns fallback when singleton read throws", async () => {
    readerStub.singletons.home.read.mockRejectedValue(new Error("boom"));

    const content = await import("./content");
    const result = await content.getHomeContent("en");

    expect(result.title).toBe("Home");
  });

  it("returns null when project read throws", async () => {
    readerStub.collections.projects.read.mockRejectedValue(new Error("boom"));

    const content = await import("./content");
    const result = await content.getProjectBySlug("missing");

    expect(result).toBeNull();
  });
});
