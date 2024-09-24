import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { DesignerElementButtonDragOverlay } from "@/components/builder/form-builder/designer/sidebar/DesignerElementButton";
import {
  ElementsType,
  FormElements,
} from "@/components/builder/form-builder/FormElements";
import useDesigner from "@/hooks/use-designer";

function DesignerDragOverlay() {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  // Overlay element to show when DesignerElementButton is dragged
  const isDesignerElementButton =
    draggedItem.data?.current?.isDesignerElementButton;
  if (isDesignerElementButton) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = (
      <DesignerElementButtonDragOverlay formElement={FormElements[type]} />
    );
  }

  // Overlay element to show when DesignerElement is dragged
  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      node = <div>Element not found</div>;
    } else {
      const DesignerComponent = FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
          <DesignerComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DesignerDragOverlay;
