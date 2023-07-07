import React from "react";

interface TooltipProps {
  title: string;
  children: HTMLBodyElement;
}

export default function Tooltip({ title, children }) {
  return (
    <div className="relative group inline-block z-10">
      {children}
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 right-2 left-5 transition bg-slate-500 text-xs text-white p-1 rounded absolute bottom-full mt-2">
        {title}
      </span>
    </div>
  );
}
