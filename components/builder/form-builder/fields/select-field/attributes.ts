import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

export const extraAttributes = {
  label: "Select field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
  options: [],
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
