import { Users, ShoppingBag, Gamepad2, Wallet } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { services } from "../../data/services";
import type { CategoryGroup } from "../../types";

const groups: CategoryGroup[] = [
  {
    icon: Users,
    title: "Social & messaging",
    category: "Social",
    description: "Verify social, messaging, and dating apps in seconds.",
  },
  {
    icon: ShoppingBag,
    title: "Shopping & delivery",
    category: "Shopping",
    description: "Sign up for marketplaces, rides, and delivery apps without a real SIM.",
  },
  {
    icon: Gamepad2,
    title: "Gaming & entertainment",
    category: "Gaming",
    description: "Instant verification for gaming platforms and streaming accounts.",
  },
  {
    icon: Wallet,
    title: "Payments & accounts",
    category: "Payments",
    description: "Secure verification for payment systems and important accounts.",
  },
];

export default function SupportedCategories() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Coverage"
          title="One number, hundreds of services"
          description="Every plan covers the same catalogue — pricing only changes with the service, not the category."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {groups.map((group) => {
            const icons = services.filter((s) => s.category === group.category).slice(0, 6);
            return (
              <div
                key={group.title}
                className="rounded-2xl border border-[#11131a]/8 bg-white p-6 dark:border-white/8 dark:bg-[#11161f]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                    <group.icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#11131a] dark:text-white">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#5c6275] dark:text-[#9aa1b2]">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-[#11131a]/6 pt-5 dark:border-white/6">
                  {icons.map((s) => {
                    const Icon = s.icon;
                    return (
                      <span
                        key={s.id}
                        title={s.name}
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${s.color}1A` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: s.color }} />
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
