import React from "react";
import { render } from "@testing-library/react";
import SpacerFieldFormComponent from "@/components/builder/form-builder/fields/spacer-field/SpacerFieldFormComponent";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "@/components/builder/form-builder/fields/spacer-field/SpacerField";

describe("SpacerFieldFormComponent", () => {
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "SpacerField",
    extraAttributes: {
      height: 50,
    },
  } as CustomInstance;

  it("renders with the correct height and width styles", () => {
    const { container } = render(
      <SpacerFieldFormComponent elementInstance={mockElementInstance} />
    );

    const divElement = container.firstChild as HTMLElement;

    expect(divElement).toHaveStyle("height: 50px");
    expect(divElement).toHaveStyle("width: 100%");
  });
});
