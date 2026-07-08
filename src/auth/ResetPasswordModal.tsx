import { useState, useEffect, useRef } from "react";
import { X, Mail, KeyRound, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { sendVerificationOtp, resetPassword } from "../services/authServices"; // adjust path if needed
import { createPortal } from "react-dom";

type Step = "send" | "reset";

interface ApiError {
  error: string;
}

const isApiError = (res: any): res is ApiError =>
  res && typeof res === "object" && typeof res.error === "string";

interface ResetPasswordModalProps {
  onClose: () => void;
}

export default function ResetPasswordModal({ onClose }: ResetPasswordModalProps) {
  const [step, setStep] = useState<Step>("send");

  // Step 1
  const [email, setEmail] = useState("");

  // Step 2
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on backdrop click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // ── Step 1: Send OTP ──
  const handleSendOtp = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await sendVerificationOtp(email.trim(), "reset_password");
      if (isApiError(res)) {
        setError(res.error);
        return;
      }
      setStep("reset");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Reset Password ──
  const handleReset = async () => {
    if (otp.length !== 8) {
      setError("OTP must be exactly 8 digits.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await resetPassword(otp, newPassword, email);
      if (isApiError(res)) {
        setError(res.error);
        return;
      }
      setSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setStep("send");
    setError("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // ── Render via portal so it escapes any parent stacking context ──
  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{ position: "fixed", inset: 0, zIndex: 9999, transform: "none" }}
      className="flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      {/* Modal card — stops click propagation so backdrop click works correctly */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-gray-700/60 bg-gray-900 shadow-2xl shadow-black/50 p-6"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-900/40 border border-indigo-700/40 shrink-0">
            {step === "send"
              ? <Mail size={18} className="text-indigo-400" />
              : <KeyRound size={18} className="text-indigo-400" />}
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              {step === "send" ? "Reset Password" : "Set New Password"}
            </h2>
            <p className="text-xs text-gray-400">
              {step === "send"
                ? "We'll send a code to your email"
                : `Code sent to ${email}`}
            </p>
          </div>
        </div>

        {/* ── Step 1: Email + Send OTP ── */}
        {step === "send" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400 leading-relaxed">
              Enter the email address associated with your account and we'll send you a reset code.
            </p>

            {error && <ErrorBanner message={error} />}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/40"
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Mail size={15} />}
              {loading ? "Sending…" : "Send Reset Code"}
            </button>
          </div>
        )}

        {/* ── Step 2: OTP + New Password + Confirm ── */}
        {step === "reset" && (
          <div className="space-y-4">
            {success ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-900/20 border border-emerald-800/30 rounded-lg px-4 py-3">
                <CheckCircle2 size={15} className="shrink-0" />
                Password reset successfully! You can now sign in.
              </div>
            ) : (
              <>
                {error && <ErrorBanner message={error} />}

                {/* OTP */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">8-Digit OTP</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setError(""); }}
                    placeholder="Enter 8-digit code"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/40 tracking-widest text-center"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                      placeholder="Enter new password"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      aria-label={showNew ? "Hide password" : "Show password"}
                    >
                      {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                      placeholder="Re-enter new password"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {loading ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
                  {loading ? "Resetting…" : "Reset Password"}
                </button>

                <p className="text-xs text-center text-gray-500">
                  Wrong email?{" "}
                  <button
                    onClick={handleGoBack}
                    className="text-indigo-400 hover:underline"
                  >
                    Go back
                  </button>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body  // ← portal target: renders outside any parent DOM constraints
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 text-sm text-red-400 bg-red-900/20 border border-red-800/30 rounded-lg px-4 py-3">
      <AlertCircle size={15} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}