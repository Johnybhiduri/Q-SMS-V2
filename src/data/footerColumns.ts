import type { FooterColumn } from "../types";

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Affiliate program", href: "/affiliate-program" },
      { label: "Become a supplier", href: "/become-supplier" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Receive SMS", href: "#services" },
      { label: "Pricing", href: "#services" },
      { label: "API documentation", href: "/api-documentation" },
      { label: "Status page", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms-of-services" },
      { label: "Acceptable use policy", href: "/acceptable-use-policy" },
      { label: "Refund policy", href: "/refund-policy" },
    ],
  },
  {
    title: "Safety",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Report abuse", href: "/report-abuse" },
      { label: "Support center", href: "/support" },
      { label: "Trust & security", href: "#" },
    ],
  },
];
