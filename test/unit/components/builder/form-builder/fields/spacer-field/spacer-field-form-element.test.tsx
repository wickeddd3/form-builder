import {
  SpacerFieldFormElement,
  CustomInstance,
} from "@/components/builder/form-builder/fields/spacer-field/SpacerField";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { LuSeparatorHorizontal } from "react-icons/lu";

describe("SpacerFieldFormElement", () => {
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "SpacerField",
    extraAttributes: {
      height: 20,
    },
  } as CustomInstance;

  it("should construct a form element instance correctly", () => {
    const id = "test-id";
    const instance = SpacerFieldFormElement.construct(id);

    expect(instance).toEqual({
      id,
      type: "SpacerField",
      extraAttributes: {
        height: 20,
      },
    });
  });

  it("should always validate successfully", () => {
    expect(SpacerFieldFormElement.validate(mockElementInstance, "")).toBe(true);
  });

  it("should have correct designer element button properties", () => {
    expect(SpacerFieldFormElement.designerElementButton.icon).toBe(
      LuSeparatorHorizontal
    );
    expect(SpacerFieldFormElement.designerElementButton.label).toBe(
      "Spacer Field"
    );
  });
});
