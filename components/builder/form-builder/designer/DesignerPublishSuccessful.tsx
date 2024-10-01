import { Form } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";

function DesignerPublishSuccessful({ form }: { form: Form }) {
  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={1000}
      />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-md">
          <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
            Form Published
          </h1>
          <h2 className="text-2xl">Share this form</h2>
          <h4 className="text-xl text-muted-foreground border-b pb-10">
            Anyone with link can view and submit the form
          </h4>
          <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast({
                  title: "Copied",
                  description: "Link copied to clipboard",
                });
              }}
            >
              Copy link
            </Button>
          </div>
          <div className="flex justify-between">
            <Button variant={"link"} asChild>
              <Link href={"/builder"} className="gap-2">
                <BsArrowLeft />
                Go back home
              </Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href={`/builder/${form.id}/details`} className="gap-2">
                Form details
                <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignerPublishSuccessful;
