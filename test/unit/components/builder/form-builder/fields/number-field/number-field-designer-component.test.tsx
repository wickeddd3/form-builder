import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NumberFieldDesignerComponent from "@/components/builder/form-builder/fields/number-field/NumberFieldDesignerComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/number-field/attributes";

const mockElementInstance: FormElementInstance = {
  extraAttributes: {
    label: "Test Label",
    required: false,
    placeholder: "0",
    helperText: "This is a helper text",
  },
} as CustomInstance;

describe("NumberFieldDesignerComponent", () => {
  it("renders a label with the correct text", () => {
    const { getByText } = render(
      <NumberFieldDesignerComponent elementInstance={mockElementInstance} />
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
      <NumberFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("renders an input field with the correct placeholder", () => {
    const { getByPlaceholderText } = render(
      <NumberFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByPlaceholderText("0")).toBeInTheDocument();
  });

  it("displays helper text if helperText is provided", () => {
    const { getByText } = render(
      <NumberFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("This is a helper text")).toBeInTheDocument();
  });

  it("ensures the input field is read-only and disabled", () => {
    const { getByPlaceholderText } = render(
      <NumberFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    const inputElement = getByPlaceholderText("0");

    expect(inputElement).toHaveAttribute("readOnly");
    expect(inputElement).toHaveAttribute("disabled");
  });

  it("should handle missing label gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {},
    };

    const { queryByText } = render(
      <NumberFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("*")).not.toBeInTheDocument();
  });

  it("should handle missing helperText gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {},
    };

    const { queryByText } = render(
      <NumberFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("This is a helper text")).not.toBeInTheDocument();
  });
});
