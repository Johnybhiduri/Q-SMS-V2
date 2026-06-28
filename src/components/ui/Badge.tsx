import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type BadgeTone = "neutral" | "brand" | "signal";

interface BadgeProps {
  icon?: LucideIcon;
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-[#11131a]/[0.04] text-[#11131a] dark:bg-white/5 dark:text-white",
  brand: "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300",
  signal: "bg-signal-50 text-signal-600 dark:bg-signal-400/10 dark:text-signal-400",
};

export default function Badge({ icon: Icon, children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        TONES[tone],
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />}
      {children}
    </span>
  );
}
