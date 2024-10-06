import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatsCard from "@/components/builder/stats/StatsCard";

describe("StatsCard Component", () => {
  const defaultProps = {
    title: "Test Title",
    value: "123",
    icon: <span data-testid="icon">Icon</span>,
    helperText: "This is a helper text",
    loading: false,
    className: "custom-class",
  };

  it("renders the title, value, icon, and helper text correctly", () => {
    render(<StatsCard {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("This is a helper text")).toBeInTheDocument();
  });

  it("applies the custom class name", () => {
    const { container } = render(<StatsCard {...defaultProps} />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("displays a skeleton when loading is true", () => {
    render(<StatsCard {...defaultProps} loading={true} />);
    expect(screen.getByText("0")).toHaveClass("opacity-0");
    expect(screen.getByText("0").closest("div")).toHaveClass("skeleton");
  });

  it("does not display the value when loading is true", () => {
    render(<StatsCard {...defaultProps} loading={true} />);
    expect(screen.queryByText("123")).not.toBeInTheDocument();
  });
});
