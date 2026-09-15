"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { StepCustomerInfo } from "@/components/checkout/StepCustomerInfo";
import { StepShippingAddress } from "@/components/checkout/StepShippingAddress";
import { StepShippingMethod } from "@/components/checkout/StepShippingMethod";
import { StepPayment } from "@/components/checkout/StepPayment";
import { StepConfirmation } from "@/components/checkout/StepConfirmation";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { SHIPPING_METHODS } from "@/types/checkout";
import type { CustomerInfo, ShippingAddress, ShippingMethodId, PaymentMethodId } from "@/types/checkout";
import type { CartLine } from "@/types/cart";

function generateOrderNumber(): string {
  const now = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SV${now}${rand}`;
}

export function CheckoutClient() {
  const { lines, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ name: "", email: "", phone: "" });
  const [address, setAddress] = useState<ShippingAddress>({ address: "", ward: "", city: "" });
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>("standard");
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [confirmedLines, setConfirmedLines] = useState<CartLine[]>([]);

  const shippingCost = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price ?? 0;

  function handlePaymentSubmit(_method: PaymentMethodId) {
    void _method;
    setSubmitting(true);
    setConfirmedLines(lines);
    setTimeout(() => {
      setOrderNumber(generateOrderNumber());
      clearCart();
      setSubmitting(false);
      setStep(5);
    }, 600);
  }

  if (step < 5 && lines.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-20 text-center md:px-8">
        <p className="text-sm text-muted">Giỏ hàng của bạn đang trống.</p>
        <Link href="/san-pham" className="mt-4 inline-block text-sm underline-offset-2 hover:underline">
          Tiếp tục mua sắm →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="mb-8 font-display text-2xl md:text-3xl">Thanh Toán</h1>
      <CheckoutStepper current={step} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_380px]">
        <div>
          {step === 1 && (
            <StepCustomerInfo
              value={customerInfo}
              onNext={(info) => {
                setCustomerInfo(info);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <StepShippingAddress
              value={address}
              onNext={(addr) => {
                setAddress(addr);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepShippingMethod
              value={shippingMethod}
              onNext={(method) => {
                setShippingMethod(method);
                setStep(4);
              }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <StepPayment
              value="cod"
              submitting={submitting}
              onSubmit={handlePaymentSubmit}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && orderNumber && <StepConfirmation orderNumber={orderNumber} />}
        </div>

        {step < 5 && <OrderSummary lines={lines} shippingCost={shippingCost} />}
        {step === 5 && <OrderSummary lines={confirmedLines} shippingCost={shippingCost} />}
      </div>
    </div>
  );
}
