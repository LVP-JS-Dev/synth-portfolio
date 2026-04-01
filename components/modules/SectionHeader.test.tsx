import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  test("renders the configured heading level", () => {
    render(<SectionHeader kicker="Kicker" title="Title" subtitle="Subtitle" titleAs="h2" />);

    expect(screen.getByRole("heading", { level: 2, name: "Title" })).toBeInTheDocument();
  });

  test("renders h3 by default when titleAs is omitted", () => {
    render(<SectionHeader kicker="Kicker" title="Title" subtitle="Subtitle" />);

    expect(screen.getByRole("heading", { level: 3, name: "Title" })).toBeInTheDocument();
  });
});
