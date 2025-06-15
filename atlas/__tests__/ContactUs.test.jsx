// __tests__/ContactUs.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ContactUs from "../src/components/custom/ContactUs";

describe("ContactUs component", () => {
  let container;

  beforeEach(() => {
    const result = render(<ContactUs />);
    container = result.container;
  });

  it("renders the main heading with expected text and classes", () => {
    const mainHeading = screen.getByText(
      /we're here to help you plan your trip/i
    );
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading.tagName).toMatch(/H[1-6]/);
    expect(mainHeading.className).toMatch(/text-(3|4)xl/);
    expect(mainHeading).toHaveClass("font-bold", "mb-4");
  });

  it("renders the subheading with expected text and classes", () => {
    const subHeading = screen.getByText(
      /our team is available to help you with any questions/i
    );
    expect(subHeading).toBeInTheDocument();
    expect(subHeading.tagName).toMatch(/H[1-6]/);
    expect(subHeading.className).toMatch(/text-(lg|xl)/);
    expect(subHeading).toHaveClass("text-gray-700", "mb-6");
  });

  it("renders the contact link with correct text, href, and classes", () => {
    const link = screen.getByRole("link", { name: /contact us/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(/^Contact Us$/);
    expect(link).toHaveAttribute(
      "href",
      "mailto:maorat@ac.sce.ac.il, guyez@ac.sce.ac.il"
    );
    expect(link).toHaveClass(
      "inline-flex",
      "items-center",
      "bg-teal-500",
      "text-white",
      "rounded-lg"
    );
    expect(link.className).toMatch(/px-(5|6)/);
    expect(link.className).toMatch(/py-3/);
    expect(link.className).toMatch(/text-(base|lg)/);
  });

  it("renders a paper plane icon inside the link", () => {
    const link = screen.getByRole("link", { name: /contact us/i });
    const svg = link.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("mr-2", "text-xl");
  });

  it("has a root div with the expected styling classes", () => {
    const rootDiv = container.firstChild;
    expect(rootDiv.className).toMatch(/py-(12|16)/);
    expect(rootDiv).toHaveClass("bg-teal-50", "text-center");
  });
});
