import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div className={cn("w-full space-y-4", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab: value,
            onTabChange: onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({
  children,
  className,
  activeTab,
  onTabChange,
}: {
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  onTabChange?: (val: string) => void;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center justify-start rounded-lg bg-surface-muted p-1 text-slate-400 border border-slate-800",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab,
            onTabChange,
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  activeTab,
  onTabChange,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  onTabChange?: (val: string) => void;
}) {
  const isActive = activeTab === value;
  return (
    <button
      type="button"
      onClick={() => onTabChange && onTabChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-surface-elevated text-white shadow-sm border border-slate-700/60"
          : "text-slate-400 hover:text-slate-200",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
  activeTab,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
}) {
  if (activeTab !== value) return null;
  return <div className={cn("animate-in fade-in-50 duration-200", className)}>{children}</div>;
}
