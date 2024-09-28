"use client";

import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./SpacerField";

function SpacerFieldFormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return <div style={{ height, width: "100%" }}></div>;
}

export default SpacerFieldFormComponent;
