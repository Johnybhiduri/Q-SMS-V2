/**
 * Joins class names, filtering out falsy values.
 * Tiny typed replacement for `clsx` so we don't ship an extra dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
