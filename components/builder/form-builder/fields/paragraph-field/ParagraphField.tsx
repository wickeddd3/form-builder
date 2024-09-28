"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { BsTextParagraph } from "react-icons/bs";
import ParagraphFieldDesignerComponent from "./ParagraphFieldDesignerComponent";
import ParagraphFieldPropertiesComponent from "./ParagraphFieldPropertiesComponent";
import ParagraphFieldFormComponent from "./ParagraphFieldFormComponent";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
  text: "Paragraph field",
};

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: BsTextParagraph,
    label: "Paragraph Field",
  },
  designerComponent: ParagraphFieldDesignerComponent,
  propertiesComponent: ParagraphFieldPropertiesComponent,
  formComponent: ParagraphFieldFormComponent,

  validate: () => true,
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
