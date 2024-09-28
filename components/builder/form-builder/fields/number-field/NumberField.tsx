"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { Bs123 } from "react-icons/bs";
import NumberFieldDesignerComponent from "./NumberFieldDesignerComponent";
import NumberFieldPropertiesComponent from "./NumberFieldPropertiesComponent";
import NumberFieldFormComponent from "./NumberFieldFormComponent";

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
  designerComponent: NumberFieldDesignerComponent,
  propertiesComponent: NumberFieldPropertiesComponent,
  formComponent: NumberFieldFormComponent,

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
