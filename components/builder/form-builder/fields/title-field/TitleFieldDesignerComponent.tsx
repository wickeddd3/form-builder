"use client";

import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./TitleField";
import { Label } from "@/components/ui/label";

function TitleFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Title Field</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
}

export default TitleFieldDesignerComponent;
