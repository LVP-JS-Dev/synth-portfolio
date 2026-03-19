import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FormField } from "./FormField";

describe("FormField", () => {
  test("renders label and input with shared id", () => {
    render(<FormField id="email" label="Email" />);

    const input = screen.getByLabelText("Email") as HTMLInputElement;

    expect(input).toHaveAttribute("id", "email");
  });

  test("associates aria-describedby and invalid state when error provided", () => {
    render(<FormField id="email" label="Email" error="Required" />);

    const input = screen.getByRole("textbox", { name: "Email" });

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  test("renders honeypot when honeypotName provided", () => {
    const { container } = render(
      <FormField id="email" label="Email" honeypotName="full-name" />,
    );

    const honeypot = container.querySelector("input[name=\"full-name\"]");

    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
  });
});
