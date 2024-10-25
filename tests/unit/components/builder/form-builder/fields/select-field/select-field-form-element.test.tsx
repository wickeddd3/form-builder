import { CustomInstance } from "@/components/builder/form-builder/fields/select-field/attributes";
import { SelectFieldFormElement } from "@/components/builder/form-builder/fields/select-field/SelectField";

describe("SelectFieldFormElement", () => {
  const mockElementInstance: CustomInstance = {
    id: "test-id",
    type: "SelectField",
    extraAttributes: {
      label: "Select field",
      helperText: "Helper text",
      required: true,
      placeholder: "Value here...",
      options: [],
    },
  };

  it("should construct a form element with the provided id", () => {
    const id = "test-id";
    const constructedElement = SelectFieldFormElement.construct(id);

    expect(constructedElement.id).toBe(id);
    expect(constructedElement.type).toBe("SelectField");
    expect(constructedElement.extraAttributes).toEqual({
      label: "Select field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
      options: [],
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

      const isValid = SelectFieldFormElement.validate(
        formElement,
        currentValue
      );
      expect(isValid).toBe(true);
    });

    it("should return false if the field is required and currentValue is empty", () => {
      const currentValue = "";

      const isValid = SelectFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(false);
    });

    it("should return true if the field is required and currentValue is not empty", () => {
      const currentValue = "Some value";

      const isValid = SelectFieldFormElement.validate(
        mockElementInstance,
        currentValue
      );
      expect(isValid).toBe(true);
    });
  });
});
