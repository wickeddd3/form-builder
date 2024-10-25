import { TextareaFieldFormElement } from "@/components/builder/form-builder/fields/textarea-field/TextareaField";
import { BsTextareaResize } from "react-icons/bs";
import TextareaFieldDesignerComponent from "@/components/builder/form-builder/fields/textarea-field/TextareaFieldDesignerComponent";
import TextareaFieldPropertiesComponent from "@/components/builder/form-builder/fields/textarea-field/TextareaFieldPropertiesComponent";
import TextareaFieldFormComponent from "@/components/builder/form-builder/fields/textarea-field/TextareaFieldFormComponent";
import {
  extraAttributes,
  CustomInstance,
} from "@/components/builder/form-builder/fields/textarea-field/attributes";

describe("TextareaFieldFormElement", () => {
  const mockElementInstance: CustomInstance = {
    id: "test-id",
    type: "TextareaField",
    extraAttributes: {
      label: "Textarea field",
      helperText: "Helper text",
      required: true,
      placeholder: "Value here...",
      rows: 3,
    },
  };

  it("should construct the correct object", () => {
    const id = "test-id";
    const constructedObject = TextareaFieldFormElement.construct(id);

    expect(constructedObject).toEqual({
      id,
      type: "TextareaField",
      extraAttributes,
    });
  });

  it("should display correct icon and label in designerElementButton", () => {
    const { icon, label } = TextareaFieldFormElement.designerElementButton;

    expect(icon).toBe(BsTextareaResize);
    expect(label).toBe("Textarea Field");
  });

  it("should use the correct components", () => {
    expect(TextareaFieldFormElement.designerComponent).toBe(
      TextareaFieldDesignerComponent
    );
    expect(TextareaFieldFormElement.propertiesComponent).toBe(
      TextareaFieldPropertiesComponent
    );
    expect(TextareaFieldFormElement.formComponent).toBe(
      TextareaFieldFormComponent
    );
  });

  describe("validate", () => {
    it("should return true if the field is not required", () => {
      const formElement: CustomInstance = {
        ...mockElementInstance,
        extraAttributes: {
          ...mockElementInstance.extraAttributes,
          required: false,
        },
      };
      const currentValue = "";

      const isValid = TextareaFieldFormElement.validate(
        formElement,
        currentValue
      );
      expect(isValid).toBe(true);
    });

    it("should return false if the field is required and currentValue is empty", () => {
      const currentValue = "";

      const isValid = TextareaFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(false);
    });

    it("should return true if the field is required and currentValue is not empty", () => {
      const currentValue = "Some value";

      const isValid = TextareaFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(true);
    });
  });
});
