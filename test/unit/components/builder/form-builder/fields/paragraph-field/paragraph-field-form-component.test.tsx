import React from "react";
import { render } from "@testing-library/react";
import ParagraphFieldFormComponent from "@/components/builder/form-builder/fields/paragraph-field/ParagraphFieldFormComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/paragraph-field/ParagraphField";

describe("ParagraphFieldFormComponent", () => {
  test("renders paragraph element with correct text", () => {
    // Mock data for the test
    const mockElementInstance: FormElementInstance = {
      // Assuming FormElementInstance has other properties, include them here
      extraAttributes: {
        text: "Sample text for testing",
      },
    } as CustomInstance;

    const { getByText } = render(
      <ParagraphFieldFormComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Sample text for testing")).toBeInTheDocument();
  });
});
