import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { parseHostname } from "@/lib/i18n/hostname";
import { resolveLocale } from "@/lib/i18n/resolve-locale";
import { buildCrossDomainUrl } from "@/lib/i18n/url";
import { getSiteOrigins, getOriginHost } from "@/lib/i18n/origins";

const originalEnv = process.env;

describe("i18n helpers", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("parseHostname strips port and lowercases", () => {
    expect(parseHostname("Localhost:3000")).toBe("localhost");
    expect(parseHostname("example.com")).toBe("example.com");
    expect(parseHostname("")).toBeNull();
    expect(parseHostname(null)).toBeNull();
  });

  it("resolveLocale prefers FORCE_LOCALE when valid", () => {
    expect(
      resolveLocale({
        host: "ru.example.com",
        forceLocale: "en",
        originRuHost: "example.ru",
        originEnHost: "example.com",
      }),
    ).toBe("en");
  });

  it("resolveLocale matches RU host and subdomains", () => {
    expect(
      resolveLocale({
        host: "example.ru",
        forceLocale: null,
        originRuHost: "example.ru",
        originEnHost: "example.com",
      }),
    ).toBe("ru");

    expect(
      resolveLocale({
        host: "sub.example.ru",
        forceLocale: null,
        originRuHost: "example.ru",
        originEnHost: "example.com",
      }),
    ).toBe("ru");
  });

  it("buildCrossDomainUrl preserves search and hash", () => {
    expect(
      buildCrossDomainUrl({
        targetLocale: "ru",
        origins: { en: "https://example.com", ru: "https://example.ru" },
        pathname: "/projects",
        search: "q=1",
        hash: "section",
      }),
    ).toBe("https://example.ru/projects?q=1#section");
  });

  it("getSiteOrigins derives localhost origin with http by default", () => {
    delete process.env.SITE_ORIGIN_EN;
    delete process.env.SITE_ORIGIN_RU;

    const origins = getSiteOrigins({ requestHost: "localhost:3000", requestProto: null });
    expect(origins.en).toBe("http://localhost:3000");
    expect(origins.ru).toBe("http://localhost:3000");
    expect(getOriginHost(origins.en)).toBe("localhost");
  });
});

