import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubTitleFieldFormComponent from "@/components/builder/form-builder/fields/sub-title-field/SubTitleFieldFormComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/sub-title-field/SubTitleField";

describe("SubTitleFieldFormComponent", () => {
  it("renders the subtitle from the element instance", () => {
    const mockElementInstance: FormElementInstance = {
      extraAttributes: {
        title: "Test Subtitle",
      },
    } as CustomInstance;

    const { getByText } = render(
      <SubTitleFieldFormComponent elementInstance={mockElementInstance} />
    );

    expect(getByText("Test Subtitle")).toBeInTheDocument();
  });
});
