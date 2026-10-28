import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-green-100 text-green-800 border border-green-200/80",
        secondary:
          "bg-slate-100 text-slate-700 border border-slate-200",
        destructive:
          "bg-rose-100 text-rose-800 border border-rose-200",
        outline:
          "text-slate-800 border border-slate-200",
        amber:
          "bg-amber-100 text-amber-800 border border-amber-200",
        orange:
          "bg-orange-100 text-orange-800 border border-orange-200",
        blue:
          "bg-blue-100 text-blue-800 border border-blue-200",
        purple:
          "bg-purple-100 text-purple-800 border border-purple-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
