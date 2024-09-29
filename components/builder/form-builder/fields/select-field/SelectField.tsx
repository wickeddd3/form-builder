"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { RxDropdownMenu } from "react-icons/rx";
import SelectFieldDesignerComponent from "./SelectFieldDesignerComponent";
import SelectFieldPropertiesComponent from "./SelectFieldPropertiesComponent";
import SelectFieldFormComponent from "./SelectFieldFormComponent";

const type: ElementsType = "SelectField";

const extraAttributes = {
  label: "Select field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
  options: [],
};

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: RxDropdownMenu,
    label: "Select Field",
  },
  designerComponent: SelectFieldDesignerComponent,
  propertiesComponent: SelectFieldPropertiesComponent,
  formComponent: SelectFieldFormComponent,

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
