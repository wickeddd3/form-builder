import useDesigner from "@/hooks/use-designer";
import DesignerElements from "@/components/builder/form-builder/designer/sidebar/DesignerElements";
import DesignerElementProperties from "@/components/builder/form-builder/designer/sidebar/DesignerElementProperties";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside
      className="h-[86vh] w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto
      [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:bg-gray-200
    dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
    >
      {!selectedElement && <DesignerElements />}
      {selectedElement && <DesignerElementProperties />}
    </aside>
  );
}

export default DesignerSidebar;
