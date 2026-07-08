export default function PrivacyPolicy() {
  return (
    <main className="w-full bg-white dark:bg-[#0a0e16]">
      <div className="mx-auto max-w-5xl px-4 py-20">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#11131a] dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[#5c6275] dark:text-[#9aa1b2]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>
        {/* Content */}
        <section className="space-y-10 text-sm sm:text-base leading-relaxed">
          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            Q-SMS respects your privacy and is committed to protecting your
            personal data. This Privacy Policy explains how we collect, use,
            store, and protect information when you access or use our platform.
          </p>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Information We Collect
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              When you use Q-SMS, we may collect limited information necessary
              to operate and secure the platform. This may include your email
              address, account credentials, IP address, usage activity, and
              transaction details related to balance top-ups and service usage.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Use of Virtual Numbers
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS provides virtual numbers for verification purposes only.
              Messages received on virtual numbers may be temporarily processed
              to deliver OTPs or service messages. We do not permanently store
              message content unless required for operational or security
              reasons.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Payment Information
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Payments made on Q-SMS are processed through trusted third-party
              payment providers. We do not store full payment card details or
              sensitive financial information on our servers. Payment providers
              handle all payment data in accordance with their own security and
              compliance standards.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              How We Use Your Information
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              We use collected information to provide and maintain the Q-SMS
              service, process transactions, prevent fraud and abuse, improve
              platform performance, and communicate important updates or
              support-related messages.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Data Sharing
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS does not sell or rent user data. Information may be shared
              only with service providers required to operate the platform
              (such as hosting, analytics, or payment services) or when required
              by law or lawful requests from authorities.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Data Retention
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              We retain user data only for as long as necessary to fulfill
              operational, legal, and security obligations. Data may be removed
              or anonymized when it is no longer required.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Security Measures
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS uses reasonable technical and organizational measures to
              protect user information against unauthorized access, loss, or
              misuse. However, no system can be guaranteed to be completely
              secure.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Responsible Use
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Users are responsible for ensuring their use of Q-SMS complies
              with applicable laws and third-party platform policies. We reserve
              the right to restrict or terminate accounts involved in prohibited
              or abusive activities.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Changes to This Policy
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS may update this Privacy Policy from time to time. Changes
              will be posted on this page, and continued use of the service
              constitutes acceptance of the updated policy.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Contact Us
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              If you have questions about this Privacy Policy or how your data
              is handled, you may contact us at{" "}
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