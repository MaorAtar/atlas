// __tests__/UserGallery.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserGallery from "../src/components/custom/UserGallery";

describe("UserGallery component", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders the section heading", () => {
    render(<UserGallery />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /over 100 itineraries created/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass(
      "text-2xl",
      "md:text-4xl",
      "font-bold",
      "mb-6",
      "text-center"
    );
  });

  it("shows the first user as current on initial render", () => {
    render(<UserGallery />);
    const currentCardHeading = screen.getByRole("heading", {
      level: 3,
      name: /Tal Visited/i,
    });
    expect(currentCardHeading).toBeInTheDocument();
    const img = screen.getByAltText("Tal");
    expect(img).toHaveAttribute("src", "/homepage-pictures/user1.jpg");
  });

  it("applies opacity-50 to previous and next cards initially", () => {
    render(<UserGallery />);
    const prevCard = screen.getByAltText("The Turgemans").closest("div");
    const nextCard = screen.getByAltText("Dan").closest("div");
    expect(prevCard).toHaveClass("opacity-50");
    expect(nextCard).toHaveClass("opacity-50");
    const currentCard = screen.getByAltText("Tal").closest("div");
    expect(currentCard).not.toHaveClass("opacity-50");
  });

  it("advances to the next user when the right arrow is clicked", () => {
    render(<UserGallery />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    expect(
      screen.getByRole("heading", { level: 3, name: /Dan Visited/i })
    ).toBeInTheDocument();
  });

  it("wraps to the last user when clicking previous on the first slide", () => {
    render(<UserGallery />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(
      screen.getByRole("heading", { level: 3, name: /The Turgemans Visited/i })
    ).toBeInTheDocument();
  });

  it("updates the dot indicators to reflect the current index", () => {
    const { container } = render(<UserGallery />);
    const dotContainer = container.querySelector(".flex.space-x-2"); // שיניתי פה
    const dots = dotContainer.querySelectorAll("span");
    expect(dots).toHaveLength(4);
    expect(dots[0]).toHaveClass("bg-black");
    for (let i = 1; i < dots.length; i++) {
      expect(dots[i]).toHaveClass("bg-gray-300");
    }
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    const updatedDots = dotContainer.querySelectorAll("span");
    expect(updatedDots[0]).toHaveClass("bg-gray-300");
    expect(updatedDots[1]).toHaveClass("bg-black");
  });
});
