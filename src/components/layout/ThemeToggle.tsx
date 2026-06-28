import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#11131a]/10 text-[#11131a] transition-colors hover:bg-[#11131a]/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 ${className}`}
    >
      <Sun
        className={`absolute h-[18px] w-[18px] transition-all duration-200 ${
          isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        strokeWidth={2}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-200 ${
          isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        strokeWidth={2}
      />
    </button>
  );
}
