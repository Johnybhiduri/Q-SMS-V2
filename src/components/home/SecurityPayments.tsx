import { Lock } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { paymentMethods } from "../../data/payments";

export default function SecurityPayments() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 rounded-3xl border border-[#11131a]/8 bg-white p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] dark:border-white/8 dark:bg-[#11161f]">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-50 text-signal-600 dark:bg-signal-400/10 dark:text-signal-400">
              <Lock className="h-5 w-5" strokeWidth={2} />
            </span>
            <SectionHeading
              eyebrow="Secure payments"
              title="Encrypted checkout, your choice of currency"
              description="Card, PayPal, or crypto — pick whatever you'd rather use. Every transaction runs through PCI-compliant providers, and we never store full card details."
              align="left"
              className="mt-4 max-w-none"
            />
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                title={method.name}
                className="flex h-16 items-center justify-center rounded-xl border border-[#11131a]/8 bg-[#f5f6fa] dark:border-white/8 dark:bg-[#0d111a]"
              >
                <method.icon className="h-6 w-6 text-[#5c6275] dark:text-[#9aa1b2]" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
