"use client";

import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./SpacerField";
import { Label } from "@/components/ui/label";
import { LuSeparatorHorizontal } from "react-icons/lu";

function SpacerFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">Spacer Field: {height}px</Label>
      <LuSeparatorHorizontal className="h-8 w-8" />
    </div>
  );
}

export default SpacerFieldDesignerComponent;
