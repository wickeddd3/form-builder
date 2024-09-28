"use client";

import {
  FormElementInstance,
  FormElements,
} from "@/components/builder/form-builder/FormElements";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { HiCursorClick } from "react-icons/hi";

export default function FormSubmitComponent({
  formUrl,
  content,
}: {
  content: FormElementInstance[];
  formUrl: string;
}) {
  const formValues = useRef<{ [key: string]: string }>({});

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm = () => {
    console.log("FORM VALUES", formValues.current);
  };

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => {
            submitForm();
          }}
        >
          <HiCursorClick className="mr-2" />
          Submit
        </Button>
      </div>
    </div>
  );
}