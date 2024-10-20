"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/builder/form-builder/FormElements";
import { MdTextFields } from "react-icons/md";
import TextFieldDesignerComponent from "./TextFieldDesignerComponent";
import TextFieldPropertiesComponent from "./TextFieldPropertiesComponent";
import TextFieldFormComponent from "./TextFieldFormComponent";
import { extraAttributes } from "./attributes";
import { validate } from "./utils";

const type: ElementsType = "TextField";

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
  validate,
};
