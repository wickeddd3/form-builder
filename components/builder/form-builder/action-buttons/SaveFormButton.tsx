import { Button } from "@/components/ui/button";
import { MdOutlineSave } from "react-icons/md";

function SaveFormButton() {
  return (
    <Button variant={"outline"} className="gap-2">
      <MdOutlineSave className="h-5 w-5" />
      Save
    </Button>
  );
}

export default SaveFormButton;
