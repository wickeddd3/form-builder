"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { LuHeading1 } from "react-icons/lu";
import TitleFieldDesignerComponent from "./TitleFieldDesignerComponent";
import TitleFieldPropertiesComponent from "./TitleFieldPropertiesComponent";
import TitleFieldFormComponent from "./TitleFieldFormComponent";

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "Title field",
};

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: LuHeading1,
    label: "Title Field",
  },
  designerComponent: TitleFieldDesignerComponent,
  propertiesComponent: TitleFieldPropertiesComponent,
  formComponent: TitleFieldFormComponent,

  validate: () => true,
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
