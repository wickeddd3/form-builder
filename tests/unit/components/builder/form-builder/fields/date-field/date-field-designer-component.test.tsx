import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateFieldDesignerComponent from "@/components/builder/form-builder/fields/date-field/DateFieldDesignerComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/date-field/attributes";

const mockElementInstance: FormElementInstance = {
  extraAttributes: {
    label: "Test Label",
    required: false,
    helperText: "This is a helper text",
  },
} as CustomInstance;

describe("DateFieldDesignerComponent", () => {
  it("renders a label with the correct text", () => {
    const { getByText } = render(
      <DateFieldDesignerComponent elementInstance={mockElementInstance} />
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
      <DateFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("displays helper text if helperText is provided", () => {
    const { getByText } = render(
      <DateFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("This is a helper text")).toBeInTheDocument();
  });

  it("should handle missing label gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {},
    };

    const { queryByText } = render(
      <DateFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("*")).not.toBeInTheDocument();
  });

  it("should handle missing helperText gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {},
    };

    const { queryByText } = render(
      <DateFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("This is a helper text")).not.toBeInTheDocument();
  });
});
