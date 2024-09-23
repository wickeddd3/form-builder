import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";

function DesignerElementButton() {
  const draggable = useDraggable({
    id: "designer-button",
    data: {
      isDesignerElementButton: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <p className="text-xs">Text Field</p>
    </Button>
  );
}

export function DesignerElementButtonDragOverlay() {
  return (
    <Button
      variant={"outline"}
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
    >
      <p className="text-xs">Text Field</p>
    </Button>
  );
}

export default DesignerElementButton;
