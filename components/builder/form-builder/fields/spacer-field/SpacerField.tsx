"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/builder/form-builder/FormElements";
import { LuSeparatorHorizontal } from "react-icons/lu";
import SpacerFieldDesignerComponent from "./SpacerFieldDesignerComponent";
import SpacerFieldPropertiesComponent from "./SpacerFieldPropertiesComponent";
import SpacerFieldFormComponent from "./SpacerFieldFormComponent";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20, // px
};

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerElementButton: {
    icon: LuSeparatorHorizontal,
    label: "Spacer Field",
  },
  designerComponent: SpacerFieldDesignerComponent,
  propertiesComponent: SpacerFieldPropertiesComponent,
  formComponent: SpacerFieldFormComponent,

  validate: () => true,
};

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};
