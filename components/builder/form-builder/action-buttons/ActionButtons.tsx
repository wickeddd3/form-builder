import { Form } from "@prisma/client";
import PreviewFormDialogButton from "./PreviewFormDialogButton";
import SaveFormButton from "./SaveFormButton";
import PublishFormButton from "./PublishFormButton";

function ActionButtons({ form }: { form: Form }) {
  return (
    <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
      <h2 className="truncate font-medium">{form.name}</h2>
      <div className="flex items-center gap-2">
        <PreviewFormDialogButton />
        {!form.published && (
          <>
            <SaveFormButton />
            <PublishFormButton />
          </>
        )}
      </div>
    </nav>
  );
}

export default ActionButtons;
