import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ContactSection } from "./ContactSection";
import { renderWithI18n } from "@/test-utils/renderWithI18n";

describe("ContactSection", () => {
  test("shows a polite confirmation after submit", () => {
    renderWithI18n(<ContactSection />);

    const form = screen.getByRole("button", { name: /send message/i }).closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(screen.getByRole("status")).toHaveTextContent(/message sent/i);
  });
});
