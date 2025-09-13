import { cn } from "@/lib/utils";
import React from "react";

const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M12 2.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19Z" />
      <path d="m16 10-2 3-2-3" />
      <path d="m12 13 4 5" />
      <path d="m12 13-4 5" />
    </svg>
  );
};

export default Logo;
