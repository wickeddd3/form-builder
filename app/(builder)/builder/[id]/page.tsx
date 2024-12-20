import type { Metadata } from "next";
import { getFormById } from "@/actions/form";
import FormBuilder from "@/components/builder/form-builder/FormBuilder";

export const metadata: Metadata = {
  title: "Builder",
};

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await getFormById(id);

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
}

export default Page;
