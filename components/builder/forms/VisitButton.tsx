"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface VisitButtonProps {
  shareUrl: string;
}
function VisitButton({ shareUrl }: VisitButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  const handleVisit = () => {
    window.open(shareLink, "_blank");
  };

  return (
    <Button className="w-[200px]" onClick={handleVisit}>
      Visit
    </Button>
  );
}

export default VisitButton;
