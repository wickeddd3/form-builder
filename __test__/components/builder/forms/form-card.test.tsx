import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormCard from "@/components/builder/forms/FormCard";
import { Form } from "@prisma/client";

describe("FormCard Component", () => {
  const mockForm: Form = {
    userId: "101",
    id: "1",
    name: "Test Form",
    description: "This is a test form",
    published: true,
    createdAt: new Date(),
    visits: 1234,
    submissions: 5678,
    content: "[]",
    shareURL: "",
  };

  it("should render the form name", () => {
    render(<FormCard form={mockForm} />);
    expect(screen.getByText("Test Form")).toBeInTheDocument();
  });

  it('should display "Published" badge if the form is published', () => {
    render(<FormCard form={mockForm} />);
    expect(screen.getByText("Published")).toBeInTheDocument();
  });

  it('should display "Draft" badge if the form is not published', () => {
    render(<FormCard form={{ ...mockForm, published: false }} />);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("should display the correct number of visits and submissions when published", () => {
    render(<FormCard form={mockForm} />);
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("5,678")).toBeInTheDocument();
  });

  it('should display "No description" if description is not provided', () => {
    render(<FormCard form={{ ...mockForm, description: "" }} />);
    expect(screen.getByText("No description")).toBeInTheDocument();
  });

  it("should render a link to view submissions if the form is published", () => {
    render(<FormCard form={mockForm} />);
    expect(
      screen.getByRole("link", { name: /View submissions/i })
    ).toHaveAttribute("href", "/builder/1/details");
  });

  it("should render a link to edit the form if the form is not published", () => {
    render(<FormCard form={{ ...mockForm, published: false }} />);
    expect(screen.getByRole("link", { name: /Edit form/ })).toHaveAttribute(
      "href",
      "/builder/1"
    );
  });

  it("should show formatted creation date with suffix", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);
    render(<FormCard form={{ ...mockForm, createdAt: pastDate }} />);
    expect(screen.getByText(/5 days ago/)).toBeInTheDocument();
  });

  it("should correctly format creation date when it is the current date", () => {
    const currentDate = new Date();
    render(<FormCard form={{ ...mockForm, createdAt: currentDate }} />);
    expect(screen.getByText(/less than a minute ago/)).toBeInTheDocument();
  });

  it("should handle zero visits and submissions gracefully", () => {
    render(<FormCard form={{ ...mockForm, visits: 0, submissions: 0 }} />);
    expect(screen.getAllByText("0")).toHaveLength(2);
  });

  it("should handle large numbers for visits and submissions using locale formatting", () => {
    render(
      <FormCard form={{ ...mockForm, visits: 1000000, submissions: 2000000 }} />
    );
    expect(screen.getByText("1,000,000")).toBeInTheDocument();
    expect(screen.getByText("2,000,000")).toBeInTheDocument();
  });
});
