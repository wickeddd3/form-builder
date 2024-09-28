"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function SeparatorFieldDesignerComponent() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  );
}

export default SeparatorFieldDesignerComponent;
