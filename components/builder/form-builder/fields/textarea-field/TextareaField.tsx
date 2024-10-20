"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/builder/form-builder/FormElements";
import { BsTextareaResize } from "react-icons/bs";
import TextareaFieldDesignerComponent from "./TextareaFieldDesignerComponent";
import TextareaFieldPropertiesComponent from "./TextareaFieldPropertiesComponent";
import TextareaFieldFormComponent from "./TextareaFieldFormComponent";
import { extraAttributes } from "./attributes";
import { validate } from "./utils";

const type: ElementsType = "TextareaField";

export const TextareaFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: BsTextareaResize,
    label: "Textarea Field",
  },
  designerComponent: TextareaFieldDesignerComponent,
  propertiesComponent: TextareaFieldPropertiesComponent,
  formComponent: TextareaFieldFormComponent,
  validate,
};
