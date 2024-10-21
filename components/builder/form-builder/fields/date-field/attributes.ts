import { FormElementInstance } from "@/components/builder/form-builder/FormElements";

export const extraAttributes = {
  label: "Date field",
  helperText: "Pick a date",
  required: false,
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
