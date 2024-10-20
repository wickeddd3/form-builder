import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import SelectFieldPropertiesComponent from "@/components/builder/form-builder/fields/select-field/SelectFieldPropertiesComponent";
import { CustomInstance } from "@/components/builder/form-builder/fields/select-field/attributes";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import useDesigner from "@/hooks/use-designer";

// Mocking useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("SelectFieldPropertiesComponent", () => {
  const mockUpdateElement = jest.fn();
  const mockSetSelectedElement = jest.fn();

  const mockElementInstance: FormElementInstance = {
    id: "1",
    extraAttributes: {
      label: "Test Label",
      helperText: "Test Helper Text",
      required: false,
      placeholder: "Test Placeholder",
      options: ["Option 1", "Option 2"],
    },
  } as CustomInstance;

  beforeEach(() => {
    // Mock useDesigner implementation
    (useDesigner as jest.Mock).mockReturnValue({
      updateElement: mockUpdateElement,
      setSelectedElement: mockSetSelectedElement,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields correctly", () => {
    const { getByLabelText } = render(
      <SelectFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    // Check if all form fields are rendered
    expect(getByLabelText("Label")).toBeInTheDocument();
    expect(getByLabelText("PlaceHolder")).toBeInTheDocument();
    expect(getByLabelText("Helper text")).toBeInTheDocument();
    expect(getByLabelText("Required")).toBeInTheDocument();
  });

  it("renders with default values", () => {
    const { getByLabelText } = render(
      <SelectFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    expect(getByLabelText("Label")).toHaveValue("Test Label");
    expect(getByLabelText("PlaceHolder")).toHaveValue("Test Placeholder");
    expect(getByLabelText("Helper text")).toHaveValue("Test Helper Text");
    expect(getByLabelText("Required")).not.toBeChecked();
  });

  it("should update element attributes on form submission", () => {
    const { getByText, getByLabelText } = render(
      <SelectFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    // Simulate changes in form fields
    act(() => {
      fireEvent.change(getByLabelText("Label"), {
        target: { value: "Updated Label" },
      });
      fireEvent.change(getByLabelText("PlaceHolder"), {
        target: { value: "Updated Placeholder" },
      });
      fireEvent.click(getByText("Save"));
    });

    waitFor(() =>
      expect(mockUpdateElement).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          extraAttributes: expect.objectContaining({
            label: "Updated Label",
            placeholer: "Updated PlaceHolder",
          }),
        })
      )
    );
  });

  it("should display success toast on form submission", () => {
    const toast = jest.fn();
    jest.mock("@/hooks/use-toast", () => ({ toast }));

    const { getByText } = render(
      <SelectFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    act(() => fireEvent.click(getByText("Save")));

    waitFor(() =>
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Success",
          description: "Properties saved successfully",
        })
      )
    );
  });

  it('should add a new option when "Add" button is clicked', () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: { ...mockElementInstance.extraAttributes, options: [] },
    };

    const { getByText, getAllByPlaceholderText } = render(
      <SelectFieldPropertiesComponent elementInstance={elementInstance} />
    );

    act(() => fireEvent.click(getByText("Add")));

    expect(getAllByPlaceholderText("").length).toBe(1);
  });

  it('should remove an option when "Remove" button is clicked', () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {
        ...mockElementInstance.extraAttributes,
        options: ["Option 1"],
      },
    };

    const { getByRole, queryByDisplayValue } = render(
      <SelectFieldPropertiesComponent elementInstance={elementInstance} />
    );

    act(() => fireEvent.click(getByRole("remove")));

    expect(queryByDisplayValue("Option 1")).toBeNull();
  });
});
