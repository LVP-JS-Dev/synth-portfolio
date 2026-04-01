import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

describe("content store", () => {
  let tempDir: string;
  let cwdSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    vi.resetModules();

    tempDir = await mkdtemp(path.join(os.tmpdir(), "synth-portfolio-content-store-"));
    cwdSpy = vi.spyOn(process, "cwd").mockReturnValue(tempDir);

    await mkdir(path.join(tempDir, "content", "projects"), { recursive: true });
    await mkdir(path.join(tempDir, "content", "pages"), { recursive: true });
  });

  afterEach(async () => {
    await cwdSpy?.mockRestore?.();
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("lists slugs from yaml files", async () => {
    await writeFile(path.join(tempDir, "content", "projects", "a.yaml"), "slug: a\n", "utf8");
    await writeFile(path.join(tempDir, "content", "projects", "b.yml"), "slug: b\n", "utf8");
    await writeFile(path.join(tempDir, "content", "projects", "c.yaml"), "slug: c\n", "utf8");

    const store = await import("./content-store");
    await expect(store.listProjectSlugs()).resolves.toEqual(["a", "c"]);
  });

  it("reads and parses singletons", async () => {
    await writeFile(path.join(tempDir, "content", "pages", "home.yaml"), "titleEn: Hello\n", "utf8");

    const store = await import("./content-store");
    await expect(store.readSingleton("home")).resolves.toEqual({ titleEn: "Hello" });
  });

  it("returns null when file read fails", async () => {
    const store = await import("./content-store");
    await expect(store.readProject("nope")).resolves.toBeNull();
  });

  it("returns null when yaml parse fails", async () => {
    await writeFile(path.join(tempDir, "content", "projects", "bad.yaml"), "{", "utf8");

    const store = await import("./content-store");
    await expect(store.readProject("bad")).resolves.toBeNull();
  });

  it("rejects unsafe slugs", async () => {
    const store = await import("./content-store");
    await expect(store.readProject("../secrets")).resolves.toBeNull();
    await expect(store.readProject("nested/path")).resolves.toBeNull();
  });
});
