import type { NumberDetails } from "../store/numberSlice";

export type IconComp = React.ComponentType<{ className?: string }>;

export type AvailableCountries = Record<string, string>;

// interface SMSHistory {
//     code: string;
//     receivedAt: Date;
// }
// All purchased-number state in ONE object (otp, idNum, timer, history, etc.)
// Update ActiveNumber to match NumberDetails exactly, or extend it
export interface ActiveNumber extends Omit<NumberDetails, 'expiresAt'> {
    expiresAt: string; // Convert to Date for easier handling in components
    icon?: IconComp; // Optional extra field
    timeLeft?: string;
}

export interface Service {
    name: string;
    code: string;
    count: number;
    price: number;
    icon: IconComp;
    available: boolean;
}


