"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { ImShare } from "react-icons/im";

interface FormLinkShareProps {
  shareUrl: string;
}

function FormLinkShare({ shareUrl }: FormLinkShareProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button className="max-w-[250px]" onClick={handleCopyLink}>
        <ImShare className="mr-2 h-4 w-4" />
        Share link
      </Button>
    </div>
  );
}

export default FormLinkShare;
