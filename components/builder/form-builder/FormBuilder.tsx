"use client";

import { Form } from "@prisma/client";
import ActionButtons from "@/components/builder/form-builder/action-buttons/ActionButtons";
import Designer from "@/components/builder/form-builder/designer/Designer";
import DesignerContextProvider from "@/context/DesignerContext";

function FormBuilder({ form }: { form: Form }) {
  return (
    <DesignerContextProvider>
      <main className="flex flex-col w-full h-full">
        <ActionButtons form={form} />
        <Designer form={form} />
      </main>
    </DesignerContextProvider>
  );
}

export default FormBuilder;
