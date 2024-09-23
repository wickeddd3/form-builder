"use client";

import { Form } from "@prisma/client";
import ActionButtons from "@/components/builder/form-builder/action-buttons/ActionButtons";
import Designer from "@/components/builder/form-builder/designer/Designer";

function FormBuilder({ form }: { form: Form }) {
  return (
    <main className="flex flex-col w-full">
      <ActionButtons form={form} />
      <Designer />
    </main>
  );
}

export default FormBuilder;
