import { TitleFieldFormElement } from "@/components/builder/form-builder/fields/title-field/TitleField";
import { LuHeading1 } from "react-icons/lu";

describe("TitleFieldFormElement", () => {
  it("should have the correct type", () => {
    expect(TitleFieldFormElement.type).toBe("TitleField");
  });

  it("should construct an element with the correct properties", () => {
    const id = "test-id";
    const constructedElement = TitleFieldFormElement.construct(id);

    expect(constructedElement).toEqual({
      id,
      type: "TitleField",
      extraAttributes: {
        title: "Title field",
      },
    });
  });

  it("should have the correct designer element button properties", () => {
    expect(TitleFieldFormElement.designerElementButton).toEqual({
      icon: LuHeading1,
      label: "Title Field",
    });
  });

  it("should return true for validate function", () => {
    expect(TitleFieldFormElement.validate()).toBe(true);
  });

  it("should have the correct components", () => {
    expect(TitleFieldFormElement.designerComponent).toBeDefined();
    expect(TitleFieldFormElement.propertiesComponent).toBeDefined();
    expect(TitleFieldFormElement.formComponent).toBeDefined();
  });
});
