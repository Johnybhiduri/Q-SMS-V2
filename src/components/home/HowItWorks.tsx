import { MousePointerClick, Smartphone, Inbox } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import type { HowItWorksStep } from "../../types";

const steps: HowItWorksStep[] = [
  {
    icon: MousePointerClick,
    title: "Choose a service & country",
    description:
      "Search the service you're verifying — Telegram, Instagram, Uber, whatever it is — and pick which country the number should come from.",
  },
  {
    icon: Smartphone,
    title: "Get a number instantly",
    description:
      "Your virtual number is issued the moment you pay. No waiting on activation, no porting, no physical SIM to track down.",
  },
  {
    icon: Inbox,
    title: "Receive the code",
    description:
      "Enter the number wherever it's asked for. The SMS lands in your Q-SMS inbox within seconds — copy the code and you're verified.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From search to code in under a minute"
          description="Three steps, no account verification loops, no recurring plan to remember to cancel."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-[#11131a]/8 bg-white p-6 dark:border-white/8 dark:bg-[#11161f]"
            >
              <span className="font-mono text-xs text-[#5c6275]/70 dark:text-[#9aa1b2]/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                <step.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#11131a] dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c6275] dark:text-[#9aa1b2]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
