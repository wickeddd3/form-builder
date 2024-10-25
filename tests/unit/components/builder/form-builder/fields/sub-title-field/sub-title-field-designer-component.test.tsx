import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubTitleFieldDesignerComponent from "@/components/builder/form-builder/fields/sub-title-field/SubTitleFieldDesignerComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/sub-title-field/SubTitleField";

describe("SubTitleFieldDesignerComponent", () => {
  it("renders the subtitle from the element instance", () => {
    const mockElementInstance: FormElementInstance = {
      extraAttributes: {
        title: "Test Subtitle",
      },
    } as CustomInstance;

    const { getByText } = render(
      <SubTitleFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("SubTitle Field")).toBeInTheDocument();
    expect(getByText("Test Subtitle")).toBeInTheDocument();
  });
});
