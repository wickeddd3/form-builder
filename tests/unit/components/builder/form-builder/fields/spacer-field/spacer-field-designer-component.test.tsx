import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SpacerFieldDesignerComponent from "@/components/builder/form-builder/fields/spacer-field/SpacerFieldDesignerComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/spacer-field/SpacerField";

describe("SpacerFieldDesignerComponent", () => {
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "SpacerField",
    extraAttributes: {
      height: 50,
    },
  } as CustomInstance;

  it("renders the spacer field with the correct height", () => {
    const { getByText } = render(
      <SpacerFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Spacer Field: 50px")).toBeInTheDocument();
  });

  it("renders the separator icon", () => {
    const { container } = render(
      <SpacerFieldDesignerComponent elementInstance={mockElementInstance} />
    );

    const separatorIcon = container.querySelector(".h-8.w-8");

    expect(separatorIcon).toBeInTheDocument();
  });
});
