import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NumberFieldPropertiesComponent from "@/components/builder/form-builder/fields/number-field/NumberFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/number-field/attributes";

// Mock the useDesigner hook
const mockUpdateElement = jest.fn(); // Define the mock function
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    updateElement: mockUpdateElement,
  })),
}));

describe("NumberFieldPropertiesComponent", () => {
  const mockElementInstance: FormElementInstance = {
    id: "1",
    type: "NumberField",
    extraAttributes: {
      label: "Test Label",
      helperText: "Test Helper Text",
      required: false,
      placeholder: "0",
    },
  } as CustomInstance;

  it("renders the component with initial values", () => {
    const { getByLabelText } = render(
      <NumberFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    expect(getByLabelText("Label")).toHaveValue("Test Label");
    expect(getByLabelText("PlaceHolder")).toHaveValue("0");
    expect(getByLabelText("Helper text")).toHaveValue("Test Helper Text");
    expect(getByLabelText("Required")).not.toBeChecked();
  });

  it("updates the element when form fields are changed", async () => {
    const { getByLabelText } = render(
      <NumberFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    act(() => {
      fireEvent.change(getByLabelText("Label"), {
        target: { value: "New Label" },
      });
      fireEvent.change(getByLabelText("Helper text"), {
        target: { value: "New Helper Text" },
      });
    });

    act(() => {
      fireEvent.blur(getByLabelText("Label"));
    });

    await waitFor(() =>
      expect(mockUpdateElement).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          extraAttributes: expect.objectContaining({
            label: "New Label",
            helperText: "New Helper Text",
          }),
        })
      )
    );
  });

  it("toggles the required switch", async () => {
    const { getByLabelText } = render(
      <NumberFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    act(() => {
      fireEvent.click(getByLabelText("Required"));
      fireEvent.blur(getByLabelText("Label"));
    });

    await waitFor(() => {
      expect(mockUpdateElement).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          extraAttributes: expect.objectContaining({
            required: true,
          }),
        })
      );
      expect(getByLabelText("Required")).toBeChecked();
    });
  });
});
