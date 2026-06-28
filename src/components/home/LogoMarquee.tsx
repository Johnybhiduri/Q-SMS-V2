import type { IconType } from "react-icons";
import { services } from "../../data/services";
import { paymentMethods } from "../../data/payments";

interface StripItem {
  name: string;
  icon: IconType;
}

const STRIP: StripItem[] = [...services, ...paymentMethods.slice(0, 4)];

export default function LogoMarquee() {
  return (
    <section className="border-y border-[#11131a]/8 bg-[#f5f6fa] py-8 dark:border-white/8 dark:bg-[#0d111a]">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-[#5c6275] dark:text-[#9aa1b2]">
        Works with the platforms you already use
      </p>

      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 animate-marquee items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
          >
            {STRIP.map((item, i) => {
              const Icon = item.icon;
              return (
                <Icon
                  key={`${item.name}-${dup}-${i}`}
                  className="h-6 w-auto shrink-0 text-[#5c6275]/70 transition-colors dark:text-[#9aa1b2]/60"
                  title={item.name}
                />
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee { animation: marquee 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
