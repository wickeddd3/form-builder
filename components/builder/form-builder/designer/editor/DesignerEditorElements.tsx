import { FormElementInstance } from "@/components/builder/form-builder/FormElements";
import DesignerEditorElement from "@/components/builder/form-builder/designer/editor/DesignerEditorElement";

function DesignerEditorElements({
  elements,
}: {
  elements: FormElementInstance[];
}) {
  return (
    <div className="flex flex-col w-full gap-2 p-4">
      {elements.map((element) => (
        <DesignerEditorElement key={element.id} element={element} />
      ))}
    </div>
  );
}

export default DesignerEditorElements;
