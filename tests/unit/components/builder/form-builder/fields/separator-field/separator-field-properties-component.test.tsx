import React from "react";
import { render } from "@testing-library/react";
import SeparatorFieldPropertiesComponent from "@/components/builder/form-builder/fields/separator-field/SeparatorFieldPropertiesComponent";

describe("SeparatorFieldPropertiesComponent", () => {
  it("renders a message for no properties", () => {
    const { getByText } = render(<SeparatorFieldPropertiesComponent />);
    expect(getByText("No properties for this element")).toBeInTheDocument();
  });
});
