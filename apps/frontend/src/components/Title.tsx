import React from "react";

const Title = ({ text1, text2 }: { text1: string; text2?: string }) => {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <p className="">
        {text1}
        &nbsp;
        {text2 && <span className="font-medium ">{text2}</span>}
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-amber-600"></p>
    </div>
  );
};

export default Title;
