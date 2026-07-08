import { useState, useEffect } from "react";
import { Menu, X, Antenna } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import ThemeToggle from "./ThemeToggle";
import { navLinks } from "../../data/navLinks";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu automatically if the viewport is resized to desktop
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled
          ? "border-[#11131a]/8 bg-white/80 backdrop-blur-md dark:border-white/8 dark:bg-[#0a0e16]/80"
          : "border-transparent bg-white dark:bg-[#0a0e16]"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Antenna className="h-4.5 w-4.5" strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-[#11131a] dark:text-white">
            Q-SMS
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-[#5c6275] transition-colors hover:bg-[#11131a]/[0.04] hover:text-[#11131a] dark:text-[#9aa1b2] dark:hover:bg-white/5 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button as="a" href="/auth?mode=signin" variant="ghost" size="sm">
            Log in
          </Button>
          <Button as="a" href="/auth?mode=signup" variant="primary" size="sm">
            Get a number
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#11131a] hover:bg-[#11131a]/5 dark:text-white dark:hover:bg-white/10"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-[#11131a]/8 bg-white px-5 pb-5 pt-2 md:hidden dark:border-white/8 dark:bg-[#0a0e16]">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#5c6275] hover:bg-[#11131a]/[0.04] hover:text-[#11131a] dark:text-[#9aa1b2] dark:hover:bg-white/5 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-[#11131a]/8 pt-4 dark:border-white/8">
            <Button as="a" href="#login" variant="outline" size="md">
              Log in
            </Button>
            <Button as="a" href="#signup" variant="primary" size="md">
              Get a number
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
