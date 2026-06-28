import type { FooterColumn } from "../types";

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Affiliate program", href: "#" },
      { label: "Become a supplier", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Receive SMS", href: "#services" },
      { label: "Pricing", href: "#services" },
      { label: "API documentation", href: "#" },
      { label: "Status page", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Acceptable use policy", href: "#" },
      { label: "Refund policy", href: "#" },
    ],
  },
  {
    title: "Safety",
    links: [
      { label: "Report abuse", href: "#" },
      { label: "Support center", href: "#" },
      { label: "Trust & security", href: "#" },
    ],
  },
];
