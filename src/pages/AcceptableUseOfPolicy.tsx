export default function AcceptableUsePolicy() {
  return (
    <main className="w-full bg-white dark:bg-[#0a0e16]">
      <div className="mx-auto max-w-5xl px-4 py-20">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#11131a] dark:text-white">
            Acceptable Use Policy
          </h1>
          <p className="mt-4 text-sm text-[#5c6275] dark:text-[#9aa1b2]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>
        {/* Content */}
        <section className="space-y-10 text-sm sm:text-base leading-relaxed">
          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            This Acceptable Use Policy (“AUP”) defines the permitted and
            prohibited uses of the Q-SMS platform. By accessing or using Q-SMS,
            you agree to comply with this policy in addition to our Terms of
            Service and Privacy Policy.
          </p>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Intended Use
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS provides virtual phone numbers for legitimate verification
              purposes, including receiving one-time passwords (OTP) and
              service-related messages from third-party platforms. The service
              is intended to support privacy-conscious users while complying
              with applicable laws and platform rules.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Prohibited Activities
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              You may not use Q-SMS for any activity that is illegal, abusive,
              deceptive, or harmful. Prohibited activities include, but are not
              limited to:
            </p>
            <ul className="mt-3 space-y-2 text-[#5c6275] dark:text-[#9aa1b2] list-disc list-inside">
              <li>Fraud, scams, or financial deception of any kind</li>
              <li>Impersonation of individuals, businesses, or organizations</li>
              <li>Spam, unsolicited messaging, or bulk account creation</li>
              <li>Bypassing or attempting to bypass safeguards of third-party platforms</li>
              <li>Account farming, automation abuse, or resale of Q-SMS services</li>
              <li>Use of numbers for harassment, threats, or abusive behavior</li>
              <li>Any activity that violates the terms of a third-party service</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Compliance With Laws and Platforms
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              You are solely responsible for ensuring that your use of Q-SMS
              complies with all applicable local, national, and international
              laws, as well as the policies of any third-party platforms for
              which virtual numbers are used.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Monitoring and Enforcement
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS reserves the right to monitor usage patterns to detect abuse,
              fraud, or policy violations. We may suspend, restrict, or
              terminate accounts involved in prohibited activities without
              prior notice.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Consequences of Violations
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Violations of this AUP may result in immediate suspension or
              termination of your account. In cases of serious or repeated
              abuse, any remaining account balance may be forfeited. Q-SMS
              reserves the right to cooperate with lawful requests from
              authorities where required.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Reporting Abuse
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              If you become aware of misuse of Q-SMS or suspect abusive
              activity, you may report it by contacting us at{" "}
              <a
                href="mailto:abuse@q-sms.store"
                className="text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 underline decoration-brand-600/30 dark:decoration-brand-400/30"
              >
                abuse@q-sms.store
              </a>.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Updates to This Policy
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS may update this Acceptable Use Policy from time to time.
              Continued use of the platform after updates are posted
              constitutes acceptance of the revised policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}