import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import TextFieldFormComponent from "@/components/builder/form-builder/fields/text-field/TextFieldFormComponent";
import {
  FormElementInstance,
  SubmitFunction,
} from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/text-field/attributes";

const mockElementInstance: FormElementInstance = {
  id: "test-id",
  type: "TextField",
  extraAttributes: {
    label: "Test Label",
    required: false,
    placeholder: "Enter text",
    helperText: "Helper text",
  },
} as CustomInstance;

const mockSubmitFunction: SubmitFunction = jest.fn();

describe("TextFieldFormComponent", () => {
  it("should renders the label and input field", () => {
    const { getByText, getByPlaceholderText } = render(
      <TextFieldFormComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Test Label")).toBeInTheDocument();
    expect(getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("should set default value correctly on initial render", () => {
    const { getByDisplayValue } = render(
      <TextFieldFormComponent
        elementInstance={mockElementInstance}
        defaultValue="Initial value"
      />
    );

    expect(getByDisplayValue("Initial value")).toBeInTheDocument();
  });

  it("should displays helper text when provided", () => {
    const { getByText } = render(
      <TextFieldFormComponent elementInstance={mockElementInstance} />
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
      <TextFieldFormComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("updates value on change", () => {
    const { getByPlaceholderText } = render(
      <TextFieldFormComponent elementInstance={mockElementInstance} />
    );

    const input = getByPlaceholderText("Enter text");

    fireEvent.change(input, { target: { value: "New value" } });

    expect(input).toHaveValue("New value");
  });

  it("calls submitValue on blur with valid input", () => {
    const { getByPlaceholderText } = render(
      <TextFieldFormComponent
        elementInstance={mockElementInstance}
        submitValue={mockSubmitFunction}
      />
    );

    const input = getByPlaceholderText("Enter text");

    fireEvent.change(input, { target: { value: "Valid input" } });
    fireEvent.blur(input);

    expect(mockSubmitFunction).toHaveBeenCalledWith("test-id", "Valid input");
  });

  it("should trigger error state for invalid input", () => {
    const mockValidate = jest.fn().mockReturnValue(false);
    jest.mock(
      "@/components/builder/form-builder/fields/text-field/utils",
      () => ({ validate: mockValidate })
    );

    const { getByPlaceholderText, container } = render(
      <TextFieldFormComponent elementInstance={mockElementInstance} />
    );

    const input = getByPlaceholderText("Enter text");

    act(() => {
      fireEvent.change(input, { target: { value: "invalid" } });
      fireEvent.blur(input);
    });

    waitFor(() =>
      expect(container.querySelector(".text-red-500")).toBeInTheDocument()
    );

    jest.unmock("@/components/builder/form-builder/fields/text-field/utils");
  });
});
