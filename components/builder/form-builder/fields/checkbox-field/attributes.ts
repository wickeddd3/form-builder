import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

export const extraAttributes = {
  label: "Checkbox field",
  helperText: "Helper text",
  required: false,
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
