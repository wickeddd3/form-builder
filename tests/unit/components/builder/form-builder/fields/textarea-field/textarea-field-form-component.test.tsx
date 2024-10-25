import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import TextareaFieldFormComponent from "@/components/builder/form-builder/fields/textarea-field/TextareaFieldFormComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/textarea-field/attributes";

describe("TextareaFieldFormComponent", () => {
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "TextareaField",
    extraAttributes: {
      label: "Test Label",
      required: false,
      placeholder: "Enter text...",
      helperText: "This is a helper text",
      rows: 4,
    },
  } as CustomInstance;

  const mockSubmitFunction = jest.fn();

  it("renders the label and textarea with correct attributes", () => {
    render(
      <TextareaFieldFormComponent
        elementInstance={mockElementInstance}
        defaultValue="Initial value"
      />
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
    expect(screen.getByText("This is a helper text")).toBeInTheDocument();
  });

  it("renders the label with asterisk when required is true", () => {
    const elementInstance = {
      ...mockElementInstance,
      extraAttributes: {
        ...mockElementInstance.extraAttributes,
        required: true,
      },
    };

    render(
      <TextareaFieldFormComponent
        elementInstance={elementInstance}
        defaultValue="Initial value"
      />
    );

    expect(screen.getByText("Test Label*")).toBeInTheDocument();
  });

  it("displays error styles when isInvalid is true", () => {
    render(
      <TextareaFieldFormComponent
        elementInstance={mockElementInstance}
        isInvalid={true}
      />
    );

    const label = screen.getByText("Test Label");
    const textarea = screen.getByPlaceholderText("Enter text...");
    const helperText = screen.getByText("This is a helper text");

    expect(label).toHaveClass("text-red-500");
    expect(textarea).toHaveClass("border-red-500");
    expect(helperText).toHaveClass("text-red-500");
  });

  it("calls submitValue with correct arguments on blur if valid", () => {
    render(
      <TextareaFieldFormComponent
        elementInstance={mockElementInstance}
        submitValue={mockSubmitFunction}
      />
    );

    const textarea = screen.getByPlaceholderText("Enter text...");

    act(() => {
      fireEvent.change(textarea, { target: { value: "Valid input" } });
      fireEvent.blur(textarea);
    });

    waitFor(() =>
      expect(mockSubmitFunction).toHaveBeenCalledWith("test-id", "Valid input")
    );
  });

  it("does not call submitValue if input is invalid", () => {
    const mockValidate = jest.fn().mockReturnValue(false);
    jest.mock(
      "@/components/builder/form-builder/fields/textarea-field/utils",
      () => ({
        validate: mockValidate,
      })
    );

    render(
      <TextareaFieldFormComponent
        elementInstance={mockElementInstance}
        submitValue={mockSubmitFunction}
      />
    );

    const textarea = screen.getByPlaceholderText("Enter text...");

    act(() => {
      fireEvent.change(textarea, { target: { value: "Invalid input" } });
      fireEvent.blur(textarea);
    });

    waitFor(() => expect(mockSubmitFunction).not.toHaveBeenCalled());
  });
});
