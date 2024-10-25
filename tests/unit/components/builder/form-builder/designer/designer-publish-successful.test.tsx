import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import DesignerPublishSuccessful from "@/components/builder/form-builder/designer/DesignerPublishSuccessful";
import { toast } from "@/hooks/use-toast";

// Mock the toast function and clipboard functionality
jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});
// Mock the Confetti component to avoid canvas context issues
jest.mock("react-confetti", () => {
  const ReactConfetti = () => <div data-testid="confetti-mock" />;
  ReactConfetti.displayName = "ReactConfetti";
  return ReactConfetti;
});

const mockForm = {
  userId: "101",
  id: "1",
  name: "Test Form",
  description: "This is a test form",
  published: true,
  createdAt: new Date(),
  visits: 1234,
  submissions: 5678,
  content: "[]",
  shareURL: "example-share-url",
};

describe("DesignerPublishSuccessful component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with correct title and share link", () => {
    const { getByText, getByDisplayValue } = render(
      <DesignerPublishSuccessful form={mockForm} />
    );

    // Check if title and description texts are present
    expect(getByText("Form Published")).toBeInTheDocument();
    expect(getByText("Share this form")).toBeInTheDocument();
    expect(
      getByText("Anyone with link can view and submit the form")
    ).toBeInTheDocument();

    // Verify that the share link is rendered with correct URL
    const shareInput = getByDisplayValue(
      `${window.location.origin}/submit/${mockForm.shareURL}`
    );
    expect(shareInput).toBeInTheDocument();
  });

  test("copies the share URL to clipboard when 'Copy link' is clicked", () => {
    const { getByRole } = render(<DesignerPublishSuccessful form={mockForm} />);

    const copyButton = getByRole("button", { name: "Copy link" });

    act(() => fireEvent.click(copyButton));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}/submit/${mockForm.shareURL}`
    );
    expect(toast).toHaveBeenCalledWith({
      title: "Copied",
      description: "Link copied to clipboard",
    });
  });

  test("renders navigation links with correct URLs", () => {
    const { getByRole } = render(<DesignerPublishSuccessful form={mockForm} />);

    // Go back home link
    const goBackLink = getByRole("link", { name: /Go back home/i });
    expect(goBackLink).toBeInTheDocument();
    expect(goBackLink).toHaveAttribute("href", "/builder");

    // Form details link
    const formDetailsLink = getByRole("link", { name: /Form details/i });
    expect(formDetailsLink).toBeInTheDocument();
    expect(formDetailsLink).toHaveAttribute(
      "href",
      `/builder/${mockForm.id}/details`
    );
  });
});
