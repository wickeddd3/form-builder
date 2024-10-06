import { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateFormButton from "@/components/builder/forms/CreateFormButton";

// Mock the icons to avoid rendering issues during tests
jest.mock("react-icons/bs", () => ({
  BsFileEarmarkPlus: () => <div>File Icon</div>,
}));

jest.mock("@/components/ui/dialog", () => {
  const actualDialog = jest.requireActual("@/components/ui/dialog");
  return {
    ...actualDialog,
    DialogTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
    DialogContent: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    DialogTitle: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    DialogDescription: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    Dialog: ({ children }: { children: ReactNode }) => (
      <div data-testid="dialog">{children}</div>
    ),
  };
});

jest.mock("@/components/builder/forms/CreateForm", () => {
  const CreateForm = () => (
    <div data-testid="create-form">Create Form Component</div>
  );
  CreateForm.displayName = "CreateForm";
  return CreateForm;
});

describe("CreateFormButton Component", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test("renders the button with correct text", () => {
    render(<CreateFormButton />);
    const createNewFormButton = screen.getByRole("button", {
      name: /Create new form/i,
    });
    expect(createNewFormButton).toBeInTheDocument();
  });

  test("should open dialog on button click", () => {
    render(<CreateFormButton />);
    const createNewFormButton = screen.getByRole("button", {
      name: /Create new form/i,
    });
    fireEvent.click(createNewFormButton);
    const createNewFormDialog = screen.getByTestId("dialog");
    expect(createNewFormDialog).toBeVisible();
  });

  it("should display correct title and description in dialog", () => {
    render(<CreateFormButton />);
    const createNewFormButton = screen.getByRole("button", {
      name: /Create new form/i,
    });
    fireEvent.click(createNewFormButton);
    expect(screen.getByText("Create form")).toBeInTheDocument();
    expect(
      screen.getByText("Create a new form to start collecting responses")
    ).toBeInTheDocument();
  });

  it("should render CreateForm component inside dialog", () => {
    render(<CreateFormButton />);
    const createNewFormButton = screen.getByRole("button", {
      name: /Create new form/i,
    });
    fireEvent.click(createNewFormButton);
    expect(screen.getByTestId("create-form")).toBeInTheDocument();
  });

  it("should apply hover effects on button correctly", () => {
    render(<CreateFormButton />);
    const createNewFormButton = screen.getByRole("button", {
      name: /Create new form/i,
    });
    fireEvent.mouseOver(createNewFormButton);
    expect(createNewFormButton).toHaveClass(
      "hover:border-primary hover:cursor-pointer"
    );
  });

  it("should not open dialog if DialogTrigger is not functioning", () => {
    jest.mock("@/components/ui/dialog", () => ({
      ...jest.requireActual("@/components/ui/dialog"),
      DialogTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
    }));
    render(<CreateFormButton />);
    const createNewFormButton = screen.getByRole("button", {
      name: /Create new form/i,
    });
    fireEvent.click(createNewFormButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should not render dialog if CreateForm fails to load", () => {
    jest.mock("@/components/builder/forms/CreateForm", () => {
      throw new Error("Failed to load");
    });
    render(<CreateFormButton />);
    const createNewFormButton = screen.getByRole("button", {
      name: /Create new form/i,
    });
    fireEvent.click(createNewFormButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
