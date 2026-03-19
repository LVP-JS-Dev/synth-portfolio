/// <reference types="@testing-library/jest-dom" />

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { CookieBanner } from "./CookieBanner";

const CONSENT_KEY = "cookie-consent";

describe("CookieBanner", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
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
    expect(screen.queryByRole("status")).toBeNull();
  });

  test("dismiss button stores dismissed and runs callback", () => {
    const onDismiss = vi.fn();
    render(<CookieBanner onDismiss={onDismiss} />);

    fireEvent.click(screen.getByRole("button", { name: /отказ/i }));

    expect(localStorage.getItem(CONSENT_KEY)).toBe("dismissed");
    expect(onDismiss).toHaveBeenCalled();
    expect(screen.queryByRole("status")).toBeNull();
  });
});
