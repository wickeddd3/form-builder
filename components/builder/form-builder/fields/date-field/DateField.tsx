"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/builder/form-builder/FormElements";
import { BsFillCalendarDateFill } from "react-icons/bs";
import DateFieldDesignerComponent from "./DateFieldDesignerComponent";
import DateFieldPropertiesComponent from "./DateFieldPropertiesComponent";
import DateFieldFormComponent from "./DateFieldFormComponent";
import { extraAttributes } from "./attributes";
import { validate } from "./utils";

const type: ElementsType = "DateField";

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
  validate,
};
