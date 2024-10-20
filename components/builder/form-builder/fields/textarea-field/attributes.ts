import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

export const extraAttributes = {
  label: "Text area",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
  rows: 3,
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
