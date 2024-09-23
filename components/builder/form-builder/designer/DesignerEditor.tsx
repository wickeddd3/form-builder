import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { RiDragDropLine } from "react-icons/ri";

function DesignerEditor() {
  const droppable = useDroppable({
    id: "designer-editor-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      console.log(event);
    },
  });

  return (
    <div className="p-4 w-full">
      <div
        ref={droppable.setNodeRef}
        className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1"
      >
        {!droppable.isOver && (
          <div className=" flex flex-grow flex-col items-center justify-center gap-6">
            <RiDragDropLine className="h-14 w-14" />
            <p className="text-xl md:text-3xl text-muted-foreground items-center font-bold">
              Drag and Drop here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DesignerEditor;
