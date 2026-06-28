import type { ElementType, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Centers content with consistent max-width and horizontal padding
 * across every breakpoint. Use this instead of repeating the same
 * "max-w-7xl mx-auto px-4..." string in every section.
 */
export default function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
