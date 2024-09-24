import { DndContext } from "@dnd-kit/core";
import DesignerEditor from "@/components/builder/form-builder/designer/editor/DesignerEditor";
import DesignerSidebar from "@/components/builder/form-builder/designer/DesignerSidebar";
import DesignerDragOverlay from "@/components/builder/form-builder/designer/DesignerDragOverlay";

function Designer() {
  return (
    <DndContext>
      <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/background/paper.svg)] dark:bg-[url(/background/paper-dark.svg)]">
        <div className="flex w-full h-full">
          <DesignerEditor />
          <DesignerSidebar />
        </div>
      </div>
      <DesignerDragOverlay />
    </DndContext>
  );
}

export default Designer;
