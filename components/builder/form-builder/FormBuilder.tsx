"use client";

import { Form } from "@prisma/client";

function FormBuilder({ form }: { form: Form }) {
  return <div>{form.name}</div>;
}

export default FormBuilder;
