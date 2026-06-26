import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

import { PRODUCT_CATALOG, IS_TEST_PRICING, type ProductConfig } from "@/lib/payments/product-catalog";
import PaymentCatalog from "@/components/Payment/PaymentCatalog";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  title: "Reports & Checkout | XIPHIAS",
  description:
    "Purchase a XIPHIAS personalised immigration report. Secure hosted checkout through Jiopay — XIPHIAS never stores your card details.",
  alternates: { canonical: "/payment" },
  robots: { index: false, follow: false },
};

// Checkout is gated behind this public flag and is OFF by default. The disabled
// "coming soon" state renders unless NEXT_PUBLIC_JIOPAY_CHECKOUT_ENABLED is the
// literal string "true". Keep this default — do not enable without restoring the
// gateway transaction-value limit and verifying UAT sign-off.
const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_JIOPAY_CHECKOUT_ENABLED === "true";

// Reports are listed first; staff custom links are excluded from the public catalog.
function listedProducts(): ProductConfig[] {
  return Object.values(PRODUCT_CATALOG).filter((p) => p.fulfillment !== "custom");
}

export default function PaymentPage() {
  return (
    <PaymentCatalog
      serifClass={serif.className}
      products={listedProducts()}
      checkoutEnabled={CHECKOUT_ENABLED}
      isTestPricing={IS_TEST_PRICING}
    />
  );
}
