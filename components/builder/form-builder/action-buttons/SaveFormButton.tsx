import { Button } from "@/components/ui/button";
import { MdOutlineSave } from "react-icons/md";
import useDesigner from "@/hooks/use-designer";
import { updateForm } from "@/actions/form";
import { toast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";

function SaveFormButton({ id }: { id: string }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await updateForm(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <MdOutlineSave className="h-5 w-5" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}

export default SaveFormButton;
