import React from "react";
import { render } from "@testing-library/react";
import SeparatorFieldDesignerComponent from "@/components/builder/form-builder/fields/separator-field/SeparatorFieldDesignerComponent";

describe("SeparatorFieldDesignerComponent", () => {
  test("renders label and separator", () => {
    const { getByText, getByRole } = render(
      <SeparatorFieldDesignerComponent />
    );

    expect(getByText("Separator Field")).toBeInTheDocument();
    expect(getByRole("separator")).toBeInTheDocument();
  });
});
