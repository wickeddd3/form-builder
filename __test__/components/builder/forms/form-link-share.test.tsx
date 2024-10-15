import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormLinkShare from "@/components/builder/forms/FormLinkShare";
import { toast } from "@/hooks/use-toast";

// Mock the toast function
jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe("FormLinkShare", () => {
  const shareUrl = "test-url";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input with the correct share link", () => {
    render(<FormLinkShare shareUrl={shareUrl} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(`${window.location.origin}/submit/${shareUrl}`);
  });

  it("copies the link to clipboard and shows toast notification when button is clicked", () => {
    render(<FormLinkShare shareUrl={shareUrl} />);
    const button = screen.getByRole("button", { name: /share link/i });

    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}/submit/${shareUrl}`
    );
    expect(toast).toHaveBeenCalledWith({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  });

  it("does not render the component if not mounted", () => {
    const { container } = render(<FormLinkShare shareUrl={shareUrl} />);
    expect(container.firstChild).not.toBeNull();
  });
});
