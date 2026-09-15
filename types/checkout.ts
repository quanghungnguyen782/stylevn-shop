export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  address: string;
  ward: string;
  city: string;
}

export type ShippingMethodId = "standard" | "express";
export type PaymentMethodId = "cod" | "bank_transfer";

export interface ShippingMethodOption {
  id: ShippingMethodId;
  label: string;
  description: string;
  price: number;
}

export const SHIPPING_METHODS: ShippingMethodOption[] = [
  { id: "standard", label: "Giao hàng tiêu chuẩn", description: "3-5 ngày làm việc", price: 30_000 },
  { id: "express", label: "Giao hàng nhanh", description: "1-2 ngày làm việc", price: 60_000 },
];
