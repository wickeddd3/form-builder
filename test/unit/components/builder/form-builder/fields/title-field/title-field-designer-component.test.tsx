import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleFieldDesignerComponent from "@/components/builder/form-builder/fields/title-field/TitleFieldDesignerComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/title-field/TitleField";

describe("TitleFieldDesignerComponent", () => {
  it("renders the title from the element instance", () => {
    // Mock data for the test
    const mockElementInstance: FormElementInstance = {
      extraAttributes: {
        title: "Test Title",
      },
    } as CustomInstance;

    // Render the component with the mock data
    const { getByText } = render(
      <TitleFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    // Assert that the title is rendered correctly
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Title Field")).toBeInTheDocument();
  });
});
