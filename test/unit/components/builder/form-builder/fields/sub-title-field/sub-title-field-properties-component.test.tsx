import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubTitleFieldPropertiesComponent from "@/components/builder/form-builder/fields/sub-title-field/SubTitleFieldPropertiesComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/sub-title-field/SubTitleField";
import useDesigner from "@/hooks/use-designer";

// Mock the useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("SubTitleFieldPropertiesComponent", () => {
  const mockUpdateElement = jest.fn();
  const mockElementInstance: FormElementInstance = {
    id: "1",
    type: "SubTitleField",
    extraAttributes: {
      title: "Initial Title",
    },
  } as CustomInstance;

  beforeEach(() => {
    (useDesigner as jest.Mock).mockReturnValue({
      updateElement: mockUpdateElement,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field with the initial title", () => {
    const { getByLabelText } = render(
      <SubTitleFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const input = getByLabelText("SubTitle");

    expect(input).toHaveValue("Initial Title");
  });

  it("calls updateElement with the new title on blur", () => {
    const { getByLabelText } = render(
      <SubTitleFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const input = getByLabelText("SubTitle");

    act(() => {
      fireEvent.change(input, { target: { value: "New Title" } });
      fireEvent.blur(input);
    });

    waitFor(() =>
      expect(mockUpdateElement).toHaveBeenCalledWith("1", {
        ...mockElementInstance,
        extraAttributes: {
          title: "New Title",
        },
      })
    );
  });

  it("does not call updateElement if the title is unchanged", () => {
    const { getByLabelText } = render(
      <SubTitleFieldPropertiesComponent elementInstance={mockElementInstance} />
    );

    const input = getByLabelText("SubTitle");

    act(() => fireEvent.blur(input));

    waitFor(() => expect(mockUpdateElement).not.toHaveBeenCalled());
  });

  it("should handle empty string as title", () => {
    const { getByLabelText } = render(
      <SubTitleFieldPropertiesComponent
        elementInstance={{
          ...mockElementInstance,
          extraAttributes: { title: "" },
        }}
      />
    );

    const inputElement = getByLabelText("SubTitle") as HTMLInputElement;

    expect(inputElement.value).toBe("");
  });

  it("should handle special characters in title", () => {
    const { getByLabelText } = render(
      <SubTitleFieldPropertiesComponent
        elementInstance={{
          ...mockElementInstance,
          extraAttributes: { title: "!@#$%^&*()" },
        }}
      />
    );

    const inputElement = getByLabelText("SubTitle") as HTMLInputElement;

    expect(inputElement.value).toBe("!@#$%^&*()");
  });
});
