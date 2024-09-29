"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ErrorSvg from "@/public/illustrations/error.svg";

function Error() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4">
      <Image src={ErrorSvg} width={200} height={200} alt="Error" />
      <h2 className="text-red-600 py-4 text-center text-2xl md:text-4xl font-bold">
        Something went wrong!
      </h2>
      <Button asChild>
        <Link href={"/builder"}>Go back to home</Link>
      </Button>
    </div>
  );
}

export default Error;
