"use client";

import { Form } from "@prisma/client";
import ActionButtons from "@/components/builder/form-builder/action-buttons/ActionButtons";

function FormBuilder({ form }: { form: Form }) {
  return (
    <main className="flex flex-col w-full">
      <ActionButtons form={form} />
    </main>
  );
}

export default FormBuilder;
