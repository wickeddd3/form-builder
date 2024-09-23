import DesignerEditor from "@/components/builder/form-builder/designer/DesignerEditor";
import DesignerSidebar from "@/components/builder/form-builder/designer/DesignerSidebar";
import { DndContext } from "@dnd-kit/core";

function Designer() {
  return (
    <DndContext>
      <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/background/paper.svg)] dark:bg-[url(/background/paper-dark.svg)]">
        <div className="flex w-full h-full">
          <DesignerEditor />
          <DesignerSidebar />
        </div>
      </div>
    </DndContext>
  );
}

export default Designer;
