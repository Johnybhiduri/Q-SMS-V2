import { ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-8 py-14 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 0%, transparent 35%), radial-gradient(circle at 80% 80%, white 0%, transparent 35%)",
            }}
          />
          <h2 className="relative font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Your next verification is a number away
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-balance text-sm text-white/80 sm:text-base">
            No card required to get started. Top up when you're ready to receive your first code.
          </p>
          <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as="a" href="#signup" variant="secondary" size="lg" className="bg-white text-brand-700 hover:bg-white/90">
              Create free account <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
