/**
 * Dashboard.tsx — Q-SMS dashboard, single file.
 *
 * Guest mode : service catalogue visible (mock data), purchase requires sign-in.
 * Auth mode  : full features — balance, buy numbers, OTP polling, active numbers.
 *
 * No Redux. All state is local. Adjust import paths to match your project.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { IconType } from "react-icons";
import {
  FaAmazon, FaBitcoin, FaDiscord, FaEbay, FaFacebook, FaGoogle,
  FaInstagram, FaLine, FaMicrosoft, FaPaypal, FaSteam, FaTelegram,
  FaTicketAlt, FaUber, FaViber, FaWallet, FaWhatsapp, FaYahoo,
  FaGlobe, FaAt,
} from "react-icons/fa";
import {
  FaTiktok, FaXTwitter, FaVk, FaApple, FaSignalMessenger, FaTwitch, FaYandex,
} from "react-icons/fa6";
import { BsTencentQq } from "react-icons/bs";
import {
  TbBrandTinder, TbCircleLetterH, TbCircleLetterB,
  TbSquareRoundedLetterWFilled, TbBrandBumble,
} from "react-icons/tb";
import {
  SiCoinbase, SiFiverr, SiNaver, SiNike, SiOkcupid, SiAliexpress,
  SiAlibabacloud, SiClaude, SiGmx, SiProtonmail, SiQiwi,
  SiRevolut, SiSteemit, SiWise,
} from "react-icons/si";
import { MdOutlineCasino } from "react-icons/md";
import { AiOutlineOpenAI } from "react-icons/ai";
import { IoLogoWechat } from "react-icons/io5";
import {
  Antenna, Search, RefreshCw, ChevronDown, Copy, Check, ShieldCheck,
  CreditCard, LogOut, Settings, User, AlertTriangle, Zap, Lock, X,
  Activity, ArrowRight, Moon, Sun, Plus, type LucideIcon,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { cn } from "../lib/cn";
// ↓ Adjust to your project structure
import {
  getBalance, getActiveNumbers, getAvailableCountries,
  getCountryServices, getServiceNumbers, getSmsCode,
  setStatus as setNumberStatus, isApiError,
} from "../services/numberServices";
import { checkAuth } from "../services/authServices";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashService {
  code: string;
  name: string;
  icon: IconType;
  price: number;
  count: number;
  available: boolean;
}

interface DashNumber {
  idNum: string;
  tel: string;
  otp: string | null;
  serviceName: string;
  icon: IconType;
  expiresAt: string; // ISO string
  otpReceived: boolean;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

// ─── Service icon registry (name → icon) ─────────────────────────────────────
// Maps the service names returned by the API to a React icon component.

const SERVICE_ICONS: Record<string, IconType> = {
  Telegram: FaTelegram,
  WhatsApp: FaWhatsapp,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  Twitter: FaXTwitter,
  TikTok: FaTiktok,
  Discord: FaDiscord,
  Google: FaGoogle,
  Steam: FaSteam,
  PayPal: FaPaypal,
  Uber: FaUber,
  Viber: FaViber,
  Signal: FaSignalMessenger,
  Tinder: TbBrandTinder,
  WeChat: IoLogoWechat,
  "Line messenger": FaLine,
  Microsoft: FaMicrosoft,
  Amazon: FaAmazon,
  eBay: FaEbay,
  Ebay: FaEbay,
  Yahoo: FaYahoo,
  Apple: FaApple,
  Twitch: FaTwitch,
  "VK - MailRu": FaVk,
  Yandex: FaYandex,
  Hinge: TbCircleLetterH,
  Blizzard: TbCircleLetterB,
  Bumble: TbBrandBumble,
  VINTED: FaWallet,
  Wolt: TbSquareRoundedLetterWFilled,
  Coinbase: SiCoinbase,
  "Tencent QQ": BsTencentQq,
  "Casino Online": MdOutlineCasino,
  OpenAI: AiOutlineOpenAI,
  Claude: SiClaude,
  "GMX.com": SiGmx,
  Protonmail: SiProtonmail,
  "QIWI Wallet": SiQiwi,
  Revolut: SiRevolut,
  Wise: SiWise,
  Steemit: SiSteemit,
  AliExpress: SiAliexpress,
  Alibabacloud: SiAlibabacloud,
  Fiverr: SiFiverr,
  Naver: SiNaver,
  Nike: SiNike,
  OkCupid: SiOkcupid,
  "Ticketmaster.com": FaTicketAlt,
  Bitcoin: FaBitcoin,
  AOL: FaAt,
  Walmart: FaGlobe,
  Yalla: FaGlobe,
};

const FALLBACK_ICON: IconType = FaGlobe;

// ─── Mock services (guest / fallback) ────────────────────────────────────────

const MOCK_SERVICES: DashService[] = [
  { code: "tg",  name: "Telegram",    icon: FaTelegram,       price: 0.18, count: 482, available: true  },
  { code: "wa",  name: "WhatsApp",    icon: FaWhatsapp,       price: 0.42, count: 211, available: true  },
  { code: "ig",  name: "Instagram",   icon: FaInstagram,      price: 0.27, count: 360, available: true  },
  { code: "fb",  name: "Facebook",    icon: FaFacebook,       price: 0.22, count: 298, available: true  },
  { code: "tw",  name: "Twitter",     icon: FaXTwitter,       price: 0.31, count: 154, available: true  },
  { code: "dc",  name: "Discord",     icon: FaDiscord,        price: 0.19, count: 407, available: true  },
  { code: "go",  name: "Google",      icon: FaGoogle,         price: 0.55, count:  96, available: true  },
  { code: "ub",  name: "Uber",        icon: FaUber,           price: 0.38, count: 142, available: true  },
  { code: "pp",  name: "PayPal",      icon: FaPaypal,         price: 0.61, count:  88, available: true  },
  { code: "tt",  name: "TikTok",      icon: FaTiktok,         price: 0.24, count: 333, available: true  },
  { code: "st",  name: "Steam",       icon: FaSteam,          price: 0.29, count: 175, available: true  },
  { code: "tn",  name: "Tinder",      icon: TbBrandTinder,    price: 0.33, count: 121, available: false },
];

const DEFAULT_COUNTRIES: Record<string, string> = {
  Russia: "ru",
  "United States": "us",
  "United Kingdom": "uk",
  Germany: "de",
  France: "fr",
  India: "in",
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function calcTimer(expiresAt: string) {
  const norm = expiresAt.includes("Z") || expiresAt.includes("+") ? expiresAt : `${expiresAt}Z`;
  const diff = new Date(norm).getTime() - Date.now();
  if (diff <= 0) return { label: "00:00", pct: 0, expired: true, urgent: true };
  const m = Math.floor(diff / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  const pct = Math.min(100, (diff / (20 * 60_000)) * 100);
  return {
    label: `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    pct,
    expired: false,
    urgent: diff <= 60_000,
  };
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); } catch { /* silent */ }
}

