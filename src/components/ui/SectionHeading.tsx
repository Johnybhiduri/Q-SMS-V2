import { cn } from "../../lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-[#11131a] sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[#5c6275] dark:text-[#9aa1b2]">
          {description}
        </p>
      )}
    </div>
  );
}
