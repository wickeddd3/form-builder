import { Button } from "@/components/ui/button";
import { MdOutlineViewInAr } from "react-icons/md";
import useDesigner from "@/hooks/use-designer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormElements } from "@/components/builder/form-builder/FormElements";

function PreviewFormDialogButton() {
  const { elements } = useDesigner();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdOutlineViewInAr className="h-5 w-5" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <DialogHeader className="px-4 py-2 border-b">
          <DialogTitle className="text-lg font-bold text-muted-foreground">
            Form preview
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            This is how your form will look like to your users.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewFormDialogButton;
