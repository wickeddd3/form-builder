"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { LuHeading2 } from "react-icons/lu";
import SubTitleFieldDesignerComponent from "./SubTitleFieldDesignerComponent";
import SubTitleFieldPropertiesComponent from "./SubTitleFieldPropertiesComponent";
import SubTitleFieldFormComponent from "./SubTitleFieldFormComponent";

const type: ElementsType = "SubTitleField";

const extraAttributes = {
  title: "SubTitle field",
};

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: LuHeading2,
    label: "SubTitle Field",
  },
  designerComponent: SubTitleFieldDesignerComponent,
  propertiesComponent: SubTitleFieldPropertiesComponent,
  formComponent: SubTitleFieldFormComponent,

  validate: () => true,
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
