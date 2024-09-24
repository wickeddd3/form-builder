import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { RiDragDropLine } from "react-icons/ri";
import {
  ElementsType,
  FormElements,
} from "@/components/builder/form-builder/FormElements";
import useDesigner from "@/hooks/use-designer";
import { idGenerator } from "@/lib/idGenerator";

function DesignerEditor() {
  const droppable = useDroppable({
    id: "designer-editor-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  const { elements, addElement } = useDesigner();

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerElementButton =
        active.data?.current?.isDesignerElementButton;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const droppingDesignerElementButtonOverDesignerDropArea =
        isDesignerElementButton && isDroppingOverDesignerDropArea;

      if (droppingDesignerElementButtonOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(elements.length, newElement);
        return;
      }
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
        {elements.length > 0 && (
          <div className="flex flex-col w-full gap-2 p-4">
            {elements.map((element) => {
              const DesignerElement =
                FormElements[element.type].designerComponent;
              return (
                <DesignerElement key={element.id} elementInstance={element} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DesignerEditor;
