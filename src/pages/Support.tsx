import { Mail, Send } from "lucide-react";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Support() {
  return (
    <section id="support" className="w-full border-t border-[#11131a]/8 dark:border-white/8 bg-white dark:bg-[#0a0e16]">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 items-start">
          {/* Support channels */}
          <div>
            <h3 className="text-2xl font-semibold text-[#11131a] dark:text-white">
              Support
            </h3>
            <p className="mt-3 max-w-md text-sm text-[#5c6275] dark:text-[#9aa1b2]">
              Get help from our team or connect with the Q-SMS community through
              official support channels.
            </p>
            <div className="mt-8 space-y-5">
              <a
                href="mailto:support@q-sms.store"
                className="flex items-center gap-3 text-sm text-[#5c6275] hover:text-brand-600 dark:text-[#9aa1b2] dark:hover:text-brand-400 transition"
              >
                <Mail size={18} className="text-brand-600 dark:text-brand-400" />
                support@q-sms.store
              </a>
              <a
                href="https://discord.gg/2ehf8GhgTP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#5c6275] hover:text-brand-600 dark:text-[#9aa1b2] dark:hover:text-brand-400 transition"
              >
                <FaDiscord className="text-brand-600 dark:text-brand-400" />
                Discord Community
              </a>
              <a
                href="https://t.me/QsmsOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#5c6275] hover:text-brand-600 dark:text-[#9aa1b2] dark:hover:text-brand-400 transition"
              >
                <FaTelegramPlane className="text-brand-600 dark:text-brand-400" />
                Telegram Support
              </a>
              <a
                href="https://x.com/JohnyEther"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#5c6275] hover:text-brand-600 dark:text-[#9aa1b2] dark:hover:text-brand-400 transition"
              >
                <FaXTwitter size={16} className="text-brand-600 dark:text-brand-400" />
                Twitter / X
              </a>
            </div>
          </div>
          {/* Contact form */}
          <div className="w-full max-w-lg">
            <h4 className="text-lg font-semibold text-[#11131a] dark:text-white">
              Send a message
            </h4>
            <form
              action="mailto:support@q-sms.store"
              method="POST"
              encType="text/plain"
              className="mt-6 space-y-4"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="w-full rounded-lg border border-[#11131a]/10 dark:border-white/10 bg-white dark:bg-[#11161f] px-4 py-2.5 text-sm text-[#11131a] dark:text-white placeholder-[#5c6275] dark:placeholder-[#9aa1b2] focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              <textarea
                name="message"
                required
                placeholder="How can we help you?"
                rows={4}
                className="w-full rounded-lg border border-[#11131a]/10 dark:border-white/10 bg-white dark:bg-[#11161f] px-4 py-2.5 text-sm text-[#11131a] dark:text-white placeholder-[#5c6275] dark:placeholder-[#9aa1b2] focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 transition"
              >
                <Send size={16} />
                Send message
              </button>
            </form>
            <p className="mt-3 text-xs text-[#5c6275] dark:text-[#9aa1b2]">
              Messages are delivered directly to our support inbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}