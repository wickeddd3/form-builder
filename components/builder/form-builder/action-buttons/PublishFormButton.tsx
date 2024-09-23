import { Button } from "@/components/ui/button";
import { MdOutlinePublish } from "react-icons/md";

function PublishFormButton() {
  return (
    <Button
      variant={"outline"}
      className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:text-white"
    >
      <MdOutlinePublish className="h-5 w-5" />
      Publish
    </Button>
  );
}

export default PublishFormButton;
