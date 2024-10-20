"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/builder/form-builder/FormElements";
import { RxDropdownMenu } from "react-icons/rx";
import SelectFieldDesignerComponent from "./SelectFieldDesignerComponent";
import SelectFieldPropertiesComponent from "./SelectFieldPropertiesComponent";
import SelectFieldFormComponent from "./SelectFieldFormComponent";
import { extraAttributes } from "./attributes";
import { validate } from "./utils";

const type: ElementsType = "SelectField";

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
  validate,
};
