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
import DesignerPublishSuccessful from "@/components/builder/form-builder/designer/DesignerPublishSuccessful";
import { Form } from "@prisma/client";
import useDesigner from "@/hooks/use-designer";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

function Designer({ form }: { form: Form }) {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);

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

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    setIsReady(true);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [isReady, form, setElements, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (form.published) {
    return <DesignerPublishSuccessful form={form} />;
  }

  return (
    <DndContext sensors={sensors}>
      <div className="w-full h-full flex items-center justify-between bg-accent bg-[url(/background/paper.svg)] dark:bg-[url(/background/paper-dark.svg)]">
        <DesignerEditor />
        <DesignerSidebar />
      </div>
      <DesignerDragOverlay />
    </DndContext>
  );
}

export default Designer;
