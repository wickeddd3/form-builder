import DesignerElementButton from "@/components/builder/form-builder/designer/sidebar/DesignerElementButton";
import { FormElements } from "@/components/builder/form-builder/FormElements";

function DesignerElements() {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-md font-medium">Form Elements</h6>
      <DesignerElementButton formElement={FormElements.TextField} />
    </div>
  );
}

export default DesignerElements;
