import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { FaSpinner } from "react-icons/fa";
import { MdOutlinePublish } from "react-icons/md";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { publishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

function PublishFormButton({ id }: { id: string }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  async function publishFormContent() {
    try {
      await publishForm(id);
      toast({
        title: "Success",
        description: "Your form is now available to the public",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:text-white"
        >
          <MdOutlinePublish className="h-5 w-5" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-pretty text-md py-6">
            This action cannot be undone. After publishing you will not be able
            to edit this form. By publishing this form you will make it
            available to the public and you will be able to collect submissions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishFormContent);
            }}
          >
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormButton;
