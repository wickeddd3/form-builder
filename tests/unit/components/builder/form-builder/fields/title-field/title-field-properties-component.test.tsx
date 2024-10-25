import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleFieldPropertiesComponent from "@/components/builder/form-builder/fields/title-field/TitleFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import useDesigner from "@/hooks/use-designer";

// Mock the useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("TitleFieldPropertiesComponent", () => {
  const mockUpdateElement = jest.fn();
  const mockElementInstance: FormElementInstance = {
    id: "1",
    type: "TitleField",
    extraAttributes: {
      title: "Initial Title",
    },
  };

  beforeEach(() => {
    (useDesigner as jest.Mock).mockReturnValue({
      updateElement: mockUpdateElement,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with initial title", () => {
    render(
      <TitleFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const inputElement = screen.getByLabelText("Title") as HTMLInputElement;

    expect(inputElement.value).toBe("Initial Title");
  });

  it("calls updateElement with new title on blur", async () => {
    const { getByLabelText } = render(
      <TitleFieldPropertiesComponent elementInstance={mockElementInstance} />
    );
    const inputElement = getByLabelText("Title") as HTMLInputElement;

    // Simulate user changing the input value
    await act(() => {
      fireEvent.change(inputElement, { target: { value: "New Title" } });
      fireEvent.blur(inputElement);
    });

    expect(mockUpdateElement).toHaveBeenCalledWith("1", {
      ...mockElementInstance,
      extraAttributes: {
        title: "New Title",
      },
    });
  });

  it("should blur the input field on Enter key press", async () => {
    const { getByLabelText } = render(
      <TitleFieldPropertiesComponent elementInstance={mockElementInstance} />
    );
    const inputElement = getByLabelText("Title") as HTMLInputElement;
    inputElement.focus();

    await act(() => {
      fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    });

    expect(document.activeElement).not.toBe(inputElement);
  });

  it("should handle empty string as title", () => {
    const { getByLabelText } = render(
      <TitleFieldPropertiesComponent
        elementInstance={{
          ...mockElementInstance,
          extraAttributes: { title: "" },
        }}
      />
    );

    const inputElement = getByLabelText("Title") as HTMLInputElement;

    expect(inputElement.value).toBe("");
  });

  it("should handle special characters in title", () => {
    const { getByLabelText } = render(
      <TitleFieldPropertiesComponent
        elementInstance={{
          ...mockElementInstance,
          extraAttributes: { title: "!@#$%^&*()" },
        }}
      />
    );

    const inputElement = getByLabelText("Title") as HTMLInputElement;

    expect(inputElement.value).toBe("!@#$%^&*()");
  });
});
