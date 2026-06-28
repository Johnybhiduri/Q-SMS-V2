import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-soft hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "bg-[#11131a]/[0.04] text-[#11131a] hover:bg-[#11131a]/[0.08] dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
  outline:
    "border border-[#11131a]/15 text-[#11131a] hover:border-[#11131a]/30 hover:bg-[#11131a]/[0.03] dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/5",
  ghost:
    "text-[#11131a] hover:bg-[#11131a]/[0.05] dark:text-white dark:hover:bg-white/10",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[15px]",
};

interface ButtonOwnProps<T extends ElementType> {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}

type ButtonProps<T extends ElementType = "button"> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

/**
 * Polymorphic: pass `as="a" href="..."` to render a link
 * that looks identical to a <button>.
 */
export default function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Tag = as || "button";

  return (
    <Tag
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-150 whitespace-nowrap",
        "disabled:opacity-50 disabled:pointer-events-none",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
