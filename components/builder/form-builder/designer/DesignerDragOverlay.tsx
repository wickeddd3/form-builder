import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { DesignerElementButtonDragOverlay } from "@/components/builder/form-builder/designer/DesignerElementButton";

function DesignerDragOverlay() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      console.log(event);
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
  const isSidebarBtnElement =
    draggedItem.data?.current?.isDesignerElementButton;

  if (isSidebarBtnElement) {
    node = <DesignerElementButtonDragOverlay />;
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DesignerDragOverlay;
