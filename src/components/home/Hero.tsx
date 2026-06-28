import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ShieldCheck, Globe2, Zap, type LucideIcon } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { services } from "../../data/services";
import type { Service } from "../../types";

interface FeedMessage extends Service {
  code: string;
  key: string;
}

interface StatItem {
  icon: LucideIcon;
  label: string;
}

const FEED_SOURCE = services.slice(0, 8);

function makeCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const STATS: StatItem[] = [
  { icon: Globe2, label: "180+ countries" },
  { icon: Zap, label: "Codes in ~5 sec" },
  { icon: ShieldCheck, label: "No card required" },
];

export default function Hero() {
  // Rolling window of "incoming" messages for the live inbox card.
  const initialFeed = useMemo<FeedMessage[]>(
    () => FEED_SOURCE.slice(0, 4).map((s) => ({ ...s, code: makeCode(), key: `${s.id}-0` })),
    []
  );
  const [feed, setFeed] = useState<FeedMessage[]>(initialFeed);
  const [cursor, setCursor] = useState(4);

  useEffect(() => {
    const id = setInterval(() => {
      const next = FEED_SOURCE[cursor % FEED_SOURCE.length];
      setFeed((prev) => {
        const updated: FeedMessage[] = [
          { ...next, code: makeCode(), key: `${next.id}-${cursor}` },
          ...prev,
        ];
        return updated.slice(0, 4);
      });
      setCursor((c) => c + 1);
    }, 2600);
    return () => clearInterval(id);
  }, [cursor]);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0a0e16]">
      {/* Soft ambient grid backdrop — CSS only, no images */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(17 19 26 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(17 19 26 / 0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <Container className="relative grid items-center gap-16 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#11131a]/10 bg-[#11131a]/[0.03] px-3 py-1 font-mono text-xs text-[#5c6275] dark:border-white/10 dark:bg-white/5 dark:text-[#9aa1b2]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-500" />
            </span>
            500K+ numbers issued today
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#11131a] sm:text-5xl lg:text-[3.4rem] dark:text-white">
            Receive SMS codes <br className="hidden sm:block" />
            without your real number.
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#5c6275] dark:text-[#9aa1b2]">
            Rent a virtual number in seconds, verify any account, and let the
            number go. No SIM card, no contract, no spam calls afterward.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="#services" size="lg">
              Get your number <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#how-it-works" variant="outline" size="lg">
              See how it works
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[#11131a]/8 pt-6 dark:border-white/8">
            {STATS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" strokeWidth={2.25} />
                <span className="text-xs font-medium text-[#5c6275] sm:text-sm dark:text-[#9aa1b2]">
                  {label}
                </span>
              </div>
            ))}
          </dl>
        </div>

        {/* Signature element: a live, ticking inbox of incoming codes */}
        <div className="relative">
          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-[#11131a]/8 bg-white p-1.5 shadow-lift dark:border-white/10 dark:bg-[#11161f]">
            <div className="flex items-center justify-between px-3.5 py-3">
              <span className="font-display text-sm font-semibold text-[#11131a] dark:text-white">
                Live inbox
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-signal-600 dark:text-signal-400">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-500" />
                live
              </span>
            </div>

            <div className="flex flex-col gap-1.5 p-1.5">
              {feed.map((msg) => {
                const Icon = msg.icon;
                return (
                  <div
                    key={msg.key}
                    className="feed-row flex items-center gap-3 rounded-xl border border-[#11131a]/6 bg-[#f5f6fa] px-3 py-3 dark:border-white/6 dark:bg-[#161b26]"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: msg.color }}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#11131a] dark:text-white">
                        {msg.name}
                      </p>
                      <p className="truncate text-xs text-[#5c6275] dark:text-[#9aa1b2]">
                        Your code is{" "}
                        <span className="font-mono font-medium text-[#11131a] dark:text-white">
                          {msg.code}
                        </span>
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-[#5c6275] dark:text-[#9aa1b2]">
                      now
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            aria-hidden
            className="absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2rem] bg-brand-500/[0.06] blur-2xl dark:bg-brand-400/10"
          />
        </div>
      </Container>

      <style>{`
        @keyframes feedIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .feed-row { animation: feedIn 0.35s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .feed-row { animation: none; }
        }
      `}</style>
    </section>
  );
}
