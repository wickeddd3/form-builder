import React from "react";
import { render } from "@testing-library/react";
import DateFieldFormComponent from "@/components/builder/form-builder/fields/date-field/DateFieldFormComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/date-field/attributes";

const mockElementInstance: FormElementInstance = {
  id: "test-id",
  type: "DateField",
  extraAttributes: {
    label: "Test Label",
    required: false,
    helperText: "Helper text",
  },
} as CustomInstance;

describe("DateFieldFormComponent", () => {
  it("should renders the label and date field", () => {
    const { getByText } = render(
      <DateFieldFormComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Test Label")).toBeInTheDocument();
    expect(getByText("Pick a date")).toBeInTheDocument();
  });

  it("should displays helper text when provided", () => {
    const { getByText } = render(
      <DateFieldFormComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Helper text")).toBeInTheDocument();
  });

  it("should display label with required indicator if applicable", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {
        ...mockElementInstance.extraAttributes,
        required: true,
      },
    };

    const { getByText } = render(
      <DateFieldFormComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });
});
