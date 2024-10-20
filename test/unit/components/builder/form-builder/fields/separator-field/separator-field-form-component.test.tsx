import React from "react";
import { render } from "@testing-library/react";
import SeparatorFieldFormComponent from "@/components/builder/form-builder/fields/separator-field/SeparatorFieldFormComponent";

describe("SeparatorFieldFormComponent", () => {
  it("renders Separator component", () => {
    const { getByRole } = render(<SeparatorFieldFormComponent />);
    const separatorElement = getByRole("separator");

    expect(separatorElement).toBeInTheDocument();
  });
});
