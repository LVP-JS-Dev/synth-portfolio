import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  test("renders title and primary CTAs", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1, name: /senior frontend engineer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view projects/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /engineering quality/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^contact$/i })).toBeInTheDocument();
  });
});

