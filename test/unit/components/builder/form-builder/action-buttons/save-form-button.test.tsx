import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SaveFormButton from "@/components/builder/form-builder/action-buttons/SaveFormButton";
import useDesigner from "@/hooks/use-designer";
import { updateForm } from "@/actions/form";
import { toast } from "@/hooks/use-toast";

// Mock the useDesigner hook
jest.mock("@/hooks/use-designer", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the updateForm action
jest.mock("@/actions/form", () => ({
  updateForm: jest.fn(),
  currentUser: jest.fn(),
}));

// Mock the toast function
jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));

// Mock useTransition
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useTransition: () => {
    const [loading, setLoading] = React.useState(false);
    const startTransition = (callback: () => void) => {
      setLoading(true);
      callback();
      setTimeout(() => {
        setLoading(false); // Simulate the end of the transition
      }, 100); // Simulate form update time
    };
    return [loading, startTransition];
  },
}));

describe("SaveFormButton", () => {
  const mockElements = { field1: "value1", field2: "value2" };
  const mockId = "test-form-id";

  beforeEach(() => {
    (useDesigner as jest.Mock).mockReturnValue({ elements: mockElements });
    (updateForm as jest.Mock).mockResolvedValue("123");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Save button", () => {
    const { getByRole } = render(<SaveFormButton id={mockId} />);

    const saveButton = getByRole("button", { name: /Save/ });

    expect(saveButton).toBeInTheDocument();
  });

  it("calls updateForm and shows success toast on successful save", async () => {
    const { getByRole } = render(<SaveFormButton id={mockId} />);

    const saveButton = getByRole("button", { name: /Save/ });

    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(updateForm).toHaveBeenCalledWith(
      mockId,
      JSON.stringify(mockElements)
    );
    expect(toast).toHaveBeenCalledWith({
      title: "Success",
      description: "Your form has been saved",
    });
  });

  it("shows error toast on failed save", async () => {
    (updateForm as jest.Mock).mockRejectedValueOnce(new Error("Save failed"));

    const { getByRole } = render(<SaveFormButton id={mockId} />);

    const saveButton = getByRole("button", { name: /Save/ });

    await act(() => {
      fireEvent.click(saveButton);
    });

    expect(toast).toHaveBeenCalledWith({
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    });
  });

  it("should display loading spinner during form update", async () => {
    // Mock updateForm to simulate a delay
    (updateForm as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)) // Simulate async delay
    );

    const { getByRole, queryByTestId } = render(<SaveFormButton id="mockId" />);
    const saveButton = getByRole("button", { name: /Save/ });

    // Act to trigger the form save
    await act(async () => {
      fireEvent.click(saveButton); // Click the button to trigger the form update
    });

    // Check if the spinner appears (during loading state)
    await waitFor(() =>
      expect(queryByTestId("spinner-icon")).toBeInTheDocument()
    );
    // Wait for the updateForm to resolve
    await waitFor(() => expect(updateForm).toHaveBeenCalled());
    // Check if the spinner disappears after the loading state ends
    await waitFor(() =>
      expect(queryByTestId("spinner-icon")).not.toBeInTheDocument()
    );
  });

  it("should disable button during loading state", async () => {
    // Mock updateForm to simulate a delay
    (updateForm as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)) // Simulate async delay
    );

    const { getByRole } = render(<SaveFormButton id={mockId} />);
    const saveButton = getByRole("button", { name: /Save/ });

    // Act to trigger the form save
    await act(async () => {
      fireEvent.click(saveButton); // Click the button to trigger the form update
    });

    // Check if the button is disabled (during loading state)
    await waitFor(() => expect(saveButton).toBeDisabled());
    // Wait for the updateForm to resolve
    await waitFor(() => expect(updateForm).toHaveBeenCalled());
    // Check if the button is enabled after the loading state ends
    await waitFor(() => expect(saveButton).toBeDisabled());
  });
});
