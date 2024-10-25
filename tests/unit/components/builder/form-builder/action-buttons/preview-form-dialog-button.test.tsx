import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PreviewFormDialogButton from "@/components/builder/form-builder/action-buttons/PreviewFormDialogButton";
import useDesigner from "@/hooks/use-designer";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

// Mock the useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock FormElements
jest.mock("@/components/builder/form-builder/FormElements", () => ({
  FormElements: {
    TitleField: {
      formComponent: ({
        elementInstance,
      }: {
        elementInstance: FormElementInstance;
      }) => <div>{elementInstance.id}</div>,
    },
  },
}));

describe("PreviewFormDialogButton", () => {
  beforeEach(() => {
    // Mock the return value of useDesigner
    (useDesigner as jest.Mock).mockReturnValue({
      elements: [{ id: "1", type: "TitleField" }],
    });
  });

  it("renders the button and opens the dialog on click", () => {
    render(<PreviewFormDialogButton />);

    // Check if the button is rendered
    const previewButton = screen.getByRole("button", { name: /Preview/ });
    expect(previewButton).toBeInTheDocument();

    // Click the button to open the dialog
    fireEvent.click(previewButton);

    // Check if the form element is rendered
    const formElement = screen.getByText("1");
    expect(formElement).toBeInTheDocument();
  });

  it("should display correct title and description in dialog", () => {
    render(<PreviewFormDialogButton />);

    const previewButton = screen.getByRole("button", { name: /Preview/ });

    fireEvent.click(previewButton);

    expect(screen.getByText(/Form preview/)).toBeInTheDocument();
    expect(
      screen.getByText(/This is how your form will look like to your users./)
    ).toBeInTheDocument();
  });
});
