import { useState, useEffect, useRef } from "react";
import { X, Lock, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { changePassword } from "../services/authServices"

interface ApiError {
  error: string;
}

const isApiError = (res: any): res is ApiError =>
  res && typeof res === "object" && typeof res.error === "string";

interface ChangePasswordModalProps {
  onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Show/hide toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleSubmit = async () => {
    setError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (oldPassword === newPassword) {
      setError("New password must be different from the current password.");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword(oldPassword, newPassword);

      
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
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-700/40 shrink-0">
            <Lock size={18} className="text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Change Password</h2>
            <p className="text-xs text-gray-400">Update your account password</p>
          </div>
        </div>

        {success ? (
          <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-900/20 border border-emerald-800/30 rounded-lg px-4 py-3">
            <CheckCircle2 size={15} className="shrink-0" />
            Password changed successfully!
          </div>
        ) : (
          <div className="space-y-4">
            {error && <ErrorBanner message={error} />}

            <PasswordField
              label="Current Password"
              value={oldPassword}
              show={showOld}
              onToggle={() => setShowOld((v) => !v)}
              onChange={(v) => { setOldPassword(v); setError(""); }}
              placeholder="Enter current password"
            />

            <PasswordField
              label="New Password"
              value={newPassword}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              onChange={(v) => { setNewPassword(v); setError(""); }}
              placeholder="Enter new password"
            />

            <PasswordField
              label="Confirm New Password"
              value={confirmPassword}
              show={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
              onChange={(v) => { setConfirmPassword(v); setError(""); }}
              placeholder="Re-enter new password"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-medium mt-2"
            >
              {loading
                ? <Loader2 size={15} className="animate-spin" />
                : <Lock size={15} />}
              {loading ? "Updating…" : "Update Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Reusable password input with show/hide toggle ──
function PasswordField({
  label,
  value,
  show,
  onToggle,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-400">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/40"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
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