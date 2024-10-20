"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/builder/form-builder/FormElements";
import { Bs123 } from "react-icons/bs";
import NumberFieldDesignerComponent from "./NumberFieldDesignerComponent";
import NumberFieldPropertiesComponent from "./NumberFieldPropertiesComponent";
import NumberFieldFormComponent from "./NumberFieldFormComponent";
import { extraAttributes } from "./attributes";
import { validate } from "./utils";

const type: ElementsType = "NumberField";

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
  validate,
};
