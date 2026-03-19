import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { CookieBanner } from "./CookieBanner";
import { CONSENT_STORAGE_KEY, getConsentSnapshot } from "./consentService";

const CONSENT_KEY = CONSENT_STORAGE_KEY;

describe("CookieBanner", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  test("does not render when consent already exists", () => {
    localStorage.setItem(CONSENT_KEY, "accepted");

    render(<CookieBanner />);

    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
  });

  test("invalid stored consent is self-healed and banner is shown", () => {
    localStorage.setItem(CONSENT_KEY, "invalid-value");

    render(<CookieBanner />);

    expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
  });

  test("invalid stored consent is removed before render", () => {
    localStorage.setItem(CONSENT_KEY, "invalid-value");

    render(<CookieBanner />);

    expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
  });

  test("shows banner when consent not stored", () => {
    render(<CookieBanner />);

    expect(screen.getByText(/мы используем куки/i)).toBeInTheDocument();
  });

  test("accept button stores accepted and runs callback", () => {
    const onAccept = vi.fn();
    render(<CookieBanner onAccept={onAccept} />);

    fireEvent.click(screen.getByRole("button", { name: /принять/i }));

    expect(localStorage.getItem(CONSENT_KEY)).toBe("accepted");
    expect(onAccept).toHaveBeenCalled();
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
  });

  test("dismiss button stores dismissed and runs callback", () => {
    const onDismiss = vi.fn();
    render(<CookieBanner onDismiss={onDismiss} />);

    fireEvent.click(screen.getByRole("button", { name: /отказ/i }));

    expect(localStorage.getItem(CONSENT_KEY)).toBe("dismissed");
    expect(onDismiss).toHaveBeenCalled();
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
  });

  test("service is hydration-safe when window is undefined", () => {
    const originalWindow = globalThis.window;
    // @ts-expect-error - deleting for hydration simulation
    delete (globalThis as typeof globalThis & { window?: Window }).window;

    expect(getConsentSnapshot()).toBeNull();

    globalThis.window = originalWindow;
  });
});
