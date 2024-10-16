import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TitleFieldFormComponent from "@/components/builder/form-builder/fields/title-field/TitleFieldFormComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/title-field/TitleField";

describe("TitleFieldFormComponent", () => {
  it("renders the title from elementInstance", () => {
    // Mock data for the test
    const mockElementInstance: FormElementInstance = {
      // Assuming FormElementInstance has other properties, include them here
      extraAttributes: {
        title: "Test Title",
      },
    } as CustomInstance;

    // Render the component with the mock data
    const { getByText } = render(
      <TitleFieldFormComponent elementInstance={mockElementInstance} />
    );

    // Assert that the title is rendered correctly
    expect(getByText("Test Title")).toBeInTheDocument();
  });
});
