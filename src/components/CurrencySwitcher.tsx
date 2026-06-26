"use client";
import * as React from "react";
import { useCurrency } from "@/lib/CurrencyProvider";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  return (
    <label className="inline-flex items-center gap-2 text-sm text-pearl/80">
      <span className="text-gold/80">Currency:</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as any)}
        className="rounded-md border border-gold/40 bg-[#0a1733] px-2.5 py-1 text-sm text-pearl outline-none transition-colors hover:border-gold/60 focus:border-gold focus-visible:ring-1 focus-visible:ring-gold/60"
      >
        <option value="INR" className="bg-[#0a1733] text-pearl">INR ₹</option>
        <option value="USD" className="bg-[#0a1733] text-pearl">USD $</option>
        <option value="AED" className="bg-[#0a1733] text-pearl">AED د.إ</option>
        <option value="EUR" className="bg-[#0a1733] text-pearl">EUR €</option>
      </select>
    </label>
  );
}
