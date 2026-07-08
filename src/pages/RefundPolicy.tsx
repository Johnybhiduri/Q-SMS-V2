export default function RefundPolicy() {
  return (
    <main className="w-full bg-white dark:bg-[#0a0e16]">
      <div className="mx-auto max-w-5xl px-4 py-20">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#11131a] dark:text-white">
            Refund Policy
          </h1>
          <p className="mt-4 text-sm text-[#5c6275] dark:text-[#9aa1b2]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>
        {/* Content */}
        <section className="space-y-10 text-sm sm:text-base leading-relaxed">
          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            This Refund Policy outlines the conditions under which refunds may
            be issued for services provided by Q-SMS. By using our platform,
            you agree to the terms described below.
          </p>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Prepaid Balance
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS operates on a prepaid balance system. Once funds are added
              to your account, they are generally non-refundable unless
              explicitly stated otherwise in this policy.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Virtual Number Usage
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Refunds are not provided for virtual numbers that have been
              successfully delivered or used, regardless of whether a
              third-party service accepts the number. Q-SMS does not guarantee
              compatibility with any specific platform.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Failed or Undelivered Numbers
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              In cases where a virtual number is not delivered or does not
              receive any message due to a platform-side issue, Q-SMS may
              issue a balance credit or refund at its discretion.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Abuse and Policy Violations
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Accounts suspended or terminated due to violations of our Terms
              of Service or Acceptable Use Policy are not eligible for refunds.
              Any remaining balance may be forfeited.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Payment Method Limitations
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Refunds, if approved, will be processed using the original
              payment method where possible. Certain payment methods,
              including cryptocurrency, may be non-refundable.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Contacting Support
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              If you believe you are eligible for a refund under this policy,
              you may contact our support team at{" "}
              <a
                href="mailto:support@q-sms.store"
                className="text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 underline decoration-brand-600/30 dark:decoration-brand-400/30"
              >
                support@q-sms.store
              </a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}