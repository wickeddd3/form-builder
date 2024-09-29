import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/builder"}
      className="font-bold text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text hover:cursor-pointer"
    >
      FORM BUILDER
    </Link>
  );
}

export default Logo;
