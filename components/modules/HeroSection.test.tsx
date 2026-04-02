import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HeroSection } from "./HeroSection";
import { renderWithI18n } from "@/test-utils/renderWithI18n";

describe("HeroSection", () => {
  test("renders title and primary CTAs", () => {
    renderWithI18n(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1, name: /senior frontend engineer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view projects/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /engineering quality/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^contact$/i })).toBeInTheDocument();
  });

  test("renders RU copy when locale is ru", () => {
    renderWithI18n(<HeroSection />, { locale: "ru" });

    expect(screen.getByRole("heading", { level: 1, name: /senior frontend/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /смотреть проекты/i })).toBeInTheDocument();
  });
});
