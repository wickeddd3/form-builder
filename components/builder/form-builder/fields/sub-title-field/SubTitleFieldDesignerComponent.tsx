"use client";

import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./SubTitleField";
import { Label } from "@/components/ui/label";

function SubTitleFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">SubTitle Field</Label>
      <p className="text-md">{title}</p>
    </div>
  );
}

export default SubTitleFieldDesignerComponent;
