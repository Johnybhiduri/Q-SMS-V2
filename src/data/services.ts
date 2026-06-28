import {
  SiTelegram,
  SiWhatsapp,
  SiInstagram,
  SiFacebook,
  SiX,
  SiDiscord,
  SiGoogle,
  SiUber,
  SiPaypal,
  SiTiktok,
  SiSteam,
  SiTinder,
} from "react-icons/si";
import type { Service, ServiceCategory } from "../types";

/**
 * Sample catalogue for the pricing grid. Replace `price` / `stock`
 * with live values from your backend once the API is wired up —
 * the UI only cares about this shape.
 */
export const services: Service[] = [
  { id: "telegram", name: "Telegram", icon: SiTelegram, color: "#26A5E4", category: "Social", price: 0.18, stock: 482 },
  { id: "whatsapp", name: "WhatsApp", icon: SiWhatsapp, color: "#25D366", category: "Social", price: 0.42, stock: 211 },
  { id: "instagram", name: "Instagram", icon: SiInstagram, color: "#E1306C", category: "Social", price: 0.27, stock: 360 },
  { id: "facebook", name: "Facebook", icon: SiFacebook, color: "#1877F2", category: "Social", price: 0.22, stock: 298 },
  { id: "x", name: "X (Twitter)", icon: SiX, color: "#0F1419", category: "Social", price: 0.31, stock: 154 },
  { id: "discord", name: "Discord", icon: SiDiscord, color: "#5865F2", category: "Gaming", price: 0.19, stock: 407 },
  { id: "google", name: "Google", icon: SiGoogle, color: "#4285F4", category: "Payments", price: 0.55, stock: 96 },
  { id: "uber", name: "Uber", icon: SiUber, color: "#000000", category: "Shopping", price: 0.38, stock: 142 },
  { id: "paypal", name: "PayPal", icon: SiPaypal, color: "#003087", category: "Payments", price: 0.61, stock: 88 },
  { id: "tiktok", name: "TikTok", icon: SiTiktok, color: "#000000", category: "Social", price: 0.24, stock: 333 },
  { id: "steam", name: "Steam", icon: SiSteam, color: "#1B2838", category: "Gaming", price: 0.29, stock: 175 },
  { id: "tinder", name: "Tinder", icon: SiTinder, color: "#FE3C72", category: "Social", price: 0.33, stock: 121 },
];

export const categories: Array<ServiceCategory | "All"> = [
  "All",
  "Social",
  "Gaming",
  "Shopping",
  "Payments",
];
