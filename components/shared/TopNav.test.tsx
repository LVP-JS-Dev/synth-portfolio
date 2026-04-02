import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { TopNav } from "./TopNav";
import { renderWithI18n } from "@/test-utils/renderWithI18n";

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

vi.mock("next/navigation", () => {
  return {
    usePathname: () => "/projects",
    useSearchParams: () => new URLSearchParams("q=1"),
  };
});

describe("TopNav", () => {
  test("renders primary navigation links", () => {
    renderWithI18n(<TopNav />, {
      locale: "en",
      origins: { en: "https://example.com", ru: "https://example.ru" },
    });

    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/#about");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/#experience");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Quality" })).toHaveAttribute("href", "/#quality");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/#contact");

    expect(screen.getByRole("link", { name: "Switch language" })).toHaveAttribute(
      "href",
      "https://example.ru/projects?q=1",
    );
  });
});
