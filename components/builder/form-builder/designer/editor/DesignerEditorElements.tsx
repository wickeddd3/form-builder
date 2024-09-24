import {
  FormElementInstance,
  FormElements,
} from "@/components/builder/form-builder/FormElements";

function DesignerEditorElements({
  elements,
}: {
  elements: FormElementInstance[];
}) {
  return (
    <div className="flex flex-col w-full gap-2 p-4">
      {elements.map((element) => {
        const DesignerElement = FormElements[element.type].designerComponent;
        return <DesignerElement key={element.id} elementInstance={element} />;
      })}
    </div>
  );
}

export default DesignerEditorElements;
