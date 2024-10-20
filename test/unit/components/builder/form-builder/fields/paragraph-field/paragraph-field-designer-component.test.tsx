import React from "react";
import { render } from "@testing-library/react";
import ParagraphFieldDesignerComponent from "@/components/builder/form-builder/fields/paragraph-field/ParagraphFieldDesignerComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/paragraph-field/ParagraphField";

describe("ParagraphFieldDesignerComponent", () => {
  test("renders paragraph field with correct text", () => {
    const mockElementInstance: FormElementInstance = {
      extraAttributes: {
        text: "Sample paragraph text",
      },
    } as CustomInstance;

    const { getByText } = render(
      <ParagraphFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Paragraph Field")).toBeInTheDocument();
    expect(getByText("Sample paragraph text")).toBeInTheDocument();
  });
});
