import DesignerElements from "@/components/builder/form-builder/designer/sidebar/DesignerElements";

function DesignerSidebar() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      <DesignerElements />
    </aside>
  );
}

export default DesignerSidebar;
