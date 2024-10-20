import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextareaFieldDesignerComponent from "@/components/builder/form-builder/fields/textarea-field/TextareaFieldDesignerComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

describe("TextareaFieldDesignerComponent", () => {
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "TextareaField",
    extraAttributes: {
      label: "Test Label",
      required: false,
      placeholder: "Enter text here",
      helperText: "This is a helper text",
    },
  };

  it("should render label with correct text", () => {
    const { getByText } = render(
      <TextareaFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Test Label")).toBeInTheDocument();
  });

  it("should display asterisk next to label when required is true", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {
        ...mockElementInstance.extraAttributes,
        required: true,
      },
    };

    const { getByText } = render(
      <TextareaFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("renders the placeholder in the textarea", () => {
    const { getByPlaceholderText } = render(
      <TextareaFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByPlaceholderText("Enter text here")).toBeInTheDocument();
  });

  it("renders the helper text if provided", () => {
    const { getByText } = render(
      <TextareaFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("This is a helper text")).toBeInTheDocument();
  });

  it("does not render the helper text if not provided", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {
        ...mockElementInstance.extraAttributes,
        helperText: "",
      },
    };

    const { queryByText } = render(
      <TextareaFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("This is a helper text")).not.toBeInTheDocument();
  });

  it("should ensure textarea is read-only and disabled", () => {
    const { getByRole } = render(
      <TextareaFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    const textarea = getByRole("textbox");

    expect(textarea).toHaveAttribute("readonly");
    expect(textarea).toBeDisabled();
  });

  it("should handle missing label gracefully", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {
        ...mockElementInstance.extraAttributes,
        label: "",
      },
    };

    const { queryByText } = render(
      <TextareaFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(queryByText("*")).not.toBeInTheDocument();
  });

  it("should handle missing placeholder without errors", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {
        ...mockElementInstance.extraAttributes,
        placeholder: "",
      },
    };

    const { getByRole } = render(
      <TextareaFieldDesignerComponent elementInstance={elementInstance} />
    );

    expect(getByRole("textbox")).toBeInTheDocument();
  });
});
