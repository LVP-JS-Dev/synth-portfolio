import { render, screen } from "@testing-library/react";
import { ArrowRight } from "lucide-react";
import { describe, expect, test } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  test("renders default primary variant", () => {
    render(<Button>Primary</Button>);

    expect(screen.getByRole("button")).toHaveTextContent("Primary");
  });

  test("supports icon slot", () => {
    render(<Button iconSlot={<ArrowRight data-testid="icon" />}>With Icon</Button>);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
