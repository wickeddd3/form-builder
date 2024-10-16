import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActionButtons from "@/components/builder/form-builder/action-buttons/ActionButtons";
import { Form } from "@prisma/client";

// Mock the child components
jest.mock(
  "@/components/builder/form-builder/action-buttons/PreviewFormDialogButton",
  () => {
    const MockPreviewFormDialogButton = () => <button>Preview</button>;
    MockPreviewFormDialogButton.displayName = "MockPreviewFormDialogButton";
    return MockPreviewFormDialogButton;
  }
);
jest.mock(
  "@/components/builder/form-builder/action-buttons/SaveFormButton",
  () => {
    const MockSaveFormButton = ({ id }: { id: string }) => (
      <button>Save {id}</button>
    );
    MockSaveFormButton.displayName = "MockSaveFormButton";
    return MockSaveFormButton;
  }
);
jest.mock(
  "@/components/builder/form-builder/action-buttons/PublishFormButton",
  () => {
    const MockPublishFormButton = ({ id }: { id: string }) => (
      <button>Publish {id}</button>
    );
    MockPublishFormButton.displayName = "MockPublishFormButton";
    return MockPublishFormButton;
  }
);

describe("ActionButtons Component", () => {
  const form: Form = {
    userId: "101",
    id: "1",
    name: "Test Form",
    description: "This is a test form one",
    published: false,
    createdAt: new Date(),
    visits: 1234,
    submissions: 5678,
    content: "[]",
    shareURL: "",
  };

  it("renders the form name", () => {
    render(<ActionButtons form={form} />);
    expect(screen.getByText("Test Form")).toBeInTheDocument();
  });

  it("renders the PreviewFormDialogButton", () => {
    render(<ActionButtons form={form} />);
    expect(screen.getByText("Preview")).toBeInTheDocument();
  });

  it("renders SaveFormButton and PublishFormButton when form is not published", () => {
    render(<ActionButtons form={form} />);
    expect(screen.getByText("Save 1")).toBeInTheDocument();
    expect(screen.getByText("Publish 1")).toBeInTheDocument();
  });

  it("does not render SaveFormButton and PublishFormButton when form is published", () => {
    const publishedForm = { ...form, published: true };
    render(<ActionButtons form={publishedForm} />);
    expect(screen.queryByText("Save 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Publish 1")).not.toBeInTheDocument();
  });
});
