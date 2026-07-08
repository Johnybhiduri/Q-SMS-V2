export interface Currency {
  code: string;
  display_name: string;
  ticker: string;
  icon_url: string;
  is_popular: boolean;
}

export interface PaymentInfo {
  payment_id: string;
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  amount_usd: number;
  status: string;
  status_label: string;
  qr_code_url: string;
  expiration_estimate_date?: string;
}

export interface PaymentStatusResult {
  payment_status: string;
  status_label: string;
}

export interface ApiError {
  error: string;
}