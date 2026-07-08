import { useState, useEffect, useRef } from "react";
import { X, Mail, ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { sendVerificationOtp, verifyEmailWithOtp } from "../services/authServices"

type Step = "send" | "verify";

interface ApiError {
  error: string;
}

// simpleFetch returns { error: string } on failure — never throws for API errors
const isApiError = (res: any): res is ApiError =>
  res && typeof res === "object" && typeof res.error === "string";

interface VerifyEmailModalProps {
  email: string;
  onClose: () => void;
  onVerified: () => void;
}

export default function VerifyEmailModal({ email, onClose, onVerified }: VerifyEmailModalProps) {
  const [step, setStep] = useState<Step>("send");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on backdrop click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await sendVerificationOtp(email, "verify_email");

      if (isApiError(res)) {
        setError(res.error);
        return;
      }

    //   // Adjust key based on your actual API response shape
    //   const receivedToken = (res as any)?.token ?? (res as any)?.data?.token ?? "";
    //   setToken(receivedToken);
      setStep("verify");
    } catch {
      // Only real network failures reach here
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 8) {
      setError("OTP must be exactly 8 digits.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await verifyEmailWithOtp(otp);

      if (isApiError(res)) {
        setError(res.error);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onVerified();
        onClose();
      }, 1200);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setStep("send");
    setError("");
    setOtp("");
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-gray-700/60 bg-gray-900 shadow-2xl shadow-black/50 p-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-700/40 shrink-0">
            {step === "send"
              ? <Mail size={18} className="text-emerald-400" />
              : <ShieldCheck size={18} className="text-emerald-400" />
            }
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              {step === "send" ? "Verify Your Email" : "Enter OTP"}
            </h2>
            <p className="text-xs text-gray-400 truncate max-w-xs">
              {step === "send"
                ? `We'll send a code to ${email}`
                : `Enter the 8-digit code sent to ${email}`}
            </p>
          </div>
        </div>

        {/* ── Step: Send OTP ── */}
        {step === "send" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400 leading-relaxed">
              Your email is not yet verified. Click below to receive a one-time verification code.
            </p>
            {error && <ErrorBanner message={error} />}
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {loading
                ? <Loader2 size={15} className="animate-spin" />
                : <Mail size={15} />}
              {loading ? "Sending…" : "Send Verification Code"}
            </button>
          </div>
        )}

        {/* ── Step: Enter OTP ── */}
        {step === "verify" && (
          <div className="space-y-4">
            {success ? (
              <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-900/20 border border-emerald-800/30 rounded-lg px-4 py-3">
                <CheckCircle2 size={15} className="shrink-0" />
                Email verified successfully!
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-400">
                  Didn't receive it?{" "}
                  <button
                    onClick={handleResend}
                    className="text-emerald-400 hover:underline"
                  >
                    Resend code
                  </button>
                </p>

                {error && <ErrorBanner message={error} />}

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                  placeholder="Enter 8-digit OTP"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/40 tracking-widest text-center"
                />

                <button
                  onClick={handleVerify}
                  disabled={loading || otp.length !== 8}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {loading
                    ? <Loader2 size={15} className="animate-spin" />
                    : <ShieldCheck size={15} />}
                  {loading ? "Verifying…" : "Verify Email"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
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