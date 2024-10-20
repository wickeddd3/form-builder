import {
  ParagraphFieldFormElement,
  CustomInstance,
} from "@/components/builder/form-builder/fields/paragraph-field/ParagraphField";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { BsTextParagraph } from "react-icons/bs";

describe("ParagraphFieldFormElement", () => {
  // Mock data for the test
  const mockElementInstance: FormElementInstance = {
    id: "test-id",
    type: "ParagraphField",
    extraAttributes: {
      text: "Paragraph field",
    },
  } as CustomInstance;

  it("should have the correct type", () => {
    expect(ParagraphFieldFormElement.type).toBe("ParagraphField");
  });

  it("should construct a valid form element instance", () => {
    const id = "test-id";
    const constructedElement = ParagraphFieldFormElement.construct(id);

    expect(constructedElement.id).toBe(id);
    expect(constructedElement.type).toBe("ParagraphField");
    expect(constructedElement.extraAttributes).toEqual({
      text: "Paragraph field",
    });
  });

  it("should have the correct designer element button properties", () => {
    expect(ParagraphFieldFormElement.designerElementButton).toEqual({
      icon: BsTextParagraph,
      label: "Paragraph Field",
    });
  });

  it("should return true for validate function", () => {
    expect(ParagraphFieldFormElement.validate(mockElementInstance, "")).toBe(
      true
    );
  });

  it("should have the correct components", () => {
    expect(ParagraphFieldFormElement.designerComponent).toBeDefined();
    expect(ParagraphFieldFormElement.propertiesComponent).toBeDefined();
    expect(ParagraphFieldFormElement.formComponent).toBeDefined();
  });
});
