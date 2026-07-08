// paymentService.ts
// All API calls use simpleFetch from authService (fetch-based, token-aware, auth-event-aware)

import { simpleFetch } from "./authServices";
import type {ApiError, Currency, PaymentInfo, PaymentStatusResult} from "../types/payments";
// ─── Types ────────────────────────────────────────────────────────────────────



// ─── Type Guard ───────────────────────────────────────────────────────────────

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as ApiError).error === "string"
  );
}

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Health check — verifies the payment service is reachable.
 * Throws if the service is down or returns an error shape.
 */
export const checkPaymentHealth = async (): Promise<void> => {
  const res = await simpleFetch<Record<string, unknown>>("/payments/health");
  if (isApiError(res)) {
    throw new Error(res.error);
  }
};

/**
 * Fetch the list of supported currencies.
 * Returns an array of Currency objects.
 */
export const getCurrencies = async (): Promise<Currency[]> => {
  const res = await simpleFetch<{ currencies: Currency[] } | ApiError>(
    "/payments/currencies"
  );
  if (isApiError(res)) {
    throw new Error(res.error);
  }
  return res.currencies;
};

/**
 * Get the minimum payable amount for a given currency code.
 */
export const getMinimumAmount = async (
  currencyCode: string
): Promise<number> => {
  const res = await simpleFetch<{ min_amount: number } | ApiError>(
    `/payments/minimum/${currencyCode}`
  );
  if (isApiError(res)) {
    throw new Error(res.error);
  }
  return res.min_amount;
};

/**
 * Estimate the crypto amount for a given USD value and target currency.
 */
export const getEstimate = async (
  amountUsd: number,
  payCurrency: string
): Promise<number> => {
  const params = new URLSearchParams({
    amount_usd: String(amountUsd),
    pay_currency: payCurrency,
  });
  const res = await simpleFetch<{ estimated_amount: number } | ApiError>(
    `/payments/estimate?${params.toString()}`
  );
  if (isApiError(res)) {
    throw new Error(res.error);
  }
  return res.estimated_amount;
};

/**
 * Create a new crypto payment.
 * Requires a valid JWT token in localStorage (injected by simpleFetch via token param).
 */
export const createPayment = async (
  amountUsd: number,
  payCurrency: string
): Promise<PaymentInfo> => {
  const token = localStorage.getItem("token") ?? undefined;

  const res = await simpleFetch<PaymentInfo | ApiError>("/payments/create", {
    method: "POST",
    body: { amount_usd: amountUsd, pay_currency: payCurrency },
    token,
  });

  if (isApiError(res)) {
    throw new Error(res.error);
  }
  return res;
};

/**
 * Poll the status of an in-progress payment.
 */
export const getPaymentStatus = async (
  paymentId: string
): Promise<PaymentStatusResult> => {
  const res = await simpleFetch<PaymentStatusResult | ApiError>(
    `/payments/status/${paymentId}`
  );
  if (isApiError(res)) {
    throw new Error(res.error);
  }
  return res;
};

/**
 * Fetch the payment history for a given user.
 */
export const getPaymentHistory = async (
  userId: string
): Promise<PaymentInfo[]> => {
  const token = localStorage.getItem("token") ?? undefined;
  const res = await simpleFetch<{ payments: PaymentInfo[] } | ApiError>(
    `/payments/history/${userId}`,
    { token }
  );
  if (isApiError(res)) {
    throw new Error(res.error);
  }
  return res.payments;
};