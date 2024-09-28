"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { MdTextFields } from "react-icons/md";
import TextFieldDesignerComponent from "./TextFieldDesignerComponent";
import TextFieldPropertiesComponent from "./TextFieldPropertiesComponent";
import TextFieldFormComponent from "./TextFieldFormComponent";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: TextFieldDesignerComponent,
  propertiesComponent: TextFieldPropertiesComponent,
  formComponent: TextFieldFormComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
