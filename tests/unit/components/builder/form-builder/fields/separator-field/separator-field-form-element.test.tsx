import { SeparatorFieldFormElement } from "@/components/builder/form-builder/fields/separator-field/SeparatorField";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { RiSeparator } from "react-icons/ri";

describe("SeparatorFieldFormElement", () => {
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "SeparatorField",
  };

  it("should construct a SeparatorFieldFormElement with the correct properties", () => {
    const id = "test-id";
    const constructedElement = SeparatorFieldFormElement.construct(id);

    expect(constructedElement.id).toBe(id);
    expect(constructedElement.type).toBe("SeparatorField");
  });

  it("should validate SeparatorFieldFormElement to be true", () => {
    const isValid = SeparatorFieldFormElement.validate(mockElementInstance, "");

    expect(isValid).toBe(true);
  });

  it("should have correct designer element button properties", () => {
    expect(SeparatorFieldFormElement.designerElementButton.icon).toBe(
      RiSeparator
    );
    expect(SeparatorFieldFormElement.designerElementButton.label).toBe(
      "Separator Field"
    );
  });
});
