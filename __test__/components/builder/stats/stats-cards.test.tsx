import React from "react";
import { render, screen } from "@testing-library/react";
import StatsCards from "@/components/builder/stats/StatsCards";

describe("StatsCards Component", () => {
  const mockData = {
    visits: 1000,
    submissions: 200,
    submissionRate: 20,
    bounceRate: 30,
  };

  it("renders all StatsCard components with correct data", () => {
    render(<StatsCards data={mockData} loading={false} />);

    // Check for Total visits
    expect(screen.getByText("Total visits")).toBeInTheDocument();
    expect(screen.getByText("1,000%")).toBeInTheDocument();
    expect(screen.getByText("All time form visits")).toBeInTheDocument();

    // Check for Total submissions
    expect(screen.getByText("Total submissions")).toBeInTheDocument();
    expect(screen.getByText("200%")).toBeInTheDocument();
    expect(screen.getByText("All time form submissions")).toBeInTheDocument();

    // Check for Submission rate
    expect(screen.getByText("Submission rate")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
    expect(
      screen.getByText("Visits that result in form submission")
    ).toBeInTheDocument();

    // Check for Bounce rate
    expect(screen.getByText("Bounce rate")).toBeInTheDocument();
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(
      screen.getByText("Visits that leaves without interacting")
    ).toBeInTheDocument();
  });
});
