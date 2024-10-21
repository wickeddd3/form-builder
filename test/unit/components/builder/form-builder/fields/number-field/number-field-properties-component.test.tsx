import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NumberFieldPropertiesComponent from "@/components/builder/form-builder/fields/number-field/NumberFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/number-field/attributes";
import useDesigner from "@/hooks/use-designer";

// Mock the useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    updateElement: jest.fn(),
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

  it("updates the element when form fields are changed", () => {
    const { updateElement } = useDesigner();

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
      fireEvent.blur(getByLabelText("Helper text"));
    });

    waitFor(() =>
      expect(updateElement).toHaveBeenCalledWith(
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

  it("toggles the required switch", () => {
    const { updateElement } = useDesigner();

    const { getByLabelText } = render(
      <NumberFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    act(() => fireEvent.click(getByLabelText("Required")));

    waitFor(() => {
      expect(updateElement).toHaveBeenCalledWith(
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
