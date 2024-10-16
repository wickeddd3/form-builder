import { ElementType, FC } from "react";
import { TextFieldFormElement } from "@/components/builder/form-builder/fields/text-field/TextField";
import { TitleFieldFormElement } from "@/components/builder/form-builder/fields/title-field/TitleField";
import { SubTitleFieldFormElement } from "@/components/builder/form-builder/fields/sub-title-field/SubTitleField";
import { ParagraphFieldFormElement } from "@/components/builder/form-builder/fields/paragraph-field/ParagraphField";
import { SeparatorFieldFormElement } from "@/components/builder/form-builder/fields/separator-field/SeparatorField";
import { SpacerFieldFormElement } from "@/components/builder/form-builder/fields/spacer-field/SpacerField";
import { NumberFieldFormElement } from "@/components/builder/form-builder/fields/number-field/NumberField";
import { TextAreaFieldFormElement } from "@/components/builder/form-builder/fields/text-area-field/TextAreaField";
import { DateFieldFormElement } from "@/components/builder/form-builder/fields/date-field/DateField";
import { SelectFieldFormElement } from "@/components/builder/form-builder/fields/select-field/SelectField";
import { CheckboxFieldFormElement } from "@/components/builder/form-builder/fields/checkbox-field/CheckboxField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

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

  validate: (
    formElement?: FormElementInstance,
    currentValue?: string
  ) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraAttributes?: Record<string, any>;
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
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
