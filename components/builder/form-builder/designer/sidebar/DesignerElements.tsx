import DesignerElementButton from "@/components/builder/form-builder/designer/sidebar/DesignerElementButton";
import { FormElements } from "@/components/builder/form-builder/FormElements";
import { Separator } from "@/components/ui/separator";

function DesignerElements() {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-md font-medium">Drag and drop elements</h6>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout elements
        </p>
        <DesignerElementButton formElement={FormElements.TitleField} />
        <DesignerElementButton formElement={FormElements.SubTitleField} />
        <DesignerElementButton formElement={FormElements.ParagraphField} />
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Form elements
        </p>
        <DesignerElementButton formElement={FormElements.TextField} />
      </div>
    </div>
  );
}

export default DesignerElements;
