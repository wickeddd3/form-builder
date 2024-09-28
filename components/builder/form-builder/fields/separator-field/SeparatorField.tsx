"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/builder/form-builder/FormElements";
import { RiSeparator } from "react-icons/ri";
import SeparatorFieldDesignerComponent from "./SeparatorFieldDesignerComponent";
import SeparatorFieldPropertiesComponent from "./SeparatorFieldPropertiesComponent";
import SeparatorFieldFormComponent from "./SeparatorFieldFormComponent";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerElementButton: {
    icon: RiSeparator,
    label: "Separator Field",
  },
  designerComponent: SeparatorFieldDesignerComponent,
  propertiesComponent: SeparatorFieldPropertiesComponent,
  formComponent: SeparatorFieldFormComponent,

  validate: () => true,
};
