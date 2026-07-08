import { useState, useEffect, useRef } from "react";
import { signUp } from "../services/authServices";
import { createPortal } from "react-dom";

interface SignUpProps {
  onSwitch: () => void;
}

type SignUpResponse =
  | { message: string; user_id: string }
  | { error: string };

/* ─── Overlay rendered via portal directly into <body> ─────────────────── */
const SuccessOverlay = ({ onDone }: { onDone: () => void }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      onDone();
    }, 2800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onDone]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl dark:bg-[#11161f] animate-in zoom-in-95 duration-300">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <circle
              className="animate-[drawCircle_0.5s_ease_0.1s_forwards]"
              cx="26"
              cy="26"
              r="23"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeDasharray="145"
              strokeDashoffset="145"
            />
            <path
              className="animate-[drawTick_0.3s_ease_0.55s_forwards]"
              d="M14 26l9 9 15-17"
              stroke="#22c55e"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="38"
              strokeDashoffset="38"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-center text-xl font-bold text-[#11131a] dark:text-white">
          You're in! 🎉
        </h2>
        <p className="mb-6 text-center text-sm text-[#5c6275] dark:text-[#9aa1b2]">
          Account created successfully.<br />
          Redirecting you to sign in…
        </p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#11131a]/10 dark:bg-white/10">
          <div className="h-full w-0 rounded-full bg-brand-600 animate-[fillBar_2.6s_linear_0.2s_forwards]" />
        </div>
      </div>
      <style>{`
        @keyframes drawCircle { to { stroke-dashoffset: 0; } }
        @keyframes drawTick { to { stroke-dashoffset: 0; } }
        @keyframes fillBar { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>,
    document.body
  );
};

/* ─── Main SignUp component ─────────────────────────────────────────────── */
const SignUp = ({ onSwitch }: SignUpProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDone = () => {
    setSuccess(false);
    onSwitch();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("First name is required.");
      return;
    }
    if (!lastName.trim()) {
      setError("Last name is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = (await signUp(email, password, firstName.trim(), lastName.trim())) as SignUpResponse;
      if ("error" in data) {
        setError(data.error ?? null);
        return;
      }
      setSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Sign up failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-[#11131a]/10 bg-[#f5f6fa] px-3.5 py-2.5 text-sm text-[#11131a] placeholder-[#5c6275] transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/10 dark:bg-[#161b26] dark:text-white dark:placeholder-[#9aa1b2] dark:focus:bg-[#0d111a]";
  const labelClass = "text-xs font-medium text-[#11131a] dark:text-white";

  return (
    <>
      {success && <SuccessOverlay onDone={handleDone} />}
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center sm:text-left">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white sm:mx-0">
            <span className="font-display text-lg font-bold">Q</span>
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-[#11131a] dark:text-white">
            Create account
          </h1>
          <p className="mt-2 text-sm text-[#5c6275] dark:text-[#9aa1b2]">
            Start receiving virtual numbers instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="signup-firstname" className={labelClass}>
                First name
              </label>
              <input
                id="signup-firstname"
                type="text"
                className={inputClass}
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="signup-lastname" className={labelClass}>
                Last name
              </label>
              <input
                id="signup-lastname"
                type="text"
                className={inputClass}
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="signup-email" className={labelClass}>
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              className={inputClass}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="signup-password" className={labelClass}>
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              className={inputClass}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="signup-confirm" className={labelClass}>
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type="password"
              className={inputClass}
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-[#11161f]"
            disabled={loading || success}
          >
            {loading ? (
              <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-xs text-[#5c6275] dark:text-[#9aa1b2]">
            By signing up, you agree to our{" "}
            <a href="/terms-of-services" className="text-brand-600 hover:text-brand-500 dark:text-brand-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-brand-600 hover:text-brand-500 dark:text-brand-400">
              Privacy Policy
            </a>
            .
          </p>
        </form>

        <p className="text-center text-xs text-[#5c6275] dark:text-[#9aa1b2]">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            type="button"
            className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
          >
            Sign in
          </button>
        </p>
      </div>
    </>
  );
};

export default SignUp;