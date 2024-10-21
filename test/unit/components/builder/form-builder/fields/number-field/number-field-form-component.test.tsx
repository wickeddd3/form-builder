import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import NumberFieldFormComponent from "@/components/builder/form-builder/fields/number-field/NumberFieldFormComponent";
import {
  FormElementInstance,
  SubmitFunction,
} from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/number-field/attributes";

const mockElementInstance: FormElementInstance = {
  id: "test-id",
  type: "NumberField",
  extraAttributes: {
    label: "Test Label",
    required: false,
    placeholder: "0",
    helperText: "Helper text",
  },
} as CustomInstance;

const mockSubmitFunction: SubmitFunction = jest.fn();

describe("NumberFieldFormComponent", () => {
  it("should renders the label and input field", () => {
    const { getByText, getByPlaceholderText } = render(
      <NumberFieldFormComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Test Label")).toBeInTheDocument();
    expect(getByPlaceholderText("0")).toBeInTheDocument();
  });

  it("should set default value correctly on initial render", () => {
    const { getByDisplayValue } = render(
      <NumberFieldFormComponent
        elementInstance={mockElementInstance}
        defaultValue="2"
      />
    );

    expect(getByDisplayValue("2")).toBeInTheDocument();
  });

  it("should displays helper text when provided", () => {
    const { getByText } = render(
      <NumberFieldFormComponent elementInstance={mockElementInstance} />
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
      <NumberFieldFormComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("updates value on change", () => {
    const { getByPlaceholderText } = render(
      <NumberFieldFormComponent elementInstance={mockElementInstance} />
    );

    const input = getByPlaceholderText("0");

    fireEvent.change(input, { target: { value: 5 } });

    expect(input).toHaveValue(5);
  });

  it("calls submitValue on blur with valid input", () => {
    const { getByPlaceholderText } = render(
      <NumberFieldFormComponent
        elementInstance={mockElementInstance}
        submitValue={mockSubmitFunction}
      />
    );

    const input = getByPlaceholderText("0");

    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.blur(input);

    expect(mockSubmitFunction).toHaveBeenCalledWith("test-id", "3");
  });

  it("should trigger error state for invalid input", () => {
    const mockValidate = jest.fn().mockReturnValue(false);
    jest.mock(
      "@/components/builder/form-builder/fields/text-field/utils",
      () => ({ validate: mockValidate })
    );

    const { getByPlaceholderText, container } = render(
      <NumberFieldFormComponent elementInstance={mockElementInstance} />
    );

    const input = getByPlaceholderText("0");

    act(() => {
      fireEvent.change(input, { target: { value: 2 } });
      fireEvent.blur(input);
    });

    waitFor(() =>
      expect(container.querySelector(".text-red-500")).toBeInTheDocument()
    );

    jest.unmock("@/components/builder/form-builder/fields/text-field/utils");
  });
});
