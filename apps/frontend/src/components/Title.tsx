import React from "react";
import { cn } from "@/lib/utils";

const Title = ({
  text1,
  text2,
  className,
}: {
  text1: string;
  text2?: string;
  className?: string;
}) => {
  return (
    <div className={cn("inline-flex items-center gap-3 mb-4", className)}>
      <p className="font-marcellus text-2xl md:text-3xl text-foreground">
        {text1}
        {text2 && <span className="text-brand"> {text2}</span>}
      </p>
      <p className="w-8 sm:w-12 h-[1px] bg-brand"></p>
    </div>
  );
};

export default Title;
