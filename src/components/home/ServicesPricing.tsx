import { useMemo, useState, type ChangeEvent } from "react";
import { Search, ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";
import { cn } from "../../lib/cn";
import { services, categories } from "../../data/services";
import type { ServiceCategory } from "../../types";

type CategoryFilter = ServiceCategory | "All";

export default function ServicesPricing() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const matchesQuery = s.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  return (
    <section id="services" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Pay only for the number you need"
          description="No subscription, no bundles you won't use. Top up your balance and spend it one verification at a time."
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5c6275] dark:text-[#9aa1b2]" />
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search a service…"
              className="w-full rounded-xl border border-[#11131a]/12 bg-white py-2.5 pl-10 pr-4 text-sm text-[#11131a] placeholder:text-[#5c6275]/70 focus:border-brand-500 dark:border-white/12 dark:bg-[#11161f] dark:text-white dark:placeholder:text-[#9aa1b2]/60"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  category === cat
                    ? "bg-brand-600 text-white"
                    : "bg-[#11131a]/[0.05] text-[#5c6275] hover:bg-[#11131a]/[0.08] dark:bg-white/5 dark:text-[#9aa1b2] dark:hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group flex items-center gap-4 rounded-2xl border border-[#11131a]/8 bg-white p-4 transition-shadow hover:shadow-soft sm:p-5 dark:border-white/8 dark:bg-[#11161f]"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: service.color }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#11131a] dark:text-white">
                    {service.name}
                  </p>
                  <p className="text-xs text-[#5c6275] dark:text-[#9aa1b2]">
                    {service.stock} numbers in stock
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-sm font-semibold text-[#11131a] dark:text-white">
                    from ${service.price.toFixed(2)}
                  </p>
                  <a
                    href="#signup"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-600 group-hover:gap-1.5 dark:text-brand-400"
                  >
                    Get number <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-[#5c6275] dark:text-[#9aa1b2]">
              No services match "{query}" in {category}. Try a different search.
            </p>
          )}
        </div>

        <div className="mt-10 text-center">
          <Button as="a" href="#" variant="outline" size="md">
            Browse all 400+ services
          </Button>
        </div>
      </Container>
    </section>
  );
}
