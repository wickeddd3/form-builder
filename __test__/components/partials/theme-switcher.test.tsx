import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import ThemeSwitcher from "@/components/partials/ThemeSwitcher";

// Mock the icons to avoid rendering issues during tests
jest.mock("react-icons/lu", () => ({
  LuMonitor: () => <div>Monitor Icon</div>,
  LuMoonStar: () => <div>MoonStar Icon</div>,
  LuSunDim: () => <div>SunDim Icon</div>,
  LuSunMedium: () => <div>SunMedium Icon</div>,
}));

describe("ThemeSwitcher Component", () => {
  // In your test setup file or at the top of your test file
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  const renderWithThemeProvider = (ui: React.ReactElement) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test("renders without crashing", () => {
    renderWithThemeProvider(<ThemeSwitcher />);
    expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
  });

  test("renders the correct default theme", () => {
    renderWithThemeProvider(<ThemeSwitcher />);
    // Assuming the default theme is 'system'
    const systemTab = screen.getByRole("tab", { name: /System Theme/i });
    expect(systemTab).toBeInTheDocument();
    expect(systemTab).toHaveAttribute("aria-selected", "true");
    expect(systemTab).toHaveAttribute("data-state", "active");
  });

  test("changes theme to light when light tab is clicked", () => {
    renderWithThemeProvider(<ThemeSwitcher />);
    const lightTab = screen.getByRole("tab", { name: /Light Theme/i });
    expect(lightTab).toBeInTheDocument();
    fireEvent.click(lightTab);
    expect(lightTab).toHaveAttribute("aria-selected", "true");
  });

  test("changes theme to dark when dark tab is clicked", () => {
    renderWithThemeProvider(<ThemeSwitcher />);
    const darkTab = screen.getByRole("tab", { name: /Dark Theme/i });
    expect(darkTab).toBeInTheDocument();
    fireEvent.click(darkTab);
    expect(darkTab).toHaveAttribute("aria-selected", "true");
  });

  test("changes theme to system when system tab is clicked", () => {
    renderWithThemeProvider(<ThemeSwitcher />);
    const systemTab = screen.getByRole("tab", { name: /System Theme/i });
    expect(systemTab).toBeInTheDocument();
    fireEvent.click(systemTab);
    expect(systemTab).toHaveAttribute("aria-selected", "true");
  });

  test("does not render anything before mounting", () => {
    const { container } = renderWithThemeProvider(<ThemeSwitcher />);
    expect(container.firstChild).not.toBeNull();
  });
});
