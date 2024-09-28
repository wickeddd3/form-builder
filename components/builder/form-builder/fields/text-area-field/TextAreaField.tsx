"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { BsTextareaResize } from "react-icons/bs";
import TextFieldDesignerComponent from "./TextAreaFieldDesignerComponent";
import TextFieldPropertiesComponent from "./TextAreaPropertiesComponent";
import TextFieldFormComponent from "./TextAreaFieldFormComponent";

const type: ElementsType = "TextAreaField";

const extraAttributes = {
  label: "Text area",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
  rows: 3,
};

export const TextAreaFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: BsTextareaResize,
    label: "TextArea Field",
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
