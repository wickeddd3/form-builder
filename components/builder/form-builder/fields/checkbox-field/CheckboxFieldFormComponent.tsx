"use client";

import {
  FormElementInstance,
  SubmitFunction,
} from "@/components/builder/form-builder/FormElements";
import { CustomInstance } from "./attributes";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { validate } from "./utils";

function CheckboxFieldFormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  const [value, setValue] = useState<boolean>(
    defaultValue === "true" ? true : false
  );
  const [error, setError] = useState(false);
  const id = `checkbox-${element.id}`;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const handleCheckedChange = (checked: boolean) => {
    setValue(checked);
    if (!submitValue) return;
    const stringValue = checked ? "true" : "false";
    const valid = validate(elementInstance, stringValue);
    setError(!valid);
    submitValue(elementInstance.id, stringValue);
  };

  return (
    <div className="flex items-top space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && "border-red-500")}
        onCheckedChange={handleCheckedChange}
      />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={cn(error && "text-red-500")}>
          {label}
          {required && "*"}
        </Label>
        {helperText && (
          <p
            className={cn(
              "text-muted-foreground text-[0.8rem]",
              error && "text-red-500"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}

export default CheckboxFieldFormComponent;
