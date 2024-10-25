import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ParagraphFieldPropertiesComponent from "@/components/builder/form-builder/fields/paragraph-field/ParagraphFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import useDesigner from "@/hooks/use-designer";

// Mock the useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ParagraphFieldPropertiesComponent", () => {
  const mockUpdateElement = jest.fn();
  const mockElementInstance: FormElementInstance = {
    id: "1",
    type: "ParagraphField",
    extraAttributes: {
      text: "Initial text",
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

  it("renders the component with initial text", () => {
    const { getByLabelText } = render(
      <ParagraphFieldPropertiesComponent
        elementInstance={mockElementInstance}
      />
    );

    const inputElement = getByLabelText("Text") as HTMLInputElement;

    expect(inputElement.value).toBe("Initial text");
  });

  it("should update text value on change", () => {
    const { getByLabelText } = render(
      <ParagraphFieldPropertiesComponent
        elementInstance={mockElementInstance}
      />
    );

    const textArea = getByLabelText("Text");

    act(() =>
      fireEvent.change(textArea, { target: { value: "Updated text" } })
    );

    expect(textArea).toHaveValue("Updated text");
  });

  it("should handle empty string as text", () => {
    const { getByLabelText } = render(
      <ParagraphFieldPropertiesComponent
        elementInstance={{
          ...mockElementInstance,
          extraAttributes: { text: "" },
        }}
      />
    );

    const inputElement = getByLabelText("Text") as HTMLInputElement;

    expect(inputElement.value).toBe("");
  });

  it("should handle special characters in text", () => {
    const { getByLabelText } = render(
      <ParagraphFieldPropertiesComponent
        elementInstance={{
          ...mockElementInstance,
          extraAttributes: { text: "!@#$%^&*()" },
        }}
      />
    );

    const inputElement = getByLabelText("Text") as HTMLInputElement;

    expect(inputElement.value).toBe("!@#$%^&*()");
  });
});
