import { CustomInstance } from "@/components/builder/form-builder/fields/checkbox-field/attributes";
import { CheckboxFieldFormElement } from "@/components/builder/form-builder/fields/checkbox-field/CheckboxField";

describe("CheckboxFieldFormElement", () => {
  const mockElementInstance: CustomInstance = {
    id: "test-id",
    type: "CheckboxField",
    extraAttributes: {
      label: "Checkbox field",
      helperText: "Helper text",
      required: false,
    },
  };

  describe("construct", () => {
    it("should construct a form element with the given id", () => {
      const id = "test-id";
      const constructedElement = CheckboxFieldFormElement.construct(id);

      expect(constructedElement.id).toBe(id);
      expect(constructedElement.type).toBe("CheckboxField");
      expect(constructedElement.extraAttributes).toEqual({
        label: "Checkbox field",
        helperText: "Helper text",
        required: false,
      });
    });
  });

  describe("validate", () => {
    it("should return true if the field is not required", () => {
      const currentValue = "";

      const isValid = CheckboxFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(true);
    });

    it("should return false if the field is required and currentValue is empty", () => {
      const formElement: CustomInstance = {
        ...mockElementInstance,
        extraAttributes: {
          ...mockElementInstance.extraAttributes,
          required: true,
        },
      };

      const currentValue = "";

      const isValid = CheckboxFieldFormElement.validate(
        formElement,
        currentValue
      );
      expect(isValid).toBe(false);
    });

    it("should return true if the field is required and currentValue is not empty", () => {
      const formElement: CustomInstance = {
        ...mockElementInstance,
        extraAttributes: {
          ...mockElementInstance.extraAttributes,
          required: true,
        },
      };

      const currentValue = "true";

      const isValid = CheckboxFieldFormElement.validate(
        formElement,
        currentValue
      );
      expect(isValid).toBe(true);
    });
  });
});
