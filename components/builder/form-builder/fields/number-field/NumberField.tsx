"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { Bs123 } from "react-icons/bs";
import TextFieldDesignerComponent from "./NumberFieldDesignerComponent";
import TextFieldPropertiesComponent from "./NumberFieldPropertiesComponent";
import TextFieldFormComponent from "./NumberFieldFormComponent";

const type: ElementsType = "NumberField";

const extraAttributes = {
  label: "Number field",
  helperText: "Helper text",
  required: false,
  placeholder: "0",
};

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: Bs123,
    label: "Number Field",
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
