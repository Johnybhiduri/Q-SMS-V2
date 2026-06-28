import { Quote, Star } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-[#f5f6fa] py-20 sm:py-28 dark:bg-[#0d111a]">
      <Container>
        <SectionHeading
          eyebrow="Trusted by"
          title="Used a few thousand times a day"
          description="Mostly by developers testing OTP flows and marketers who'd rather not burn a real number."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-6 dark:bg-[#11161f]"
            >
              <Quote className="h-6 w-6 text-brand-300 dark:text-brand-500/40" strokeWidth={1.5} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#11131a] dark:text-white">
                "{t.quote}"
              </blockquote>
              <div className="mt-5 flex items-center justify-between border-t border-[#11131a]/6 pt-4 dark:border-white/6">
                <figcaption>
                  <p className="text-sm font-medium text-[#11131a] dark:text-white">{t.name}</p>
                  <p className="text-xs text-[#5c6275] dark:text-[#9aa1b2]">{t.role}</p>
                </figcaption>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-transparent text-[#11131a]/15 dark:text-white/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
