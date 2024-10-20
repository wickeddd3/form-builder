"use client";

import {
  FormElementInstance,
  SubmitFunction,
} from "@/components/builder/form-builder/FormElements";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CustomInstance } from "./attributes";
import { validate } from "./utils";

function TextAreaFieldFormComponent({
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
  const { label, required, placeholder, helperText, rows } =
    element.extraAttributes;
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const handleBlur = (e: { target: { value: string } }) => {
    if (!submitValue) return;
    const valid = validate(element, e.target.value);
    setError(!valid);
    if (valid) submitValue(element.id, e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Textarea
        className={cn(error && "border-red-500")}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        value={value}
      />
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
  );
}

export default TextAreaFieldFormComponent;
