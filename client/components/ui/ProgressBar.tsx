import React from "react";

type ProgressBarProps = {
  className?: string;
  label?: string;
};

export default function ProgressBar({ className = "", label }: ProgressBarProps) {
  return (
    <div className={`w-full h-2 rounded-full bg-slate-200 overflow-hidden ${className}`} aria-label={label} role={label ? "progressbar" : undefined}>
      <div className="h-full w-1/2 rounded-full bg-slate-400 animate-pulse" />
    </div>
  );
}
