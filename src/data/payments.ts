import {
  SiVisa,
  SiMastercard,
  SiPaypal,
  SiStripe,
  SiBitcoin,
  SiEthereum,
  SiLitecoin,
  SiTether,
} from "react-icons/si";
import type { PaymentMethod } from "../types";

export const paymentMethods: PaymentMethod[] = [
  { name: "Visa", icon: SiVisa },
  { name: "Mastercard", icon: SiMastercard },
  { name: "PayPal", icon: SiPaypal },
  { name: "Stripe", icon: SiStripe },
  { name: "Bitcoin", icon: SiBitcoin },
  { name: "Ethereum", icon: SiEthereum },
  { name: "Litecoin", icon: SiLitecoin },
  { name: "Tether", icon: SiTether },
];
