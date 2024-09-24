import {
  FormElementInstance,
  FormElements,
} from "@/components/builder/form-builder/FormElements";

function DesignerEditorElement({ element }: { element: FormElementInstance }) {
  const DesignerComponent = FormElements[element.type].designerComponent;
  return <DesignerComponent elementInstance={element} />;
}

export default DesignerEditorElement;
