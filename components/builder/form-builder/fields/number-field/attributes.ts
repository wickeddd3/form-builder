import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

export const extraAttributes = {
  label: "Number field",
  helperText: "Helper text",
  required: false,
  placeholder: "0",
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
