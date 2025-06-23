import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-md hover:bg-primary/80 hover:shadow-lg",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 hover:shadow-lg",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/80 hover:shadow-lg",
        outline:
          "text-foreground border-2 hover:bg-accent hover:text-accent-foreground",
        gradient:
          "border-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-blue-600 hover:to-purple-600 hover:shadow-lg",
        "gradient-secondary":
          "border-transparent bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md hover:from-green-600 hover:to-blue-600 hover:shadow-lg",
        "gradient-accent":
          "border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:from-orange-600 hover:to-red-600 hover:shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
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
