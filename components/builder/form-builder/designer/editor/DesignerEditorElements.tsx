import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import DesignerEditorElementWrapper from "@/components/builder/form-builder/designer/editor/DesignerEditorElementWrapper";

function DesignerEditorElements({
  elements,
}: {
  elements: FormElementInstance[];
}) {
  return (
    <div className="flex flex-col w-full gap-2 p-4">
      {elements.map((element) => (
        <DesignerEditorElementWrapper key={element.id} element={element} />
      ))}
    </div>
  );
}

export default DesignerEditorElements;
