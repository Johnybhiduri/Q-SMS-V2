import { authEvents } from "../utils/authEvents";

authEvents
const API_BASE = import.meta.env.VITE_API_BASE_URL;
function getToken(): string {
  return localStorage.getItem("token") ?? "";
}
// -----------------------------
// Generic Fetch Wrapper
// -----------------------------
type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  token?: string;
};

export const simpleFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { method = "GET", body } = options;
  const token = options.token ?? localStorage.getItem("token") ?? undefined;
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = await response.json();

  // ✅ Centralized auth failure handling
  if (response.status === 401 || response.status === 403) {
    const detail = (data?.detail ?? data?.error ?? "").toLowerCase();

    const isAuthError = [
      "token has expired",
      "not authenticated",
    ].some(msg => detail.includes(msg));

    if (isAuthError) {
      authEvents.onUnauthorized();
      throw new Error("Session expired. Please log in again.");
    }
  }

  // ✅ Return error JSON as-is instead of throwing, so callers can use isApiError()
  if (!response.ok) {
    if (data && typeof data === "object" && "error" in data) {
      return data as T;
    }

    // Normalize non-standard error shapes into ApiError shape
    const detail = data?.detail;
    const message =
      data?.error ||
      (Array.isArray(detail) ? detail.map((d: any) => d.msg).join(", ") : detail) ||
      "Something went wrong";
    return { error: message } as T;
  }

  return data;
};
// -----------------------------
// Auth APIs
// -----------------------------

// Signup
export const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
  return simpleFetch("/auth/signup", {
    method: "POST",
    body: { email, password, first_name: firstName, last_name: lastName },
  });
};

// Signin
export const signIn = async (email: string, password: string) => {
  return simpleFetch("/auth/login", {
    method: "POST",
    body: { email, password },
  });
};

// Check Auth (protected route)
export const checkAuth = async (token: string) => {
  return simpleFetch("/auth", {
    method: "GET",
    token,
  });
};

export const sendVerificationOtp = async (email: string, purpose: string) => {
  return simpleFetch(`/auth/send-otp`, {
    method: "POST",
    body: { email, purpose },
  });
}

export const verifyEmailWithOtp = async (otp: string) => {
  return simpleFetch(`/auth/verify-email`, {
    method: "POST",
    body: { otp },
    token: getToken(),
  });
}

export const resetPassword = async (otp: string, newPassword: string, email: string) => {
  return simpleFetch(`/auth/reset-password`, {
    method: "POST",
    body: { otp, new_password: newPassword, email },
  });
}

export const changePassword = async (currentPassword: string, newPassword: string,) => {
  return simpleFetch(`/auth/change-password`, {
    method: "POST",
    body: { current_password: currentPassword, new_password: newPassword },
    token: getToken(),
  });
}
