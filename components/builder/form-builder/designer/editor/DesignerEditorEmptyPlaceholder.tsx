import { RiDragDropLine } from "react-icons/ri";

function DesignerEditorEmptyPlaceholder() {
  return (
    <div className=" flex flex-grow flex-col items-center justify-center gap-6">
      <RiDragDropLine className="h-14 w-14" />
      <p className="text-xl md:text-3xl text-muted-foreground items-center font-bold">
        Drag and Drop here
      </p>
    </div>
  );
}

export default DesignerEditorEmptyPlaceholder;
