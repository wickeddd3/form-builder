import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormCards from "@/components/builder/forms/FormCards";
import { Form } from "@prisma/client";

const mockForms: Form[] = [
  {
    userId: "101",
    id: "1",
    name: "Form One",
    description: "This is a test form one",
    published: true,
    createdAt: new Date(),
    visits: 1234,
    submissions: 5678,
    content: "[]",
    shareURL: "",
  },
  {
    userId: "101",
    id: "2",
    name: "Form Two",
    description: "This is a test form two",
    published: false,
    createdAt: new Date(),
    visits: 18,
    submissions: 12,
    content: "[]",
    shareURL: "",
  },
];

jest.mock("@/components/builder/forms/FormCard", () => {
  return function MockFormCard({ form }: { form: Form }) {
    return <div data-testid="form-card">{form.name}</div>;
  };
});

describe("FormCards Component", () => {
  it("renders a list of FormCard components", () => {
    render(<FormCards forms={mockForms} />);

    const formCards = screen.getAllByTestId("form-card");
    expect(formCards).toHaveLength(mockForms.length);
  });

  it("should pass correct form data to each FormCard", () => {
    render(<FormCards forms={mockForms} />);
    mockForms.forEach((form) => {
      expect(screen.getByText(form.name)).toBeInTheDocument();
    });
  });

  it("should handle an empty forms array without errors", () => {
    const forms: Form[] = [];
    render(<FormCards forms={forms} />);
    expect(screen.queryByTestId("form-card")).toBeNull();
  });

  it("should render FormCard components in the order of the forms array", () => {
    render(<FormCards forms={mockForms} />);
    const formCards = screen.getAllByTestId("form-card");
    expect(formCards[0]).toHaveTextContent("Form One");
    expect(formCards[1]).toHaveTextContent("Form Two");
  });
});
