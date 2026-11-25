import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 - 100
  indicatorColor?: string;
}

export function Progress({
  value = 0,
  className,
  indicatorColor = "bg-brand-500",
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-slate-800",
        className
      )}
      {...props}
    >
      <div
        className={cn("h-full w-full flex-1 transition-all duration-300 ease-in-out", indicatorColor)}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}
