import DesignerElementButton from "@/components/builder/form-builder/designer/sidebar/DesignerElementButton";
import { FormElements } from "@/components/builder/form-builder/FormElements";

function DesignerElements() {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-md font-medium">Form Elements</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <DesignerElementButton formElement={FormElements.TextField} />
        <DesignerElementButton formElement={FormElements.TitleField} />
      </div>
    </div>
  );
}

export default DesignerElements;
