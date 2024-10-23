import { CustomInstance } from "@/components/builder/form-builder/fields/date-field/attributes";
import { DateFieldFormElement } from "@/components/builder/form-builder/fields/date-field/DateField";

describe("DateFieldFormElement", () => {
  const mockElementInstance: CustomInstance = {
    id: "test-id",
    type: "DateField",
    extraAttributes: {
      label: "Date field",
      helperText: "Helper text",
      required: true,
    },
  };

  describe("construct", () => {
    it("should construct a form element with the given id", () => {
      const id = "test-id";
      const constructedElement = DateFieldFormElement.construct(id);

      expect(constructedElement.id).toBe(id);
      expect(constructedElement.type).toBe("DateField");
      expect(constructedElement.extraAttributes).toEqual({
        label: "Date field",
        helperText: "Pick a date",
        required: false,
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

      const isValid = DateFieldFormElement.validate(formElement, currentValue);
      expect(isValid).toBe(true);
    });

    it("should return false if the field is required and currentValue is empty", () => {
      const currentValue = "";

      const isValid = DateFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(false);
    });

    it("should return true if the field is required and currentValue is not empty", () => {
      const currentValue = "Some value";

      const isValid = DateFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(true);
    });
  });
});
