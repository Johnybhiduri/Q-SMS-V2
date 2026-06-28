import { ShieldCheck, Zap, Globe2, RefreshCw, Lock, Timer } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import type { FeatureItem } from "../../types";

const features: FeatureItem[] = [
  {
    icon: ShieldCheck,
    title: "Your real number stays private",
    description: "Never hand your personal number to another app or marketplace again.",
  },
  {
    icon: Zap,
    title: "Codes arrive in seconds",
    description: "Built on infrastructure that delivers most codes in under ten seconds.",
  },
  {
    icon: Globe2,
    title: "180+ countries",
    description: "Pick a local number from almost anywhere a service requires verification.",
  },
  {
    icon: RefreshCw,
    title: "Reuse numbers and save",
    description: "Verify the same service again on a number you've already used, for less.",
  },
  {
    icon: Lock,
    title: "Encrypted, logged-out by default",
    description: "Messages are scoped to your account only and purged on a schedule.",
  },
  {
    icon: Timer,
    title: "No subscription",
    description: "Top up once, spend it whenever. Nothing renews without you asking it to.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f5f6fa] py-20 sm:py-28 dark:bg-[#0d111a]">
      <Container>
        <SectionHeading
          eyebrow="Why Q-SMS"
          title="Built for people who verify accounts often"
          description="Whether it's one signup or a hundred a day, the experience stays the same: fast, private, predictable."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-white p-6 dark:bg-[#11161f]">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <f.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-[#11131a] dark:text-white">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5c6275] dark:text-[#9aa1b2]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
