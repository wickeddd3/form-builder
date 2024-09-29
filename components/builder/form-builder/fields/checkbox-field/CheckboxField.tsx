"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { IoMdCheckbox } from "react-icons/io";
import CheckboxFieldDesignerComponent from "./CheckboxFieldDesignerComponent";
import CheckboxFieldPropertiesComponent from "./CheckboxFieldPropertiesComponent";
import CheckboxFieldFormComponent from "./CheckboxFieldFormComponent";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
  label: "Checkbox field",
  helperText: "Helper text",
  required: false,
};

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: IoMdCheckbox,
    label: "Checkbox Field",
  },
  designerComponent: CheckboxFieldDesignerComponent,
  propertiesComponent: CheckboxFieldPropertiesComponent,
  formComponent: CheckboxFieldFormComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === "true";
    }

    return true;
  },
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
