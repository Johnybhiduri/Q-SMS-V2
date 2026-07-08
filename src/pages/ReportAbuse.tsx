export default function ReportAbuse() {
  return (
    <main className="w-full bg-white dark:bg-[#0a0e16]">
      <div className="mx-auto max-w-5xl px-4 py-20">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#11131a] dark:text-white">
            Report Abuse
          </h1>
          <p className="mt-4 text-sm text-[#5c6275] dark:text-[#9aa1b2]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>
        {/* Content */}
        <section className="space-y-10 text-sm sm:text-base leading-relaxed">
          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            Q-SMS takes abuse, fraud, and misuse of its services seriously.
            This page provides a channel for reporting suspected violations
            related to the use of virtual numbers on our platform.
          </p>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              What Should Be Reported
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Abuse reports may include suspected fraud, scams, impersonation,
              harassment, spam, or any activity that violates our Terms of
              Service or Acceptable Use Policy.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              How to Report
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              To report abuse, please send an email to{" "}
              <a
                href="mailto:abuse@q-sms.store"
                className="text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300 underline decoration-brand-600/30 dark:decoration-brand-400/30"
              >
                abuse@q-sms.store
              </a>{" "}
              with relevant details, including the virtual number involved,
              the service or platform affected, and any supporting information.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Review Process
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              All reports are reviewed by our compliance team. Q-SMS may take
              appropriate action, including account suspension or termination,
              where misuse is confirmed.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#11131a] dark:text-white mb-3">
              Lawful Requests
            </h2>
            <p className="text-[#5c6275] dark:text-[#9aa1b2]">
              Q-SMS cooperates with lawful requests from authorities where
              required by applicable laws and regulations.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}