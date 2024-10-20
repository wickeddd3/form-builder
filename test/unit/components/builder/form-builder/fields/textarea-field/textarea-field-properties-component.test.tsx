import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import TextareaFieldPropertiesComponent from "@/components/builder/form-builder/fields/textarea-field/TextareaFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/textarea-field/attributes";
import useDesigner from "@/hooks/use-designer";

// Mocking useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("TextareaFieldPropertiesComponent", () => {
  const mockUpdateElement = jest.fn();

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

  beforeEach(() => {
    // Mock useDesigner implementation
    (useDesigner as jest.Mock).mockReturnValue({
      updateElement: mockUpdateElement,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it("calls updateElement on form blur", () => {
    const { updateElement } = useDesigner();

    render(
      <TextareaFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const labelInput = screen.getByLabelText(/Label/i);

    act(() => {
      fireEvent.change(labelInput, { target: { value: "New Label" } });
      fireEvent.blur(labelInput);
    });

    waitFor(() =>
      expect(updateElement).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          extraAttributes: expect.objectContaining({
            label: "New Label",
          }),
        })
      )
    );
  });

  it("should blur input field on Enter key press", () => {
    const { getByLabelText } = render(
      <TextareaFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const input = getByLabelText("Label");
    input.focus();

    act(() => fireEvent.keyDown(input, { key: "Enter" }));

    waitFor(() => expect(document.activeElement).not.toBe(input));
  });

  it("updates the rows slider value correctly", () => {
    render(
      <TextareaFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    // Find the slider component using its ARIA role and label
    const slider = screen.getByRole("slider", { name: /rows/i });

    // Simulate moving the slider to increase the value
    act(() => {
      fireEvent.keyDown(slider, { key: "ArrowRight", code: "ArrowRight" }); // Simulate increasing the value by 1
    });

    // Verify that updateElement is called with the new rows value (rows + 1)
    waitFor(() => {
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
      fireEvent.keyDown(slider, { key: "ArrowLeft", code: "ArrowLeft" }); // Simulate decreasing the value by 1
    });

    // Verify that updateElement is called with the updated rows value (rows - 1)
    waitFor(() => {
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
