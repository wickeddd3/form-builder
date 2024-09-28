"use client";

import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./ParagraphField";

function ParagraphFieldFormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  return <p className="text-sm">{text}</p>;
}

export default ParagraphFieldFormComponent;
