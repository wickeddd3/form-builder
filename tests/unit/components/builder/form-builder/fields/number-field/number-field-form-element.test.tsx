import { CustomInstance } from "@/components/builder/form-builder/fields/number-field/attributes";
import { NumberFieldFormElement } from "@/components/builder/form-builder/fields/number-field/NumberField";

describe("NumberFieldFormElement", () => {
  const mockElementInstance: CustomInstance = {
    id: "test-id",
    type: "NumberField",
    extraAttributes: {
      label: "Number field",
      helperText: "Helper text",
      required: true,
      placeholder: "0",
    },
  };

  describe("construct", () => {
    it("should construct a form element with the given id", () => {
      const id = "test-id";
      const constructedElement = NumberFieldFormElement.construct(id);

      expect(constructedElement.id).toBe(id);
      expect(constructedElement.type).toBe("NumberField");
      expect(constructedElement.extraAttributes).toEqual({
        label: "Number field",
        helperText: "Helper text",
        required: false,
        placeholder: "0",
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

      const isValid = NumberFieldFormElement.validate(
        formElement,
        currentValue
      );
      expect(isValid).toBe(true);
    });

    it("should return false if the field is required and currentValue is empty", () => {
      const currentValue = "";

      const isValid = NumberFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(false);
    });

    it("should return true if the field is required and currentValue is not empty", () => {
      const currentValue = "Some value";

      const isValid = NumberFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(true);
    });
  });
});
