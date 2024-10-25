import React from "react";
import { render } from "@testing-library/react";
import SelectFieldDesignerComponent from "@/components/builder/form-builder/fields/select-field/SelectFieldDesignerComponent";
import { CustomInstance } from "@/components/builder/form-builder/fields/select-field/attributes";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

const mockElementInstance: FormElementInstance = {
  extraAttributes: {
    label: "Test Label",
    required: false,
    placeholder: "Select an option",
    helperText: "This is a helper text",
    options: [],
  },
} as CustomInstance;

describe("SelectFieldDesignerComponent", () => {
  it("renders a label with the correct text", () => {
    const { getByText } = render(
      <SelectFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Test Label")).toBeInTheDocument();
  });

  it("displays an asterisk next to the label if required is true", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {
        ...mockElementInstance.extraAttributes,
        required: true,
      },
    };

    const { getByText } = render(
      <SelectFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("renders an input field with the correct placeholder", () => {
    const { getByText } = render(
      <SelectFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Select an option")).toBeInTheDocument();
  });

  it("displays helper text if helperText is provided", () => {
    const { getByText } = render(
      <SelectFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("This is a helper text")).toBeInTheDocument();
  });

  it("ensures the input field is disabled", () => {
    const { getByRole } = render(
      <SelectFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    const inputElement = getByRole("combobox");

    expect(inputElement).toBeDisabled();
  });

  it("should handle missing label gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {},
    };

    const { queryByText } = render(
      <SelectFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("*")).not.toBeInTheDocument();
  });

  it("should handle missing helperText gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {},
    };

    const { queryByText } = render(
      <SelectFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("This is a helper text")).not.toBeInTheDocument();
  });
});
