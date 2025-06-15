// __tests__/HowItWorks.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import HowItWorks from "../src/components/custom/HowItWorks";

describe("HowItWorks component", () => {
  let container;

  beforeEach(() => {
    const result = render(<HowItWorks />);
    container = result.container;
  });

  it("renders the section heading", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /how it works/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      "text-3xl",
      "md:text-4xl",
      "font-bold",
      "mb-10"
    );
  });

  it("has the correct root styling", () => {
    const root = container.firstChild;
    expect(root).toHaveClass("py-14", "bg-teal-50");
  });

  it("renders three step items with images", () => {
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    expect(screen.getByAltText("step1")).toHaveAttribute(
      "src",
      "/homepage-pictures/step1.png"
    );
    expect(screen.getByAltText("step2")).toHaveAttribute(
      "src",
      "/homepage-pictures/step2.png"
    );
    expect(screen.getByAltText("step3")).toHaveAttribute(
      "src",
      "/homepage-pictures/step3.png"
    );
  });

  it("renders the correct descriptions for each step", () => {
    expect(
      screen.getByText(
        /choose your destination, trip dates, and travel preferences to start planning/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /based on your input, our ai-powered system generates a customized travel plan/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/review your itinerary, and finalize your booking/i)
    ).toBeInTheDocument();
  });

  it("lays out steps in a vertical stack container", () => {
    const stack = container.querySelector(".space-y-12");
    expect(stack).toBeInTheDocument();
    // should have exactly three children (the step containers)
    expect(stack.children).toHaveLength(3);
  });
});
