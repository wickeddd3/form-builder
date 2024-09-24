import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { DesignerElementButtonDragOverlay } from "@/components/builder/form-builder/designer/sidebar/DesignerElementButton";
import {
  ElementsType,
  FormElements,
} from "@/components/builder/form-builder/FormElements";

function DesignerDragOverlay() {
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

  let node = null;
  const isDesignerElementButton =
    draggedItem.data?.current?.isDesignerElementButton;

  if (isDesignerElementButton) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = (
      <DesignerElementButtonDragOverlay formElement={FormElements[type]} />
    );
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DesignerDragOverlay;
