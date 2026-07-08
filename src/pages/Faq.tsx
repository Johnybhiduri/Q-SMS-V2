type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How can I sign up or log in to Q-SMS?",
    answer: "You can sign up or log in using your Google account or register using any valid email address. No personal phone number is required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept multiple payment methods including cryptocurrency, PayPal, Payoneer, and other supported options visible at checkout.",
  },
  {
    question: "What is the minimum top-up amount?",
    answer: "The minimum top-up amount on Q-SMS is $1.",
  },
  {
    question: "Is there a daily limit on buying numbers?",
    answer: "No. There is no daily limit on purchasing numbers as long as sufficient balance is available.",
  },
  {
    question: "Are payments secure?",
    answer: "Yes. All payments are processed through trusted providers and Q-SMS does not store sensitive payment details.",
  },
  {
    question: "Can I get a refund after topping up?",
    answer: "No. All balance top-ups are final and non-refundable.",
  },
  {
    question: "Will I be charged if OTP is not received?",
    answer: "No. If an OTP is not received, your balance will not be deducted.",
  },
  {
    question: "What if OTP is received but account creation fails?",
    answer: "If an OTP is received but the third-party platform fails, Q-SMS is not responsible and charges apply.",
  },
  {
    question: "Can one number receive multiple OTPs?",
    answer: "Yes. A number can receive multiple OTPs within its active time window.",
  },
  {
    question: "What is the time limit for a number?",
    answer: "Each number remains active for up to 20 minutes unless otherwise specified.",
  },
  {
    question: "What happens if I cancel a number?",
    answer: "If canceled before receiving an OTP, no charges apply.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We collect minimal data and follow strict security practices to protect user information.",
  },
  {
    question: "Do you provide support?",
    answer: "Yes. Support is available via Discord, Telegram, email, and AI chat agents 24/7.",
  },
  {
    question: "Can accounts be suspended?",
    answer: "Yes. Accounts violating our policies may be suspended or terminated without refund.",
  },
  {
    question: "Is Q-SMS legal?",
    answer: "Q-SMS is a legitimate platform. Users are responsible for complying with local laws and third-party terms.",
  },
];

export default function FAQ() {
  return (
    <main className="relative z-20 w-full bg-white dark:bg-[#0a0e16]">
      <div className="mx-auto max-w-5xl px-4 py-20">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#11131a] dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-[#5c6275] dark:text-[#9aa1b2] max-w-2xl">
            Answers to common questions about Q-SMS, payments, and virtual
            numbers.
          </p>
        </header>
        {/* FAQ */}
        <section className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-[#11131a]/10 bg-[#f5f6fa] px-5 py-4 dark:border-white/10 dark:bg-[#11161f]"
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between text-[#11131a] font-medium dark:text-white"
              >
                {faq.question}
                <span
                  className="ml-4 text-xl text-[#5c6275] transition group-open:rotate-45 dark:text-[#9aa1b2]"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5c6275] dark:text-[#9aa1b2]">
                {faq.answer}
              </p>
            </details>
          ))}
        </section>
      </div>
    </main>
  );
}