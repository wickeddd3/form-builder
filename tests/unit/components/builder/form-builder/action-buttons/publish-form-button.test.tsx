import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PublishFormButton from "@/components/builder/form-builder/action-buttons/PublishFormButton";
import { publishForm } from "@/actions/form";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Mock the updateForm action
jest.mock("@/actions/form", () => ({
  publishForm: jest.fn(),
  currentUser: jest.fn(),
}));

// Mock the toast function
jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
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

describe("PublishFormButton", () => {
  const mockPublishForm = publishForm as jest.Mock;
  const mockToast = toast as jest.Mock;
  const mockRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockPublishForm.mockClear();
    mockToast.mockClear();
    mockRouter.mockReturnValue({ refresh: jest.fn() });
  });

  it("renders the publish button", () => {
    const { getByText } = render(<PublishFormButton id="test-id" />);

    expect(getByText("Publish")).toBeInTheDocument();
  });

  it("opens the alert dialog when the publish button is clicked", () => {
    const { getByText } = render(<PublishFormButton id="test-id" />);

    const publishButton = getByText("Publish");

    fireEvent.click(publishButton);

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("calls publishForm and shows success toast on successful publish", async () => {
    mockPublishForm.mockResolvedValueOnce({});

    render(<PublishFormButton id="test-id" />);

    fireEvent.click(screen.getByText("Publish"));
    fireEvent.click(screen.getByText("Proceed"));

    await waitFor(() => {
      expect(mockPublishForm).toHaveBeenCalledWith("test-id");
      expect(mockToast).toHaveBeenCalledWith({
        title: "Success",
        description: "Your form is now available to the public",
      });
    });
  });

  it("shows error toast on publish failure", async () => {
    mockPublishForm.mockRejectedValueOnce(new Error("Publish failed"));

    render(<PublishFormButton id="test-id" />);

    fireEvent.click(screen.getByText("Publish"));
    fireEvent.click(screen.getByText("Proceed"));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Error",
        description: "Something went wrong",
      });
    });
  });

  it("should display spinner icon while publishing", async () => {
    render(<PublishFormButton id="test-id" />);

    fireEvent.click(screen.getByText("Publish"));
    fireEvent.click(screen.getByText("Proceed"));

    expect(screen.getByTestId("spinner-icon")).toBeInTheDocument();
  });

  it("disables the proceed button when loading", async () => {
    mockPublishForm.mockImplementation(() => new Promise(() => {})); // Simulate loading state

    render(<PublishFormButton id="test-id" />);

    fireEvent.click(screen.getByText("Publish"));
    fireEvent.click(screen.getByText("Proceed"));

    expect(screen.getByText("Proceed")).toBeDisabled();
  });
});
