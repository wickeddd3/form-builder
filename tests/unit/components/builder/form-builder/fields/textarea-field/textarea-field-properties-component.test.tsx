import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextareaFieldPropertiesComponent from "@/components/builder/form-builder/fields/textarea-field/TextareaFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/textarea-field/attributes";

// Mocking useDesigner hook
const mockUpdateElement = jest.fn(); // Define the mock function
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    updateElement: mockUpdateElement,
  })),
}));

describe("TextareaFieldPropertiesComponent", () => {
  const mockElementInstance: FormElementInstance = {
    id: "1",
    extraAttributes: {
      label: "Test Label",
      helperText: "Test Helper Text",
      required: false,
      placeholder: "Test Placeholder",
      rows: 3,
    },
  } as CustomInstance;

  it("renders the form fields correctly", () => {
    const { getByLabelText } = render(
      <TextareaFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    // Check if all form fields are rendered
    expect(getByLabelText("Label")).toBeInTheDocument();
    expect(getByLabelText("PlaceHolder")).toBeInTheDocument();
    expect(getByLabelText("Helper text")).toBeInTheDocument();
    expect(getByLabelText("Rows 3")).toBeInTheDocument(); // Default slider value
    expect(getByLabelText("Required")).toBeInTheDocument();
  });

  it("renders with default values", () => {
    const { getByLabelText } = render(
      <TextareaFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    expect(getByLabelText("Label")).toHaveValue("Test Label");
    expect(getByLabelText("PlaceHolder")).toHaveValue("Test Placeholder");
    expect(getByLabelText("Helper text")).toHaveValue("Test Helper Text");
    expect(getByLabelText("Rows 3")).toBeInTheDocument();
    expect(getByLabelText("Required")).not.toBeChecked();
  });

  it("calls updateElement on form blur", async () => {
    const { getByLabelText } = render(
      <TextareaFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    act(() => {
      fireEvent.change(getByLabelText("Label"), {
        target: { value: "New Label" },
      });
    });

    act(() => {
      fireEvent.blur(getByLabelText("Label"));
    });

    await waitFor(() => {
      expect(mockUpdateElement).toHaveBeenCalled();
      expect(mockUpdateElement).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          extraAttributes: expect.objectContaining({
            label: "New Label",
          }),
        })
      );
    });
  });

  it("should blur input field on Enter key press", async () => {
    const { getByLabelText } = render(
      <TextareaFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const input = getByLabelText("Label");
    input.focus();

    act(() => fireEvent.keyDown(input, { key: "Enter" }));

    await waitFor(() => expect(document.activeElement).not.toBe(input));
  });

  it("updates the rows slider value correctly", async () => {
    const { getByRole, getByLabelText } = render(
      <TextareaFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    // Find the slider component using its ARIA role and label
    const slider = getByRole("slider", { name: /rows/i });
    slider.focus();

    // Simulate moving the slider to increase the value
    act(() => {
      fireEvent.keyDown(slider, {
        key: "ArrowRight",
        code: "ArrowRight",
      }); // Simulate increasing the value by 1
    });

    act(() => {
      fireEvent.blur(getByLabelText("Label"));
    });

    // Verify that updateElement is called with the new rows value (rows + 1)
    await waitFor(() => {
      expect(mockUpdateElement).toHaveBeenCalled();
      expect(mockUpdateElement).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          extraAttributes: expect.objectContaining({
            rows: 4, // Assuming the initial value was 3 and it increased by 1
          }),
        })
      );
    });

    // Simulate moving the slider to decrease the value
    act(() => {
      slider.focus();
      fireEvent.keyDown(slider, { key: "ArrowLeft", code: "ArrowLeft" }); // Simulate decreasing the value by 1
    });

    act(() => {
      fireEvent.blur(getByLabelText("Label"));
    });

    // Verify that updateElement is called with the updated rows value (rows - 1)
    await waitFor(() => {
      expect(mockUpdateElement).toHaveBeenCalled();
      expect(mockUpdateElement).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          extraAttributes: expect.objectContaining({
            rows: 3, // Should go back to the original value
          }),
        })
      );
    });
  });
});
