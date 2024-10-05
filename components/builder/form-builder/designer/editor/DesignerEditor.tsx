import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import {
  ElementsType,
  FormElements,
} from "@/components/builder/form-builder/FormElements";
import useDesigner from "@/hooks/use-designer";
import { idGenerator } from "@/lib/idGenerator";
import DesignerEditorEmptyPlaceholder from "@/components/builder/form-builder/designer/editor/DesignerEditorEmptyPlaceholder";
import DesignerEditorElements from "@/components/builder/form-builder/designer/editor/DesignerEditorElements";
import { cn } from "@/lib/utils";

function DesignerEditor() {
  const droppable = useDroppable({
    id: "designer-editor-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  const { elements, addElement, removeElement, setSelectedElement } =
    useDesigner();

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

      // First scenario
      if (droppingDesignerElementButtonOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerElementButton && isDroppingOverDesignerElement;

      // Second scenario
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex; // i assume i'm on top half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      // Third scenario
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // i assume i'm on top half
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div
      className="px-4 py-8 w-full h-full flex flex-col items-center justify-center overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:bg-gray-200
    dark:[&::-webkit-scrollbar-track]:bg-neutral-800
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700"
      onClick={() => {
        setSelectedElement(null);
      }}
    >
      <div
        ref={droppable.setNodeRef}
        className={cn(
          "bg-background max-w-[920px] w-full h-fit rounded-xl flex flex-col items-center flex-grow justify-start",
          droppable.isOver && "ring-4  ring-primary ring-inset"
        )}
      >
        {!droppable.isOver && elements.length === 0 && (
          <DesignerEditorEmptyPlaceholder />
        )}
        {droppable.isOver && elements.length === 0 && (
          <div className="p-4 w-full">
            <div className="h-[120px] rounded-md bg-primary/20"></div>
          </div>
        )}
        {elements.length > 0 && <DesignerEditorElements elements={elements} />}
      </div>
    </div>
  );
}

export default DesignerEditor;
