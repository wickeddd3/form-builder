"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/builder/form-builder/FormElements";
import { IoMdCheckbox } from "react-icons/io";
import CheckboxFieldDesignerComponent from "./CheckboxFieldDesignerComponent";
import CheckboxFieldPropertiesComponent from "./CheckboxFieldPropertiesComponent";
import CheckboxFieldFormComponent from "./CheckboxFieldFormComponent";
import { extraAttributes } from "./attributes";
import { validate } from "./utils";

const type: ElementsType = "CheckboxField";

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
  validate,
};
