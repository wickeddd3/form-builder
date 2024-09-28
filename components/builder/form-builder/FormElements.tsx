import { ElementType, FC } from "react";
import { TextFieldFormElement } from "@/components/builder/form-builder/fields/text-field/TextField";
import { TitleFieldFormElement } from "@/components/builder/form-builder/fields/title-field/TitleField";
import { SubTitleFieldFormElement } from "@/components/builder/form-builder/fields/sub-title-field/SubTitleField";
import { ParagraphFieldFormElement } from "@/components/builder/form-builder/fields/paragraph-field/ParagraphField";
import { SeparatorFieldFormElement } from "@/components/builder/form-builder/fields/separator-field/SeparatorField";
import { SpacerFieldFormElement } from "@/components/builder/form-builder/fields/spacer-field/SpacerField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerElementButton: {
    icon: ElementType;
    label: string;
  };
  designerComponent: FC<{
    elementInstance: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
};
