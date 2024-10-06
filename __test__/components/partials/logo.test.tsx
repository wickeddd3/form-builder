import { render, screen } from "@testing-library/react";
import Logo from "@/components/partials/Logo";

describe("Logo Component", () => {
  it("renders the Logo with correct text and link", () => {
    render(<Logo />);

    // Check if the logo is rendered with the correct text
    const logoElement = screen.getByTestId("logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveTextContent("FORM BUILDER");

    // Check if the logo has the correct href attribute
    expect(logoElement).toHaveAttribute("href", "/builder");

    // Check if the logo has the correct class names
    expect(logoElement).toHaveClass(
      "font-bold text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text hover:cursor-pointer"
    );
  });
});
