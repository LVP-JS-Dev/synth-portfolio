import { render, screen } from "@testing-library/react";
import { ArrowRight } from "lucide-react";
import { describe, expect, test } from "vitest";
import { IconWrapper } from "./IconWrapper";

describe("IconWrapper", () => {
  test("renders decorative icon without label", () => {
    const { container } = render(<IconWrapper icon={ArrowRight} />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  test("throws if non decorative icon missing label", () => {
    const invalidProps = { icon: ArrowRight, decorative: false } as Parameters<typeof IconWrapper>[0];

    expect(() => render(<IconWrapper {...invalidProps} />)).toThrow(
      "Non-decorative icons must provide an accessible label",
    );
  });

  test("renders non decorative icon with label", () => {
    render(<IconWrapper icon={ArrowRight} decorative={false} label="Arrow pointing" />);

    const svg = screen.getByLabelText("Arrow pointing", { selector: "svg" });

    expect(svg).toHaveAttribute("aria-label", "Arrow pointing");
    expect(svg).not.toHaveAttribute("aria-hidden");
  });
});
