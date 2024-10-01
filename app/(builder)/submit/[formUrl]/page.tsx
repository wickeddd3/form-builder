import type { Metadata } from "next";
import { getFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import FormSubmitComponent from "@/components/builder/forms/FormSubmitComponent";

export const metadata: Metadata = {
  title: "Form",
};

async function Page({ params }: { params: { formUrl: string } }) {
  const form = await getFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default Page;
