import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DesignerEditor from "@/components/builder/form-builder/designer/editor/DesignerEditor";
import DesignerSidebar from "@/components/builder/form-builder/designer/sidebar/DesignerSidebar";
import DesignerDragOverlay from "@/components/builder/form-builder/designer/DesignerDragOverlay";

function Designer() {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, //10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
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
