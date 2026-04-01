import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ContactSection } from "./ContactSection";

describe("ContactSection", () => {
  test("shows a polite confirmation after submit", () => {
    render(<ContactSection />);

    const form = screen.getByRole("button", { name: /send message/i }).closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(screen.getByRole("status")).toHaveTextContent(/message sent/i);
  });
});
