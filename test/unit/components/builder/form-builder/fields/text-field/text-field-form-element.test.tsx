import { CustomInstance } from "@/components/builder/form-builder/fields/text-field/attributes";
import { TextFieldFormElement } from "@/components/builder/form-builder/fields/text-field/TextField";

describe("TextFieldFormElement", () => {
  const mockElementInstance: CustomInstance = {
    id: "test-id",
    type: "TextField",
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: true,
      placeholder: "Value here...",
    },
  };

  describe("construct", () => {
    it("should construct a form element with the given id", () => {
      const id = "test-id";
      const constructedElement = TextFieldFormElement.construct(id);

      expect(constructedElement.id).toBe(id);
      expect(constructedElement.type).toBe("TextField");
      expect(constructedElement.extraAttributes).toEqual({
        label: "Text field",
        helperText: "Helper text",
        required: false,
        placeholder: "Value here...",
      });
    });
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

      const isValid = TextFieldFormElement.validate(formElement, currentValue);
      expect(isValid).toBe(true);
    });

    it("should return false if the field is required and currentValue is empty", () => {
      const currentValue = "";

      const isValid = TextFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(false);
    });

    it("should return true if the field is required and currentValue is not empty", () => {
      const currentValue = "Some value";

      const isValid = TextFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(true);
    });
  });
});
