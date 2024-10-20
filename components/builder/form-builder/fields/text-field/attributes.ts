import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

export const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
