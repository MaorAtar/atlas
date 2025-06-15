// __tests__/WhatsIncluded.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import WhatsIncluded from "../src/components/custom/WhatsIncluded";

describe("WhatsIncluded component", () => {
  let container;

  beforeEach(() => {
    const result = render(<WhatsIncluded />);
    container = result.container;
  });

  it("renders the section heading with correct text and classes", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /What's Included/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      "text-3xl",
      "md:text-4xl",
      "font-bold",
      "mb-10",
      "mt-10"
    );
  });

  it("wraps content in a root div with proper styling classes", () => {
    const rootDiv = container.firstChild;
    expect(rootDiv).toHaveClass("max-w-7xl", "mx-auto", "text-center");
  });

  it("renders three feature items with appropriate headings and descriptions", () => {
    const itemHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(itemHeadings).toHaveLength(3);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Restaurants & Attractions/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Curated Hotels/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Offline Access/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Relevant recommendations for every day/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Discover the best hotels for you/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Export your itinerary/i)).toBeInTheDocument();
  });

  it("each item has an icon container with correct classes and an svg", () => {
    const items = [
      "Restaurants & Attractions",
      "Curated Hotels",
      "Offline Access",
    ];
    items.forEach((title) => {
      const heading = screen.getByRole("heading", {
        level: 3,
        name: new RegExp(title, "i"),
      });
      const itemContainer = heading.closest("div.flex-col");
      expect(itemContainer).toBeInTheDocument();

      const iconWrapper = itemContainer.querySelector("div.p-4");
      expect(iconWrapper).toHaveClass(
        "p-4",
        "rounded-full",
        "bg-teal-100",
        "mb-4"
      );
      expect(iconWrapper.querySelector("svg")).toBeInTheDocument();
    });
  });
});
