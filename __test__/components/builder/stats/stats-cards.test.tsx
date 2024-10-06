import { render } from "@testing-library/react";
import StatsCards from "@/components/builder/stats/StatsCards";

describe("StatsCards Component", () => {
  it("should render all StatsCard components when data is provided", () => {
    const data = {
      visits: 1000,
      submissions: 200,
      submissionRate: 20,
      bounceRate: 30,
    };
    const { getByText } = render(<StatsCards data={data} loading={false} />);
    expect(getByText("Total visits")).toBeInTheDocument();
    expect(getByText("Total submissions")).toBeInTheDocument();
    expect(getByText("Submission rate")).toBeInTheDocument();
    expect(getByText("Bounce rate")).toBeInTheDocument();
  });

  it("should display correct icons for each StatsCard", () => {
    const data = {
      visits: 1000,
      submissions: 200,
      submissionRate: 20,
      bounceRate: 30,
    };
    const { container } = render(<StatsCards data={data} loading={false} />);
    expect(container.querySelector(".text-blue-600")).toBeInTheDocument();
    expect(container.querySelector(".text-yellow-600")).toBeInTheDocument();
    expect(container.querySelector(".text-green-600")).toBeInTheDocument();
    expect(container.querySelector(".text-red-600")).toBeInTheDocument();
  });

  it("should format values using toLocaleString for readability", () => {
    const data = {
      visits: 1000,
      submissions: 200,
      submissionRate: 20,
      bounceRate: 30,
    };
    const { getByText } = render(<StatsCards data={data} loading={false} />);
    expect(getByText("1,000%")).toBeInTheDocument();
    expect(getByText("200%")).toBeInTheDocument();
    expect(getByText("20%")).toBeInTheDocument();
    expect(getByText("30%")).toBeInTheDocument();
  });

  it("should show loading state when data is being fetched", () => {
    const { getAllByText } = render(<StatsCards loading={true} />);
    const zeroElements = getAllByText("0");

    zeroElements.forEach((element) => {
      expect(element).toHaveClass("opacity-0");
      expect(element.closest("div")).toHaveClass("skeleton");
    });
  });

  it("should handle undefined or null data gracefully", () => {
    const { container } = render(<StatsCards data={null} loading={false} />);
    expect(container).toBeInTheDocument();
  });

  it("should ensure CSS classes are applied correctly for styling", () => {
    const data = {
      visits: 1000,
      submissions: 200,
      submissionRate: 20,
      bounceRate: 30,
    };
    const { container } = render(<StatsCards data={data} loading={false} />);
    expect(container.querySelector(".shadow-blue-600")).toBeInTheDocument();
    expect(container.querySelector(".shadow-yellow-600")).toBeInTheDocument();
    expect(container.querySelector(".shadow-green-600")).toBeInTheDocument();
    expect(container.querySelector(".shadow-red-600")).toBeInTheDocument();
  });

  it("should verify that helperText is displayed for each StatsCard", () => {
    const data = {
      visits: 1000,
      submissions: 200,
      submissionRate: 20,
      bounceRate: 30,
    };
    const { getByText } = render(<StatsCards data={data} loading={false} />);
    expect(getByText("All time form visits")).toBeInTheDocument();
    expect(getByText("All time form submissions")).toBeInTheDocument();
    expect(
      getByText("Visits that result in form submission")
    ).toBeInTheDocument();
    expect(
      getByText("Visits that leaves without interacting")
    ).toBeInTheDocument();
  });
});
