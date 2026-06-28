import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

export type ServiceCategory = "Social" | "Gaming" | "Shopping" | "Payments";

export interface Service {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  category: ServiceCategory;
  price: number;
  stock: number;
}

export interface PaymentMethod {
  name: string;
  icon: IconType;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CategoryGroup {
  icon: LucideIcon;
  title: string;
  category: ServiceCategory;
  description: string;
}

export type Theme = "light" | "dark";
