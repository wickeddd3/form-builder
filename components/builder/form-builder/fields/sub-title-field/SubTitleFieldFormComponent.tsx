"use client";

import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./SubTitleField";

function SubTitleFieldFormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return <p className="text-md">{title}</p>;
}

export default SubTitleFieldFormComponent;
