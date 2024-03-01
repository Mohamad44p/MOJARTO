import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={import.meta.env.VITE_PUBLIC_STRIPE_KEY as string}
      successUrl="https://chic-style-hub-e-commerce.vercel.app/stripe/success"
      cancelUrl="https://chic-style-hub-e-commerce.vercel.app/stripe/error"
      currency="USD"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}