function formatPhone(raw: string): string {
  const s = raw.trim();
  if (!s) return s;
  return s.startsWith("+") ? s : `+${s}`;
}

function toISO(val: unknown): string {
  if (!val) return new Date(Date.now() + 20 * 60_000).toISOString();
  if (val instanceof Date) return val.toISOString();
  const s = String(val);
  return s.includes("T") ? s : new Date(Date.now() + 20 * 60_000).toISOString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNumber(raw: any, fallbackIcon?: IconType): DashNumber {
  const name: string = raw.service_name ?? raw.serviceName ?? "Unknown";
  return {
    idNum: String(raw.idNum ?? raw.id_num ?? ""),
    tel: formatPhone(String(raw.tel ?? raw.num ?? "")),
    otp: raw.otp ?? null,
    serviceName: name,
    icon: fallbackIcon ?? SERVICE_ICONS[name] ?? FALLBACK_ICON,
    expiresAt: toISO(raw.expiresAt ?? raw.expires_at),
    otpReceived: Boolean(raw.otpReceived ?? raw.otp_received ?? false),
  };
}

// ─── Toast pill ───────────────────────────────────────────────────────────────

function ToastPill({ t, onDismiss }: { t: Toast; onDismiss: (id: string) => void }) {
  const COLORS = {
    success: "border-signal-500/30 bg-signal-50 text-signal-700 dark:bg-signal-400/10 dark:text-signal-400",
    error:   "border-red-300/60    bg-red-50    text-red-600   dark:border-red-500/30 dark:bg-red-500/10   dark:text-red-400",
    info:    "border-brand-300/60  bg-brand-50  text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-400",
  };
  return (
    <div className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-soft", COLORS[t.type])}>
      <span className="flex-1">{t.message}</span>
      <button onClick={() => onDismiss(t.id)} className="opacity-60 hover:opacity-100 transition-opacity">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label, value, icon: Icon, accent = false,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#11131a]/8 bg-white p-4 dark:border-white/8 dark:bg-[#11161f]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-[#5c6275] dark:text-[#9aa1b2]">{label}</p>
        <span className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg",
          accent
            ? "bg-signal-50 text-signal-600 dark:bg-signal-400/10 dark:text-signal-400"
            : "bg-brand-50  text-brand-600  dark:bg-brand-500/10  dark:text-brand-400"
        )}>
          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
      </div>
      <p className="mt-2.5 font-display text-2xl font-semibold text-[#11131a] dark:text-white">{value}</p>
    </div>
  );
}

// ─── Service row ──────────────────────────────────────────────────────────────

