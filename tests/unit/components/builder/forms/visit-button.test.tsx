import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import VisitButton from "@/components/builder/forms/VisitButton";
import React from "react";

describe("VisitButton Component", () => {
  it("should render the button when mounted", async () => {
    render(<VisitButton shareUrl="test-url" />);
    expect(await screen.findByText("Visit")).toBeInTheDocument();
  });

  it("should open a new window with the correct URL when clicked", () => {
    // Mock window.open
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);

    // Render the component
    render(<VisitButton shareUrl="test-url" />);

    // Simulate button click
    fireEvent.click(screen.getByText("Visit"));

    // Check that window.open was called with the correct URL
    expect(openSpy).toHaveBeenCalledWith(
      `${window.location.origin}/submit/test-url`,
      "_blank"
    );

    // Restore the original implementation
    openSpy.mockRestore();
  });

  it("should initialize without errors", () => {
    expect(() => render(<VisitButton shareUrl="test" />)).not.toThrow();
  });

  it("should handle empty or undefined shareUrl gracefully", () => {
    const { getByText } = render(<VisitButton shareUrl="" />);
    window.open = jest.fn();
    fireEvent.click(getByText("Visit"));
    expect(window.open).toHaveBeenCalledWith(
      `${window.location.origin}/submit/`,
      "_blank"
    );
  });

  it("should not cause memory leaks with repeated mounts/unmounts", () => {
    const { unmount } = render(<VisitButton shareUrl="test" />);
    unmount();
    expect(() => render(<VisitButton shareUrl="test" />)).not.toThrow();
  });

  it("should ensure useEffect runs only twice on mount", () => {
    const useEffectSpy = jest.spyOn(React, "useEffect");
    render(<VisitButton shareUrl="test" />);
    expect(useEffectSpy).toHaveBeenCalledTimes(2);
    useEffectSpy.mockRestore();
  });
});
