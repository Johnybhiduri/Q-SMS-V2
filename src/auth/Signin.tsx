import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import { setUser } from "../store/authSlice";
import { signIn } from "../services/authServices";
import ResetPasswordModal from "./ResetPasswordModal";

interface SignInProps {
  onSwitch: () => void;
}

type SignInResponse =
  | {
      token: string;
      user: {
        id: string;
        email: string;
        is_verified: boolean;
        balance: number;
        first_name?: string;
        last_name?: string;
      };
      error?: undefined;
    }
  | {
      error: string;
      token?: undefined;
      user?: undefined;
    };

const SignIn = ({ onSwitch }: SignInProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = (await signIn(email, password)) as SignInResponse;
      if ("error" in data) {
        setError(data.error ?? null);
        return;
      }
      localStorage.setItem("token", data.token);
      dispatch(
        setUser({
          id: data.user.id,
          email: data.user.email,
          token: data.token,
          is_verified: data.user.is_verified,
          balance: data.user.balance,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
        })
      );
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("Sign-in error:", err);
      const message =
        err instanceof Error ? err.message : "Sign in failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center sm:text-left">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white sm:mx-0">
            <span className="font-display text-lg font-bold">Q</span>
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-[#11131a] dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-[#5c6275] dark:text-[#9aa1b2]">
            Enter your details to access your Q-SMS account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="signin-email" className="text-xs font-medium text-[#11131a] dark:text-white">
              Email address
            </label>
            <input
              id="signin-email"
              type="email"
              className="w-full rounded-lg border border-[#11131a]/10 bg-[#f5f6fa] px-3.5 py-2.5 text-sm text-[#11131a] placeholder-[#5c6275] transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/10 dark:bg-[#161b26] dark:text-white dark:placeholder-[#9aa1b2] dark:focus:bg-[#0d111a]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="signin-password" className="text-xs font-medium text-[#11131a] dark:text-white">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="text-xs font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Forgot password?
              </button>
            </div>
            <input
              id="signin-password"
              type="password"
              className="w-full rounded-lg border border-[#11131a]/10 bg-[#f5f6fa] px-3.5 py-2.5 text-sm text-[#11131a] placeholder-[#5c6275] transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-white/10 dark:bg-[#161b26] dark:text-white dark:placeholder-[#9aa1b2] dark:focus:bg-[#0d111a]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-[#11161f]"
          >
            {loading ? (
              <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#5c6275] dark:text-[#9aa1b2]">
          Don't have an account?{" "}
          <button
            onClick={onSwitch}
            type="button"
            className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
          >
            Create one
          </button>
        </p>
      </div>

      {showResetModal && <ResetPasswordModal onClose={() => setShowResetModal(false)} />}
    </>
  );
};

export default SignIn;