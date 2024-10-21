import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./attributes";

export const validate = (
  formElement: FormElementInstance,
  currentValue: string
): boolean => {
  const element = formElement as CustomInstance;
  if (element.extraAttributes.required) {
    return currentValue === "true";
  }

  return true;
};
