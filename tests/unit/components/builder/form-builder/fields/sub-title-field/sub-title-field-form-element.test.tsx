import {
  SubTitleFieldFormElement,
  CustomInstance,
} from "@/components/builder/form-builder/fields/sub-title-field/SubTitleField";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { LuHeading2 } from "react-icons/lu";

describe("SubTitleFieldFormElement", () => {
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "SubTitleField",
    extraAttributes: {
      title: "SubTitle field",
    },
  } as CustomInstance;

  it("should have the correct type", () => {
    expect(SubTitleFieldFormElement.type).toBe("SubTitleField");
  });

  it("should construct a form element instance correctly", () => {
    const id = "test-id";
    const instance = SubTitleFieldFormElement.construct(id) as CustomInstance;

    expect(instance.id).toBe(id);
    expect(instance.type).toBe("SubTitleField");
    expect(instance.extraAttributes).toEqual({ title: "SubTitle field" });
  });

  it("should validate correctly", () => {
    expect(SubTitleFieldFormElement.validate(mockElementInstance, "")).toBe(
      true
    );
  });

  it("should have the correct designer element button properties", () => {
    expect(SubTitleFieldFormElement.designerElementButton.icon).toBe(
      LuHeading2
    );
    expect(SubTitleFieldFormElement.designerElementButton.label).toBe(
      "SubTitle Field"
    );
  });

  it("should have the correct components", () => {
    expect(SubTitleFieldFormElement.designerComponent).toBeDefined();
    expect(SubTitleFieldFormElement.propertiesComponent).toBeDefined();
    expect(SubTitleFieldFormElement.formComponent).toBeDefined();
  });
});
