import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckboxFieldDesignerComponent from "@/components/builder/form-builder/fields/checkbox-field/CheckboxFieldDesignerComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/checkbox-field/attributes";

const mockElementInstance: FormElementInstance = {
  extraAttributes: {
    label: "Test Label",
    required: false,
    helperText: "This is a helper text",
  },
} as CustomInstance;

describe("CheckboxFieldDesignerComponent", () => {
  it("renders a label with the correct text", () => {
    const { getByText } = render(
      <CheckboxFieldDesignerComponent elementInstance={mockElementInstance} />
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
      <CheckboxFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("displays helper text if helperText is provided", () => {
    const { getByText } = render(
      <CheckboxFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("This is a helper text")).toBeInTheDocument();
  });

  it("should handle missing label gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {},
    };

    const { queryByText } = render(
      <CheckboxFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("*")).not.toBeInTheDocument();
  });

  it("should handle missing helperText gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {},
    };

    const { queryByText } = render(
      <CheckboxFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("This is a helper text")).not.toBeInTheDocument();
  });
});
