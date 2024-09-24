import useDesigner from "@/hooks/use-designer";
import DesignerElements from "@/components/builder/form-builder/designer/sidebar/DesignerElements";
import DesignerElementProperties from "@/components/builder/form-builder/designer/sidebar/DesignerElementProperties";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <DesignerElements />}
      {selectedElement && <DesignerElementProperties />}
    </aside>
  );
}

export default DesignerSidebar;
