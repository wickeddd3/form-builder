import useDesigner from "@/hooks/use-designer";
import { FormElements } from "@/components/builder/form-builder/FormElements";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MdClose } from "react-icons/md";

function DesignerElementProperties() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesComponent =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <h6 className="text-md font-medium">Element Properties</h6>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <MdClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesComponent elementInstance={selectedElement} />
    </div>
  );
}

export default DesignerElementProperties;
