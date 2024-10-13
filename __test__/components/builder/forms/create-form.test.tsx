import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateForm from "@/components/builder/forms/CreateForm";
import { createForm } from "@/actions/form";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

jest.mock("@/actions/form", () => ({
  createForm: jest.fn(),
  currentUser: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));

describe("CreateForm", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (createForm as jest.Mock).mockResolvedValue("123");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with input fields and a submit button", () => {
    const { getByLabelText, getByRole } = render(<CreateForm />);

    const nameInput = getByLabelText(/Name/);
    const descriptionInput = getByLabelText(/Description/);
    const submitButton = getByRole("button", { name: /Save/ });

    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should initialize form fields with default values", () => {
    const { getByLabelText } = render(<CreateForm />);

    const nameInput = getByLabelText(/Name/);
    const descriptionInput = getByLabelText(/Description/);

    expect(nameInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
  });

  it("submits the form successfully with toast message and redirect to builder page", async () => {
    const { getByLabelText, getByRole } = render(<CreateForm />);

    const nameInput = getByLabelText(/Name/);
    const descriptionInput = getByLabelText(/Description/);
    const submitButton = getByRole("button", { name: /Save/ });

    await act(async () => {
      fireEvent.change(nameInput, {
        target: { value: "Test Name" },
      });
      fireEvent.change(descriptionInput, {
        target: { value: "Test Description" },
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(createForm).toHaveBeenCalledWith({
        name: "Test Name",
        description: "Test Description",
      });
      expect(toast).toHaveBeenCalledWith({
        title: "Success",
        description: "Form created successfully",
      });
      expect(mockPush).toHaveBeenCalledWith("/builder/123");
    });
  });

  it("handles form submission error", async () => {
    (createForm as jest.Mock).mockRejectedValue(
      new Error("Failed to create form")
    );

    const { getByLabelText, getByRole } = render(<CreateForm />);

    const nameInput = getByLabelText(/Name/);
    const descriptionInput = getByLabelText(/Description/);
    const submitButton = getByRole("button", { name: /Save/ });

    await act(async () => {
      fireEvent.change(nameInput, {
        target: { value: "Test Name" },
      });
      fireEvent.change(descriptionInput, {
        target: { value: "Test Description" },
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    });
  });

  it("should display spinner icon during form submission", async () => {
    const { getByLabelText, getByRole, queryByTestId } = render(<CreateForm />);

    const nameInput = getByLabelText(/Name/);
    const submitButton = getByRole("button", { name: /Save/ });

    // Mock the form submission to introduce a delay
    (createForm as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve("123"), 100))
    );

    // Trigger form submission
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Test Name" } });
      fireEvent.click(submitButton);
    });

    // Assert that the spinner icon is in the document
    expect(queryByTestId("spinner-icon")).toBeInTheDocument();

    // Wait for the form submission to complete
    await waitFor(() => expect(createForm).toHaveBeenCalled());
  });

  it("should disable button during form submission", async () => {
    const { getByLabelText, getByRole } = render(<CreateForm />);

    const nameInput = getByLabelText(/Name/);
    const submitButton = getByRole("button", { name: /Save/ });

    // Mock the form submission to introduce a delay
    (createForm as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve("123"), 100))
    );

    // Trigger form submission
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Test Name" } });
      fireEvent.click(submitButton);
    });

    // Assert that the submit button is disabled
    expect(submitButton).toBeDisabled();

    // Wait for the form submission to complete and the button to be re-enabled
    await waitFor(() => expect(createForm).toHaveBeenCalled());
  });

  it("should trigger error messages when form is submitted with invalid data", async () => {
    const { getByRole, findByText } = render(<CreateForm />);

    const submitButton = getByRole("button", { name: /Save/ });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    const errorMessage = await findByText((content, element) => {
      if (!element) return false; // Add null check
      const hasText = (node: Element) =>
        node.textContent === "String must contain at least 4 character(s)";
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });

    expect(errorMessage).toBeInTheDocument();
  });
});
