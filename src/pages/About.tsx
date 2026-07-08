export default function About() {
  return (
    <main className="w-full bg-white dark:bg-[#0a0e16]">
      <div className="mx-auto max-w-5xl px-4 py-20">

        {/* Header */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#11131a] dark:text-white">
            About Q-SMS
          </h1>
          <p className="mt-4 max-w-3xl text-[#5c6275] dark:text-[#9aa1b2] leading-relaxed">
            Q-SMS is a virtual number platform designed to help users verify
            accounts and access online services without exposing their personal
            phone numbers.
          </p>
        </header>

        {/* Content */}
        <section className="space-y-10 text-sm sm:text-base leading-relaxed">

          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            We provide access to virtual numbers that can be used for one-time
            password (OTP) verification and account creation across a wide range
            of platforms, including social media services, marketplaces, and
            online applications. By using Q-SMS, users can maintain privacy and
            reduce the need to share their personal phone numbers across
            multiple websites.
          </p>

          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            Our platform supports over <span className="text-[#11131a] dark:text-white font-medium">400+ services</span>,
            covering <span className="text-[#11131a] dark:text-white font-medium">40+ countries</span> with
            multiple telecom operators available per region. This flexibility
            allows users to choose numbers based on availability, price, and
            country requirements.
          </p>

          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            Q-SMS operates on a prepaid balance model. Users can top up their
            account balance and pay only for the numbers they use. Our pricing
            is designed to remain competitive and accessible, reflecting real
            market rates without hidden fees.
          </p>

          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            Security and data protection are core to how Q-SMS is built. We do
            not require unnecessary personal information, and we do not sell or
            share user data. Payment processing is handled through trusted
            third-party providers, ensuring sensitive financial information is
            never stored on our servers.
          </p>

          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            We understand that virtual number services require responsible use.
            Q-SMS maintains clear usage policies and actively monitors for abuse
            to protect the integrity of the platform and its users.
          </p>

          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            Our support team is available around the clock through multiple
            channels, including email, Discord, Telegram, and AI-assisted chat
            agents. We also maintain an active support community where users can
            share experiences, ask questions, and receive updates.
          </p>

          <p className="text-[#5c6275] dark:text-[#9aa1b2]">
            Q-SMS is built for users who value privacy, reliability, and
            transparency. Our goal is to provide secure access to virtual
            numbers while maintaining clear boundaries, fair pricing, and
            responsive support.
          </p>

        </section>
      </div>
    </main>
  );
}