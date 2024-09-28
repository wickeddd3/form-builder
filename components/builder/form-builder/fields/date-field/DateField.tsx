"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { BsFillCalendarDateFill } from "react-icons/bs";
import DateFieldDesignerComponent from "./DateFieldDesignerComponent";
import DateFieldPropertiesComponent from "./DateFieldPropertiesComponent";
import DateFieldFormComponent from "./DateFieldFormComponent";

const type: ElementsType = "DateField";

const extraAttributes = {
  label: "Date field",
  helperText: "Pick a date",
  required: false,
};

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: BsFillCalendarDateFill,
    label: "Date Field",
  },
  designerComponent: DateFieldDesignerComponent,
  propertiesComponent: DateFieldPropertiesComponent,
  formComponent: DateFieldFormComponent,

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
