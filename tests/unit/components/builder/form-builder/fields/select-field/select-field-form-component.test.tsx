import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import SelectFieldFormComponent from "@/components/builder/form-builder/fields/select-field/SelectFieldFormComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/select-field/attributes";

const mockElementInstance: FormElementInstance = {
  id: "test-id",
  type: "SelectField",
  extraAttributes: {
    label: "Test Label",
    required: false,
    placeholder: "Select an option",
    helperText: "Helper text",
    options: ["Option 1", "Option 2", "Option 3"],
  },
} as CustomInstance;

describe("SelectFieldFormComponent", () => {
  it("should renders the label and input field", () => {
    const { getByText } = render(
      <SelectFieldFormComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Test Label")).toBeInTheDocument();
    expect(getByText("Select an option")).toBeInTheDocument();
  });

  it("should render select component with default value", () => {
    const { getByText } = render(
      <SelectFieldFormComponent
        elementInstance={mockElementInstance}
        defaultValue="Option 2"
      />
    );
    expect(getByText("Option 2")).toBeInTheDocument();
  });

  it("should displays helper text when provided", () => {
    const { getByText } = render(
      <SelectFieldFormComponent elementInstance={mockElementInstance} />
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
      <SelectFieldFormComponent elementInstance={elementInstance} />
    );

    expect(getByText("Test Label*")).toBeInTheDocument();
  });

  it("should change select value and call submitValue function", () => {
    const mockSubmitValue = jest.fn();

    const { getByRole, getByText } = render(
      <SelectFieldFormComponent
        elementInstance={mockElementInstance}
        submitValue={mockSubmitValue}
      />
    );

    const selectTrigger = getByRole("combobox");

    act(() => fireEvent.click(selectTrigger));

    waitFor(() => {
      const optionToSelect = getByText("Option 2");
      fireEvent.click(optionToSelect);
    });

    act(() => fireEvent.blur(selectTrigger));

    waitFor(() => {
      expect(mockSubmitValue).toHaveBeenCalledWith("test-id", "Option 2");
      expect(getByText("Option")).toBeInTheDocument();
    });
  });
});
