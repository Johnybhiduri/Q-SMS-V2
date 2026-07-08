// ─── Types ────────────────────────────────────────────────────────────────────

import { simpleFetch } from "./authServices";
import type { ActiveNumber } from "../types/number";
export interface AdminBalance {
  balance: number;
}

export interface ServiceInfo {
  name: string;
  code: string;
  quantity: number;
  price: number;
}

export interface CountryServicesResponse {
  services: ServiceInfo[];
}


export interface ServiceNumberResponse {
  num: number;
  idNum: string;
}

export interface GetSMSModel {
  id_num: string;
}

export interface SMSCodeResponse {
  message: string;
  code?: string;
}

export interface SetStatusModel {
  status: "end" | "bad" | "ready" | string;
  id_num: string;
}

export interface SetStatusResponse {
  message?: string;
  error?: string;
}

export interface ApiError {
  error: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToken(): string {
  return localStorage.getItem("token") ?? "";
}

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * GET /getBalance
 * Returns the current account balance from VAK SMS.
 */
export async function getBalance(): Promise<AdminBalance | ApiError> {
  return simpleFetch<AdminBalance | ApiError>(`/getBalance`, {
    method: "GET",
    token: getToken(),
  });
}

/**
 * GET /getActiveNumbers
 * Returns list of currently active numbers.
 */
export async function getActiveNumbers(): Promise<
  { numbers: ActiveNumber[] } | ApiError
> {
  return simpleFetch<{ numbers: ActiveNumber[] } | ApiError>(
    `/getActiveNumbers`,
    {
      method: "GET",
      token: getToken(),
    }
  );
}

/**
 * GET /getAvailableCountries
 * Returns list of currently available countries.
 */
type AvailableCountries = Record<string, string>; // e.g. { "Russia": "ru", "United States": "us" }
export async function getAvailableCountries(): Promise<
  AvailableCountries | ApiError
> {
  const result = await simpleFetch<{ countries: Record<string, string> } | ApiError>(
    `/getAvailableCountries`,
    {
      method: "GET",
      token: getToken(),
    }
  );

  if (isApiError(result)) return result;
  return result.countries; // unwrap and return just the Record<string, string>
}

/**
 * GET /getServices/{country}
 * Returns available services and their counts/prices for a given country code.
 * @param country - e.g. "ru", "us", "uk"
 */
export async function getCountryServices(
  country: string
): Promise<CountryServicesResponse | ApiError> {
  return simpleFetch<CountryServicesResponse | ApiError>(
    `/getServices/${encodeURIComponent(country)}`,
    {
      method: "GET",
      token: getToken(),
    }
  );
}

/**
 * GET /getServiceNumbers/{service}/{country}
 * Returns a phone number for the given service and country.
 * @param service - Service code, e.g. "tg" for Telegram, "wa" for WhatsApp
 * @param country - Country code, e.g. "ru", "us"
 */
export async function getServiceNumbers(
  service: string,
  country: string
): Promise<ActiveNumber | ApiError> {
  return simpleFetch<ActiveNumber | ApiError>(
    `/getServiceNumbers/${encodeURIComponent(service)}/${encodeURIComponent(country)}`,
    {
      method: "GET",
      token: getToken(),
    }
  );
}

/**
 * POST /getSmsCode
 * Retrieves the SMS verification code for a given number ID.
 * @param id_num - The number ID returned from getServiceNumbers
 */
export async function getSmsCode(
  id_num: string
): Promise<SMSCodeResponse | ApiError> {
  return simpleFetch<SMSCodeResponse | ApiError>(`/getSmsCode`, {
    method: "POST",
    body: { id_num } satisfies GetSMSModel,
    token: getToken(),
  });
}

/**
 * PUT /setStatus
 * Sets the status for a phone number.
 * @param status - "end" to cancel, "bad" to mark as banned, "ready" for another SMS
 * @param id_num - The number ID returned from getServiceNumbers
 */
export async function setStatus(
  status: SetStatusModel["status"],
  id_num: string
): Promise<SetStatusResponse | ApiError> {
  return simpleFetch<SetStatusResponse | ApiError>(`/setStatus`, {
    method: "PUT",
    body: { status, id_num } satisfies SetStatusModel,
    token: getToken(),
  });
}

// ─── Type Guards ──────────────────────────────────────────────────────────────

export function isApiError(response: unknown): response is ApiError {
  return (
    typeof response === "object" &&
    response !== null &&
    "error" in response &&
    typeof (response as ApiError).error === "string"
  );
}