import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/partials/Navbar";

// Mock the components used in Navbar
jest.mock("@/components/partials/Logo", () => {
  const Logo = () => <div data-testid="logo">Logo</div>;
  Logo.displayName = "Logo";
  return Logo;
});

jest.mock("@/components/partials/ThemeSwitcher", () => {
  const ThemeSwitcher = () => (
    <div data-testid="theme-switcher">ThemeSwitcher</div>
  );
  ThemeSwitcher.displayName = "ThemeSwitcher";
  return ThemeSwitcher;
});

let isSignedIn = true; // Variable to control signed-in state

jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }: { children: ReactNode }) => (
    <>{isSignedIn ? children : null}</>
  ),
  UserButton: () => <div data-testid="user-button">UserButton</div>,
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders Navbar with Logo, ThemeSwitcher, and UserButton when signed in", () => {
    isSignedIn = true; // Set signed-in state to true
    render(<Navbar />);

    // Check if the Navbar is rendered
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();

    // Check if the Logo is rendered
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();

    // Check if the ThemeSwitcher is rendered
    const themeSwitcher = screen.getByTestId("theme-switcher");
    expect(themeSwitcher).toBeInTheDocument();

    // Check if the UserButton is rendered when signed in
    const userButton = screen.getByTestId("user-button");
    expect(userButton).toBeInTheDocument();
  });

  it("hides the UserButton when the user is not authenticated", () => {
    isSignedIn = false; // Set signed-in state to false
    render(<Navbar />);

    // Check if the Navbar is rendered
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();

    // Check if the Logo is rendered
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();

    // Check if the ThemeSwitcher is rendered
    const themeSwitcher = screen.getByTestId("theme-switcher");
    expect(themeSwitcher).toBeInTheDocument();

    // The UserButton should not be shown when not authenticated
    const userButton = screen.queryByTestId("user-button");
    expect(userButton).not.toBeInTheDocument();
  });
});