function ServiceRow({
  svc, purchasing, loggedIn, onBuy, onSignIn,
}: {
  svc: DashService;
  purchasing: boolean;
  loggedIn: boolean;
  onBuy: (svc: DashService) => void;
  onSignIn: () => void;
}) {
  const Icon = svc.icon;
  return (
    <div className={cn(
      "flex items-center gap-3 border-b border-[#11131a]/6 px-4 py-3 last:border-0",
      "transition-colors dark:border-white/6",
      svc.available && "hover:bg-[#11131a]/[0.02] dark:hover:bg-white/[0.02]",
      !svc.available && "opacity-50"
    )}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#11131a]/8 text-[#5c6275] dark:bg-white/8 dark:text-[#9aa1b2]">
        <Icon size={16} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[#11131a] dark:text-white">{svc.name}</p>
        <p className="text-xs text-[#5c6275] dark:text-[#9aa1b2]">
          {svc.available ? `${svc.count.toLocaleString()} available` : "Unavailable"}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <span className="hidden font-mono text-sm font-semibold text-signal-600 dark:text-signal-400 sm:inline">
          ${svc.price.toFixed(2)}
        </span>
        <button
          disabled={!svc.available || purchasing}
          onClick={() => (loggedIn ? onBuy(svc) : onSignIn())}
          className={cn(
            "min-w-[88px] rounded-xl px-3 py-1.5 text-center text-xs font-medium transition-colors",
            !svc.available
              ? "cursor-not-allowed bg-[#11131a]/5 text-[#5c6275] dark:bg-white/5 dark:text-[#9aa1b2]"
              : purchasing
                ? "bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400"
                : !loggedIn
                  ? "border border-[#11131a]/15 text-[#11131a] hover:bg-[#11131a]/5 dark:border-white/12 dark:text-white dark:hover:bg-white/5"
                  : "bg-brand-600 text-white hover:bg-brand-700"
          )}
        >
          {purchasing ? (
            <span className="flex items-center justify-center gap-1">
              <RefreshCw size={11} className="animate-spin" />Getting…
            </span>
          ) : !svc.available ? "N/A" : !loggedIn ? "Sign in" : "Get Number"}
        </button>
      </div>
    </div>
  );
}

// ─── Active number card ───────────────────────────────────────────────────────
// Self-managed 1 s timer — no tick prop needed from parent.

function NumberCard({
  num, updating, onStatus, onRefreshOTP,
}: {
  num: DashNumber;
  updating: boolean;
  onStatus: (idNum: string, status: string, action: "cancel" | "ban" | "more") => void;
  onRefreshOTP: (idNum: string) => void;
}) {
  // Forces a re-render every second for the countdown
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 1_000);
    return () => clearInterval(id);
  }, []);

  const [copied, setCopied] = useState<"tel" | "otp" | null>(null);
  const { label, pct, expired, urgent } = calcTimer(num.expiresAt);

  const isWaiting = !num.otpReceived && (num.otp === null || num.otp === "Waiting...");
  const hasOTP = num.otpReceived && !!num.otp;
  const Icon = num.icon;

  const handleCopy = async (field: "tel" | "otp", text: string) => {
    await copyText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 1_500);
  };

  return (
    <div className={cn(
      "number-card rounded-2xl border p-4 transition-colors",
      urgent
        ? "border-red-300/50 bg-red-50/40 dark:border-red-500/25 dark:bg-red-500/5"
        : hasOTP
          ? "border-signal-500/30 bg-signal-50/40 ring-1 ring-signal-500/10 dark:border-signal-400/20 dark:bg-signal-400/5"
          : "border-[#11131a]/8 bg-white dark:border-white/8 dark:bg-[#11161f]"
    )}>
      {/* Service + timer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#11131a]/8 text-[#5c6275] dark:bg-white/8 dark:text-[#9aa1b2]">
            <Icon size={14} />
          </span>
          <span className="text-sm font-medium text-[#11131a] dark:text-white">{num.serviceName}</span>
        </div>
        <span className={cn(
          "font-mono text-xs font-semibold rounded-lg px-2 py-0.5",
          expired ? "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
          : urgent  ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
          : "bg-[#11131a]/5 text-[#5c6275] dark:bg-white/5 dark:text-[#9aa1b2]"
        )}>
          {label}
        </span>
      </div>

      {/* Depleting timer bar */}
      <div className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-[#11131a]/6 dark:bg-white/6">
        <div
          className={cn("h-full rounded-full",
            expired || urgent ? "bg-red-500" : pct < 35 ? "bg-amber-400" : "bg-signal-500"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Phone number */}
      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-[#f5f6fa] px-3 py-2 dark:bg-[#0a0e16]">
        <span className="truncate font-mono text-sm text-[#11131a] dark:text-white">{num.tel}</span>
        <button
          onClick={() => handleCopy("tel", num.tel)}
          className="shrink-0 text-[#5c6275] transition-colors hover:text-brand-600 dark:text-[#9aa1b2] dark:hover:text-brand-400"
          aria-label="Copy number"
        >
          {copied === "tel"
            ? <Check size={14} className="text-signal-600 dark:text-signal-400" />
            : <Copy size={14} />}
        </button>
      </div>

      {/* OTP */}
      <div className="mt-3">
        <p className="mb-1 text-xs font-medium text-[#5c6275] dark:text-[#9aa1b2]">OTP Code</p>

        {isWaiting ? (
          <div className="flex items-center gap-2">
            <span className="animate-pulse font-mono text-xl font-bold text-[#5c6275] dark:text-[#9aa1b2]">
              Waiting…
            </span>
            <button
              onClick={() => onRefreshOTP(num.idNum)}
              disabled={updating}
              aria-label="Check for code"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#11131a]/10 bg-[#11131a]/[0.03] transition-colors hover:bg-[#11131a]/8 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/8"
            >
              <RefreshCw size={12} className={cn("text-[#5c6275] dark:text-[#9aa1b2]", updating && "animate-spin")} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className={cn(
              "font-mono text-2xl font-bold tracking-widest",
              expired    ? "text-[#5c6275] dark:text-[#9aa1b2]"
              : hasOTP   ? "text-signal-600 dark:text-signal-400"
              : "text-red-500"
            )}>
              {num.otp ?? "—"}
            </span>
            {hasOTP && (
              <button
                onClick={() => handleCopy("otp", num.otp!)}
                className={cn(
                  "rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
                  copied === "otp"
                    ? "border-signal-500/30 bg-signal-50 text-signal-700 dark:bg-signal-400/10 dark:text-signal-400"
                    : "border-[#11131a]/12 text-[#11131a] hover:bg-[#11131a]/5 dark:border-white/12 dark:text-white dark:hover:bg-white/5"
                )}
              >
                {copied === "otp" ? "Copied!" : "Copy OTP"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#11131a]/6 pt-3 dark:border-white/6">
        {!num.otpReceived ? (
          <>
            <button
              onClick={() => onStatus(num.idNum, "end", "cancel")}
              disabled={updating}
              className="rounded-xl border border-red-300/60 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              Cancel
            </button>
            <button
              onClick={() => onStatus(num.idNum, "bad", "ban")}
              disabled={updating}
              className="rounded-xl border border-red-300/60 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              Ban number
            </button>
          </>
        ) : (
          <button
            onClick={() => onStatus(num.idNum, "send", "more")}
            disabled={updating}
            className="rounded-xl border border-signal-500/30 px-3 py-1.5 text-xs font-medium text-signal-600 transition-colors hover:bg-signal-50 disabled:opacity-50 dark:text-signal-400 dark:hover:bg-signal-400/10"
          >
            Request more SMS
          </button>
        )}
        {updating && (
          <RefreshCw size={12} className="ml-auto animate-spin text-[#5c6275] dark:text-[#9aa1b2]" />
        )}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();

  // ── Auth ────────────────────────────────────────────────────────────────────
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState<UserInfo | null>(null);

  // ── Data ────────────────────────────────────────────────────────────────────
  const [balance, setBalance] = useState(0);
  const [countries, setCountries] = useState<Record<string, string>>(DEFAULT_COUNTRIES);
  const [selectedCountry, setSelectedCountry] = useState("Russia");
  const [services, setServices] = useState<DashService[]>(MOCK_SERVICES);
  const [numbers, setNumbers] = useState<DashNumber[]>([]);

  // ── Status ──────────────────────────────────────────────────────────────────
  const [loadingSvcs, setLoadingSvcs] = useState(false);
  const [svcsError, setSvcsError] = useState<string | null>(null);
  const [purchasingCodes, setPurchasingCodes] = useState<Set<string>>(new Set());
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  // ── UI ──────────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [mobileTab, setMobileTab] = useState<"services" | "numbers">("services");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Refs ────────────────────────────────────────────────────────────────────
  const menuRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<DashNumber[]>([]);
  // Map of idNum → interval id for OTP polling
  const pollingRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});
  // Stable refs for auto-refresh so the interval never re-registers
  const fetchSvcsRef = useRef<((country: string, silent?: boolean) => Promise<void>) | undefined>(undefined);
  const fetchNumsRef = useRef<(() => Promise<void>) | undefined>(undefined);

  // Keep numbersRef in sync
  useEffect(() => { numbersRef.current = numbers; }, [numbers]);

  // ── Toast helper ─────────────────────────────────────────────────────────────
  const toast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = uid();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4_000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  // ── OTP polling ──────────────────────────────────────────────────────────────
  const stopPolling = useCallback((idNum: string) => {
    if (pollingRef.current[idNum]) {
      clearInterval(pollingRef.current[idNum]);
      delete pollingRef.current[idNum];
    }
  }, []);

  const startPolling = useCallback((idNum: string, serviceName: string) => {
    stopPolling(idNum); // clear any existing
    const deadline = Date.now() + 3 * 60_000; // 3 min max
    pollingRef.current[idNum] = setInterval(async () => {
      if (Date.now() > deadline) { stopPolling(idNum); return; }
      const res = await getSmsCode(idNum).catch(() => null);
      if (!res || isApiError(res) || !res.code) return;
      stopPolling(idNum);
      setNumbers((prev) =>
        prev.map((n) => n.idNum === idNum ? { ...n, otp: res.code!, otpReceived: true } : n)
      );
      toast(`OTP received for ${serviceName}!`, "success");
    }, 5_000);
  }, [stopPolling, toast]);

  // Cleanup all polling on unmount
  useEffect(() => {
    return () => { Object.values(pollingRef.current).forEach(clearInterval); };
  }, []);

  // ── Fetch services ───────────────────────────────────────────────────────────
  const fetchServices = useCallback(async (countryName: string, showSpinner = true) => {
    const code = countries[countryName] ?? countryName.toLowerCase().slice(0, 2);
    if (showSpinner) setLoadingSvcs(true);
    setSvcsError(null);
    try {
      const res = await getCountryServices(code);
      if (isApiError(res)) { setSvcsError(res.error); return; }
      setServices(
        res.services.map((s) => ({
          code: s.code,
          name: s.name,
          icon: SERVICE_ICONS[s.name] ?? FALLBACK_ICON,
          price: s.price,
          count: s.quantity,
          available: s.quantity > 0,
        }))
      );
    } catch { setSvcsError("Failed to load services."); }
    finally { if (showSpinner) setLoadingSvcs(false); }
  }, [countries]);

  // ── Fetch active numbers ─────────────────────────────────────────────────────
  const fetchNumbers = useCallback(async () => {
    const res = await getActiveNumbers().catch(() => null);
    if (!res || isApiError(res)) return;
    setNumbers(res.numbers.map((n) => mapNumber(n)));
  }, []);

  // Keep the stable refs up to date
  useEffect(() => { fetchSvcsRef.current = fetchServices; }, [fetchServices]);
  useEffect(() => { fetchNumsRef.current = fetchNumbers; }, [fetchNumbers]);

  // ── Auth init ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loggedIn) return;
    (async () => {
      const token = localStorage.getItem("token") ?? "";
      try {
        const res = await checkAuth(token) as unknown as Record<string, unknown>;
        if (res && typeof res.email === "string") {
          setUser({
            firstName: String(res.first_name ?? ""),
            lastName:  String(res.last_name ?? ""),
            email: res.email,
            isVerified: Boolean(res.is_verified),
          });
        }
      } catch { setLoggedIn(false); }
    })();
  }, [loggedIn]);

  // ── Balance polling (30 s) ───────────────────────────────────────────────────
  useEffect(() => {
    if (!loggedIn) return;
    const fetchBal = async () => {
      const res = await getBalance().catch(() => null);
      if (res && !isApiError(res)) setBalance(res.balance);
    };
    fetchBal();
    const id = setInterval(fetchBal, 30_000);
    return () => clearInterval(id);
  }, [loggedIn]);

  // ── Countries (logged in) ────────────────────────────────────────────────────
  useEffect(() => {
    if (!loggedIn) return;
    getAvailableCountries()
      .then((res) => { if (!isApiError(res)) setCountries(res as Record<string, string>); })
      .catch(() => { /* keep defaults */ });
  }, [loggedIn]);

  // ── Load services on country change ─────────────────────────────────────────
  useEffect(() => {
    if (!loggedIn) return;
    fetchServices(selectedCountry);
  }, [loggedIn, selectedCountry, fetchServices]);

  // ── Load active numbers on login ─────────────────────────────────────────────
  useEffect(() => {
    if (!loggedIn) return;
    fetchNumbers();
  }, [loggedIn, fetchNumbers]);

  // ── Auto-refresh every 20 s (silent) ────────────────────────────────────────
  useEffect(() => {
    if (!loggedIn) return;
    const id = setInterval(() => {
      fetchSvcsRef.current?.(selectedCountry, false);
      fetchNumsRef.current?.();
    }, 20_000);
    return () => clearInterval(id);
  }, [loggedIn, selectedCountry]);

  // ── Close menu on outside click ──────────────────────────────────────────────
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handlePurchase = useCallback(async (svc: DashService) => {
    if (balance < svc.price) {
      toast("Insufficient balance. Please top up your account.", "error");
      return;
    }
    const code = countries[selectedCountry] ?? selectedCountry.toLowerCase().slice(0, 2);
    setPurchasingCodes((p) => new Set(p).add(svc.code));
    try {
      const res = await getServiceNumbers(svc.code, code);
      if (isApiError(res)) { toast(res.error, "error"); return; }
      const raw = res as unknown as Record<string, unknown>;
      const newNum: DashNumber = mapNumber({ ...raw, service_name: svc.name }, svc.icon);
      setNumbers((p) => [newNum, ...p]);
      if (typeof raw.balance === "number") setBalance(raw.balance);
      setMobileTab("numbers");
      fetchServices(selectedCountry, false); // refresh counts silently
      startPolling(newNum.idNum, svc.name);
      toast(`Number ready: ${newNum.tel}`, "success");
    } catch { toast("Purchase failed. Please try again.", "error"); }
    finally { setPurchasingCodes((p) => { const n = new Set(p); n.delete(svc.code); return n; }); }
  }, [balance, countries, selectedCountry, fetchServices, startPolling, toast]);

  const handleStatus = useCallback(async (
    idNum: string, status: string, action: "cancel" | "ban" | "more"
  ) => {
    setUpdatingIds((p) => new Set(p).add(idNum));
    try {
      const res = await setNumberStatus(status as "end" | "bad" | "ready", idNum);
      if (isApiError(res)) { toast(res.error, "error"); return; }
      if (action === "cancel" || action === "ban") {
        stopPolling(idNum);
        setNumbers((p) => p.filter((n) => n.idNum !== idNum));
        toast(action === "cancel" ? "Number cancelled." : "Number banned.", "info");
      } else {
        // More SMS — reset OTP and restart polling
        setNumbers((p) =>
          p.map((n) => n.idNum === idNum
            ? { ...n, otp: null, otpReceived: false, expiresAt: new Date(Date.now() + 20 * 60_000).toISOString() }
            : n
          )
        );
        const num = numbersRef.current.find((n) => n.idNum === idNum);
        if (num) startPolling(idNum, num.serviceName);
        toast("Waiting for another SMS…", "info");
      }
    } catch { toast("Action failed. Please try again.", "error"); }
    finally { setUpdatingIds((p) => { const n = new Set(p); n.delete(idNum); return n; }); }
  }, [stopPolling, startPolling, toast]);

  const handleRefreshOTP = useCallback(async (idNum: string) => {
    setUpdatingIds((p) => new Set(p).add(idNum));
    try {
      const res = await getSmsCode(idNum);
      if (isApiError(res)) { toast(res.error, "error"); return; }
      if (res.code) {
        stopPolling(idNum);
        setNumbers((p) => p.map((n) => n.idNum === idNum ? { ...n, otp: res.code!, otpReceived: true } : n));
        toast("OTP retrieved!", "success");
      } else {
        toast("No code yet — still waiting.", "info");
      }
    } catch { toast("Could not fetch OTP.", "error"); }
    finally { setUpdatingIds((p) => { const n = new Set(p); n.delete(idNum); return n; }); }
  }, [stopPolling, toast]);

  const handleLogout = useCallback(() => {
    Object.values(pollingRef.current).forEach(clearInterval);
    pollingRef.current = {};
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
    setBalance(0);
    setNumbers([]);
    setServices(MOCK_SERVICES);
    setMenuOpen(false);
  }, []);

  // ── Derived ──────────────────────────────────────────────────────────────────
  const filtered = useMemo(
    () => services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [services, search]
  );
  const pendingCount  = numbers.filter((n) => !n.otpReceived).length;
  const receivedCount = numbers.filter((n) =>  n.otpReceived).length;

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f5f6fa] dark:bg-[#0a0e16]">

      {/* ─── Header ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#11131a]/8 bg-white/80 backdrop-blur-md dark:border-white/8 dark:bg-[#0a0e16]/80">

        {/* Unverified banner */}
        {loggedIn && user && !user.isVerified && (
          <div className="flex items-center justify-between gap-3 border-b border-amber-200/60 bg-amber-50 px-5 py-2 dark:border-amber-500/20 dark:bg-amber-500/10">
            <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              Your email is not verified. Verify to unlock all features.
            </div>
            {/* Wire up your VerifyEmailModal here */}
            <button className="shrink-0 rounded-lg bg-amber-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-amber-500">
              Verify Email
            </button>
          </div>
        )}

        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Antenna className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-[#11131a] dark:text-white">
              Q-SMS
            </span>
          </a>

          <div className="flex items-center gap-2">
            {/* Balance chip */}
            {loggedIn && (
              <div className={cn(
                "hidden sm:flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-sm font-medium",
                balance <= 1
                  ? "border-red-300/60 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
                  : balance <= 3
                    ? "border-amber-300/60 bg-amber-50 text-amber-600 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400"
                    : "border-signal-500/30 bg-signal-50 text-signal-600 dark:bg-signal-400/10 dark:text-signal-400"
              )}>
                <CreditCard className="h-3.5 w-3.5" />
                ${balance.toFixed(2)}
              </div>
            )}

            {/* Top-up or auth CTAs */}
            {loggedIn ? (
              /* Wire up your TopUpModal by replacing the onClick below */
              <button
                onClick={() => toast("Top-up coming soon!", "info")}
                className="flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                <Plus className="h-3.5 w-3.5" /> Top Up
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <a href="/auth?mode=signin" className="hidden rounded-xl border border-[#11131a]/12 px-4 py-2 text-sm font-medium text-[#11131a] transition-colors hover:bg-[#11131a]/5 dark:border-white/12 dark:text-white dark:hover:bg-white/5 sm:inline-flex">
                  Log in
                </a>
                <a href="/auth?mode=signup" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700">
                  Sign up free
                </a>
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#11131a]/10 text-[#11131a] transition-colors hover:bg-[#11131a]/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* User dropdown */}
            {loggedIn && user && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-xl border border-[#11131a]/12 px-3 py-2 text-sm transition-colors hover:bg-[#11131a]/5 dark:border-white/12 dark:hover:bg-white/5"
                >
                  <User className="h-4 w-4 text-[#5c6275] dark:text-[#9aa1b2]" />
                  <span className="hidden text-[#11131a] dark:text-white md:inline">{user.firstName}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#5c6275] dark:text-[#9aa1b2]" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-[#11131a]/8 bg-white shadow-lift dark:border-white/8 dark:bg-[#11161f]">
                    <div className="border-b border-[#11131a]/6 px-4 py-3 dark:border-white/6">
                      <p className="text-sm font-medium text-[#11131a] dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#5c6275] dark:text-[#9aa1b2]">{user.email}</p>
                    </div>
                    <div className="p-2">
                      {/* Wire up your SettingsModal here */}
                      <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-[#11131a] transition-colors hover:bg-[#11131a]/5 dark:text-white dark:hover:bg-white/5">
                        <Settings className="h-4 w-4 text-[#5c6275] dark:text-[#9aa1b2]" /> Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" /> Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile balance strip */}
        {loggedIn && (
          <div className={cn(
            "flex items-center gap-2 border-t px-5 py-2 text-xs sm:hidden",
            balance <= 1
              ? "border-red-200/60 text-red-600 dark:border-red-500/20 dark:text-red-400"
              : balance <= 3
                ? "border-amber-200/60 text-amber-600 dark:border-amber-500/20 dark:text-amber-400"
                : "border-[#11131a]/6 text-[#5c6275] dark:border-white/6 dark:text-[#9aa1b2]"
          )}>
            <CreditCard className="h-3.5 w-3.5" /> Balance: ${balance.toFixed(2)}
          </div>
        )}
      </header>

      {/* ─── Page body ───────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-6 sm:px-6 lg:px-8">

        {/* Guest banner */}
        {!loggedIn && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-brand-200/60 bg-brand-50 px-5 py-4 dark:border-brand-500/20 dark:bg-brand-500/10">
            <div className="flex min-w-0 items-center gap-3">
              <Zap className="h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" />
              <div>
                <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Browsing as guest</p>
                <p className="text-xs text-brand-600/70 dark:text-brand-400/70">
                  Sign up free — no card required — to purchase numbers.
                </p>
              </div>
            </div>
            <a
              href="/signup"
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {/* Stats row */}
        {loggedIn && (
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <StatCard label="Balance"     value={`$${balance.toFixed(2)}`} icon={CreditCard} accent={balance > 3} />
            <StatCard label="Waiting OTP" value={String(pendingCount)}     icon={Activity}   accent={pendingCount > 0} />
            <StatCard label="Received"    value={String(receivedCount)}    icon={ShieldCheck} accent={receivedCount > 0} />
            <StatCard label="Total"       value={String(numbers.length)}   icon={Zap} />
          </div>
        )}

        {/* Mobile tabs */}
        <div className="mb-4 flex gap-1 rounded-xl border border-[#11131a]/8 bg-white p-1 lg:hidden dark:border-white/8 dark:bg-[#11161f]">
          {(["services", "numbers"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={cn(
                "flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-colors",
                mobileTab === tab
                  ? "bg-brand-600 text-white shadow-soft"
                  : "text-[#5c6275] hover:text-[#11131a] dark:text-[#9aa1b2] dark:hover:text-white"
              )}
            >
              {tab === "numbers"
                ? `My Numbers${numbers.length > 0 ? ` (${numbers.length})` : ""}`
                : "Browse Services"}
            </button>
          ))}
        </div>

        {/* ── 2-column layout ───────────────────────────────────────────────── */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">

          {/* ── Service browser ─────────────────────────────────────────── */}
          <div className={cn(
            "flex flex-col overflow-hidden rounded-2xl border border-[#11131a]/8 bg-white dark:border-white/8 dark:bg-[#11161f]",
            mobileTab !== "services" && "hidden lg:flex"
          )}>
            {/* Panel header */}
            <div className="shrink-0 border-b border-[#11131a]/6 px-4 py-3.5 dark:border-white/6">
              <p className="font-display text-sm font-semibold text-[#11131a] dark:text-white">
                Browse Services
              </p>
              {!loggedIn && (
                <p className="mt-0.5 text-xs text-[#5c6275] dark:text-[#9aa1b2]">
                  Sign in to purchase a number
                </p>
              )}
            </div>

            {/* Filters */}
            <div className="shrink-0 border-b border-[#11131a]/6 p-3 dark:border-white/6">
              <div className="flex gap-2">
                {/* Country selector */}
                <div className="relative min-w-0 flex-1">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    disabled={!loggedIn}
                    className="w-full appearance-none rounded-xl border border-[#11131a]/12 bg-[#f5f6fa] py-2 pl-3 pr-7 text-sm text-[#11131a] focus:border-brand-500 focus:outline-none disabled:opacity-60 dark:border-white/12 dark:bg-[#0a0e16] dark:text-white"
                  >
                    {Object.entries(countries).map(([name, code]) => (
                      <option key={code} value={name}>{name}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5c6275] dark:text-[#9aa1b2]" />
                </div>

                {/* Search */}
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5c6275] dark:text-[#9aa1b2]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search…"
                    className="w-full rounded-xl border border-[#11131a]/12 bg-[#f5f6fa] py-2 pl-8 pr-3 text-sm focus:border-brand-500 focus:outline-none dark:border-white/12 dark:bg-[#0a0e16] dark:text-white dark:placeholder:text-[#9aa1b2]/60"
                  />
                </div>

                {/* Refresh (logged in only) */}
                {loggedIn && (
                  <button
                    onClick={() => fetchServices(selectedCountry)}
                    disabled={loadingSvcs}
                    aria-label="Refresh services"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#11131a]/12 bg-[#f5f6fa] text-[#5c6275] transition-colors hover:bg-[#11131a]/8 disabled:opacity-50 dark:border-white/12 dark:bg-[#0a0e16] dark:text-[#9aa1b2]"
                  >
                    <RefreshCw className={cn("h-3.5 w-3.5", loadingSvcs && "animate-spin")} />
                  </button>
                )}
              </div>

              {/* Error */}
              {svcsError && (
                <div className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-red-300/60 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
                  <span>{svcsError}</span>
                  <button onClick={() => setSvcsError(null)} aria-label="Dismiss">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Service list */}
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "62vh" }}>
              {loadingSvcs ? (
                <div className="flex flex-col items-center gap-3 py-16 text-[#5c6275] dark:text-[#9aa1b2]">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <p className="text-sm">Loading services…</p>
                </div>
              ) : filtered.length === 0 ? (
                <p className="py-16 text-center text-sm text-[#5c6275] dark:text-[#9aa1b2]">
                  {search ? `No results for "${search}"` : "No services available."}
                </p>
              ) : (
                filtered.map((svc) => (
                  <ServiceRow
                    key={svc.code}
                    svc={svc}
                    purchasing={purchasingCodes.has(svc.code)}
                    loggedIn={loggedIn}
                    onBuy={handlePurchase}
                    onSignIn={() => { window.location.href = "/auth?mode=signin"; }}
                  />
                ))
              )}
            </div>
          </div>

          {/* ── Active numbers panel ─────────────────────────────────────── */}
          <div className={cn(
            "flex flex-col overflow-hidden rounded-2xl border border-[#11131a]/8 bg-white dark:border-white/8 dark:bg-[#11161f]",
            mobileTab !== "numbers" && "hidden lg:flex"
          )}>
            {/* Panel header */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#11131a]/6 px-4 py-3.5 dark:border-white/6">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-signal-600 dark:text-signal-400" />
                <p className="font-display text-sm font-semibold text-[#11131a] dark:text-white">
                  Active Numbers
                </p>
                {/* Pulsing dot while OTPs are pending */}
                {pendingCount > 0 && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                  </span>
                )}
              </div>
              {numbers.length > 0 && (
                <span className="rounded-full border border-signal-500/30 bg-signal-50 px-2 py-0.5 font-mono text-xs font-medium text-signal-600 dark:bg-signal-400/10 dark:text-signal-400">
                  {numbers.length}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: "62vh" }}>
              {!loggedIn ? (
                /* Guest: lock prompt */
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#11131a]/8 bg-[#f5f6fa] dark:border-white/8 dark:bg-[#0a0e16]">
                    <Lock className="h-6 w-6 text-[#5c6275] dark:text-[#9aa1b2]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#11131a] dark:text-white">Sign in to view your numbers</p>
                    <p className="mt-1 text-sm text-[#5c6275] dark:text-[#9aa1b2]">
                      Purchase numbers and receive OTP codes here.
                    </p>
                  </div>
                  <a
                    href="/signup"
                    className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                  >
                    Create free account <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ) : numbers.length === 0 ? (
                /* Logged in, no numbers yet */
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <ShieldCheck className="h-10 w-10 text-[#11131a]/10 dark:text-white/10" />
                  <p className="font-medium text-[#11131a] dark:text-white">No active numbers yet</p>
                  <p className="text-sm text-[#5c6275] dark:text-[#9aa1b2]">
                    Browse services on the left and get a number.
                  </p>
                </div>
              ) : (
                /* Number cards */
                <div className="space-y-3">
                  {numbers.map((num) => (
                    <NumberCard
                      key={num.idNum}
                      num={num}
                      updating={updatingIds.has(num.idNum)}
                      onStatus={handleStatus}
                      onRefreshOTP={handleRefreshOTP}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Toast container ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-5 right-5 z-50 flex w-[280px] flex-col gap-2 sm:w-72">
        {toasts.map((t) => (
          <ToastPill key={t.id} t={t} onDismiss={dismissToast} />
        ))}
      </div>

      {/* ─── Card entry animation ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes number-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .number-card { animation: number-in 0.25s ease-out; }
        @media (prefers-reduced-motion: reduce) { .number-card { animation: none; } }
      `}</style>
    </div>
  );
}
