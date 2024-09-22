import { Form } from "@prisma/client";
import FormCard from "@/components/builder/forms/FormCard";

interface FormCardsProps {
  forms: Form[];
}

function FormCards({ forms }: FormCardsProps) {
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

export default FormCards;
