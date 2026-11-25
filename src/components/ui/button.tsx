import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 hover:brightness-110 active:brightness-95 font-semibold",
        purplePill:
          "bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold shadow-lg shadow-purple-600/30",
        whitePill:
          "bg-white hover:bg-slate-100 text-[#0F0E1E] rounded-full font-bold shadow-md",
        outline:
          "border border-purple-500/30 bg-[#121124]/60 text-slate-200 hover:bg-[#1A1735] hover:text-white hover:border-purple-500/50",
        secondary:
          "bg-[#1A1735] text-slate-200 shadow-sm hover:bg-[#231F46] hover:text-white border border-purple-900/40",
        ghost:
          "text-slate-300 hover:bg-[#1A1735] hover:text-white",
        link: "text-purple-400 underline-offset-4 hover:underline",
        ntaGreen:
          "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm font-semibold",
        ntaPurple:
          "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-sm font-semibold",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3.5 text-xs",
        lg: "h-11 rounded-xl px-7 text-base",
        pill: "h-10 rounded-full px-6 text-xs font-semibold",
        pillSm: "h-8 rounded-full px-4 text-xs font-semibold",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
