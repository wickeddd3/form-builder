import { Button } from "@/components/ui/button";
import { MdOutlineViewInAr } from "react-icons/md";

function PreviewFormDialogButton() {
  return (
    <Button variant={"outline"} className="gap-2">
      <MdOutlineViewInAr className="h-5 w-5" />
      Preview
    </Button>
  );
}

export default PreviewFormDialogButton;
