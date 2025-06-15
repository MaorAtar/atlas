// __tests__/Hero.test.jsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Hero from "../src/components/custom/Hero";

// Mock Clerk's useUser
jest.mock("@clerk/clerk-react", () => ({
  __esModule: true,
  useUser: jest.fn(),
}));
const { useUser } = require("@clerk/clerk-react");

describe("Hero component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the background container with correct inline styles", () => {
    useUser.mockReturnValue({ user: null });
    const { container } = render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const root = container.firstChild;
    expect(root).toHaveStyle(
      `background-image: url('/homepage-pictures/homepage-bg.jpg')`
    );
    expect(root).toHaveStyle("height: 75vh");
    expect(root).toHaveClass(
      "relative",
      "bg-cover",
      "bg-center",
      "flex",
      "flex-col",
      "items-center",
      "justify-center"
    );
  });

  it("always renders the main heading and paragraph", () => {
    useUser.mockReturnValue({ user: null });
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", {
        name: /simplify travel planning/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /your personalized trip planner that creates amazing itineraries, all based on your preferences, time, and budget\./i
      )
    ).toBeInTheDocument();
  });

  it("renders the Start Planning link and button", () => {
    useUser.mockReturnValue({ user: null });
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /start planning/i });
    expect(link).toHaveAttribute("href", "/create-trip");
    const button = screen.getByRole("button", { name: /start planning/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "mt-6",
      "md:mt-8",
      "bg-teal-500",
      "hover:bg-teal-700",
      "transition-all",
      "duration-300"
    );
  });

  it("does not show the admin toast when user is null or non-admin", () => {
    // No user
    useUser.mockReturnValue({ user: null });
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.queryByText(/welcome, admin/i)).not.toBeInTheDocument();

    // Non-admin user
    sessionStorage.clear();
    useUser.mockReturnValue({ user: { publicMetadata: { role: "user" } } });
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(screen.queryByText(/welcome, admin/i)).not.toBeInTheDocument();
  });

  it("shows and auto-hides the admin toast when user is admin", () => {
    useUser.mockReturnValue({ user: { publicMetadata: { role: "admin" } } });

    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );

    // Toast is shown immediately
    const toast = screen.getByText(/welcome, admin! 😃/i);
    expect(toast).toBeInTheDocument();

    // sessionStorage flag is set
    expect(sessionStorage.getItem("adminToastShown")).toBe("true");

    // Advance timers to auto-dismiss
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.queryByText(/welcome, admin! 😃/i)).not.toBeInTheDocument();
  });
});
