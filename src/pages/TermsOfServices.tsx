export default function TermsOfServices() {
  return (
    <main className="w-full bg-white dark:bg-[#0a0e16]">
      <div className="mx-auto max-w-5xl px-4 py-20">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#11131a] dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[#5c6275] dark:text-[#9aa1b2]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>
        {/* Content */}
        <section className="space-y-10 text-sm sm:text-base leading-relaxed">
          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            These Terms of Service govern your access to and use of the Q-SMS
            platform. By creating an account or using our services, you agree
            to be bound by these terms. If you do not agree, you must not use
            the platform.
          </p>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Description of Service
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS provides access to virtual phone numbers for verification
              purposes, including receiving one-time passwords (OTP) and
              service-related messages from third-party platforms. Q-SMS does
              not own or control the third-party services for which numbers
              may be used.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Eligibility
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              You must be legally permitted to use this service in your
              jurisdiction. By using Q-SMS, you confirm that you are at least
              18 years old and capable of entering into a legally binding
              agreement.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Account Responsibility
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities conducted through
              your account. Q-SMS is not responsible for losses caused by
              unauthorized access resulting from your failure to secure your
              account.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Acceptable Use
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              You agree not to use Q-SMS for any illegal, fraudulent, abusive,
              or harmful activities. Prohibited use includes, but is not
              limited to, impersonation, spam, scams, account abuse, or
              attempts to bypass safeguards imposed by third-party platforms.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Third-Party Services
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS does not guarantee that a virtual number will work with any
              specific third-party service. Compatibility, acceptance, and
              delivery of messages depend entirely on the third-party platform,
              and may change at any time without notice.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Pricing and Payments
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS operates on a prepaid balance system. Prices vary depending
              on service, country, and availability. All payments are final
              unless otherwise stated in our Refund Policy. Q-SMS reserves the
              right to update pricing at any time.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Refunds
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Refunds are subject to the conditions outlined in our Refund
              Policy. Q-SMS does not guarantee refunds for successfully
              delivered numbers or completed transactions.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Service Availability
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS strives to maintain service availability but does not
              guarantee uninterrupted access. We reserve the right to modify,
              suspend, or discontinue any part of the service at any time.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Suspension and Termination
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS may suspend or terminate accounts involved in prohibited,
              suspicious, or abusive activity without prior notice. Any
              remaining balance may be forfeited in cases of policy violation.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Limitation of Liability
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              To the maximum extent permitted by law, Q-SMS shall not be liable
              for indirect, incidental, or consequential damages arising from
              the use or inability to use the service.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Changes to These Terms
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS may update these Terms of Service from time to time.
              Continued use of the platform after changes are posted
              constitutes acceptance of the updated terms.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Contact Information
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              For questions regarding these Terms of Service, you may contact
              us at{" "}
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