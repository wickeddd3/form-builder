"use client";

import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./ParagraphField";
import { Label } from "@/components/ui/label";

function ParagraphFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Paragraph Field</Label>
      <p className="text-sm">{text}</p>
    </div>
  );
}

export default ParagraphFieldDesignerComponent;
