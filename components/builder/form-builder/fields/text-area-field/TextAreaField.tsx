"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/builder/form-builder/FormElements";
import { BsTextareaResize } from "react-icons/bs";
import TextAreaFieldDesignerComponent from "./TextAreaFieldDesignerComponent";
import TextAreaFieldPropertiesComponent from "./TextAreaFieldPropertiesComponent";
import TextAreaFieldFormComponent from "./TextAreaFieldFormComponent";
import { extraAttributes } from "./attributes";
import { validate } from "./utils";

const type: ElementsType = "TextAreaField";

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
  designerComponent: TextAreaFieldDesignerComponent,
  propertiesComponent: TextAreaFieldPropertiesComponent,
  formComponent: TextAreaFieldFormComponent,
  validate,
};
