import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import CheckboxFieldFormComponent from "@/components/builder/form-builder/fields/checkbox-field/CheckboxFieldFormComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/checkbox-field/attributes";

const mockElementInstance: FormElementInstance = {
  id: "test-id",
  type: "CheckboxField",
  extraAttributes: {
    label: "Test Label",
    required: false,
    helperText: "Helper text",
  },
} as CustomInstance;

describe("CheckboxFieldFormComponent", () => {
  it("should renders the label and input field", () => {
    const { getByText } = render(
      <CheckboxFieldFormComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Test Label")).toBeInTheDocument();
  });

  it("should show checkbox unchecked by default", () => {
    const { getByLabelText } = render(
      <CheckboxFieldFormComponent
        elementInstance={mockElementInstance}
        defaultValue="false"
      />
    );

    const checkbox = getByLabelText("Test Label");

    expect(checkbox).not.toBeChecked();
  });

  it("should displays helper text when provided", () => {
    const { getByText } = render(
      <CheckboxFieldFormComponent elementInstance={mockElementInstance} />
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
      <CheckboxFieldFormComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("should toggle state correctly when clicked", () => {
    const { getByRole } = render(
      <CheckboxFieldFormComponent elementInstance={mockElementInstance} />
    );

    const checkbox = getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    act(() => fireEvent.click(checkbox));

    expect(checkbox).toBeChecked();

    act(() => fireEvent.click(checkbox));

    expect(checkbox).not.toBeChecked();
  });

  it("should call submitValue with correct parameters when checkbox state changes", () => {
    const mockSubmitValue = jest.fn();

    const { getByRole } = render(
      <CheckboxFieldFormComponent
        elementInstance={mockElementInstance}
        submitValue={mockSubmitValue}
      />
    );

    const checkbox = getByRole("checkbox");

    act(() => fireEvent.click(checkbox));

    expect(mockSubmitValue).toHaveBeenCalledWith("test-id", "true");
  });
});
