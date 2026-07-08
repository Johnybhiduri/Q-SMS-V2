import { Antenna } from "lucide-react";
import { SiX, SiTelegram, SiGithub } from "react-icons/si";
import Container from "../ui/Container";
import { footerColumns } from "../../data/footerColumns";

const socialIcons = [SiX, SiTelegram, SiGithub];

// Define the links that should be disabled and show "Coming soon"
const comingSoonLinks = [
  "Affiliate program",
  "API documentation",
  "Become a supplier",
];

export default function Footer() {
  return (
    <footer className="border-t border-[#11131a]/8 bg-[#f5f6fa] dark:border-white/8 dark:bg-[#0d111a]">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Antenna className="h-4.5 w-4.5" strokeWidth={2.25} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-[#11131a] dark:text-white">
                Q-SMS
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5c6275] dark:text-[#9aa1b2]">
              Disposable virtual numbers for SMS verification. Built for
              developers, marketers, and anyone who'd rather not hand out
              their real phone number.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#11131a]/5 text-[#5c6275] transition-colors hover:bg-brand-600 hover:text-white dark:bg-white/5 dark:text-[#9aa1b2]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-sm font-semibold text-[#11131a] dark:text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => {
                    // Check if the current link is in the coming soon list
                    const isComingSoon = comingSoonLinks.includes(link.label);
                    
                    return (
                      <li key={link.label}>
                        <a
                          href={isComingSoon ? undefined : link.href}
                          onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
                          title={isComingSoon ? "Coming soon" : undefined}
                          className={`text-sm transition-colors ${
                            isComingSoon
                              ? "cursor-not-allowed text-[#5c6275] hover:text-[#5c6275] dark:text-[#9aa1b2] dark:hover:text-[#9aa1b2]"
                              : "text-[#5c6275] hover:text-brand-600 dark:text-[#9aa1b2] dark:hover:text-brand-400"
                          }`}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#11131a]/8 pt-6 text-xs text-[#5c6275] sm:flex-row dark:border-white/8 dark:text-[#9aa1b2]">
          <p>&copy; {new Date().getFullYear()} Q-SMS. All rights reserved.</p>
          <p>Private &middot; Secure &middot; Global</p>
        </div>
      </Container>
    </footer>
  );
}