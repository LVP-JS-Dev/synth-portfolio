import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TopNav } from "./TopNav";

vi.mock("next/link", () => {
  return {
    default: ({
      href,
      children,
      ...rest
    }: {
      href: string;
      children: React.ReactNode;
    }) => (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
  };
});

describe("TopNav", () => {
  test("renders primary navigation links", () => {
    render(<TopNav />);

    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/#about");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/#experience");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Quality" })).toHaveAttribute("href", "/#quality");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");
  });
});

