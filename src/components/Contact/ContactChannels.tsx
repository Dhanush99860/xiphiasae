// ============================
// src/components/Contact/ContactChannels.tsx
// ============================
"use client";

import * as React from "react";
import SectionCard from "@/components/Contact/SectionCard";

export type Social = Readonly<{ label: string; href: string }>;

type Props = {
  phone?: string;
  altPhone?: string;
  email?: string;
  whatsapp?: string;
  /** Accept readonly so CONTACT.address (declared `as const`) works */
  address?: ReadonlyArray<string>;
  hours?: string;
  /** Accept readonly so CONTACT.socials (declared `as const`) works */
  socials?: ReadonlyArray<Social>;
  className?: string;

  /** Optional enquiry link to show as a primary action */
  enquireHref?: string;
};

export default function ContactChannels({
  phone,
  altPhone,
  email,
  whatsapp,
  address = [],
  hours,
  className = "",
}: Props) {
  const telHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : undefined;
  const altTelHref = altPhone ? `tel:${altPhone.replace(/\s+/g, "")}` : undefined;
  const waHref = whatsapp ? toWhatsApp(whatsapp) : undefined;
  const mailHref = email ? `mailto:${email}` : undefined;

  return (
    <SectionCard
      className={[
        // refreshed visual: dark midnight surface, gold-accented
        "group text-sm p-4 sm:p-5 lg:p-6",
        "bg-white border border-gold/45 transition-colors hover:border-gold/65",
        "shadow-[0_1px_0_rgba(255,255,255,0.02)]",
        // make card stretch to available height
        "h-full flex flex-col",
        className,
      ].join(" ")}
      aria-labelledby="contact-channels-title"
    >
      <h2 id="contact-channels-title" className="font-sora text-base sm:text-lg font-semibold text-ink">
        Contact options
      </h2>

      {/* Details */}
      <div className="mt-4 grid gap-4">
        {phone && (
          <Row icon={<PhoneIcon />} label="Phone">
            <a className="text-ink underline decoration-gold/50 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold" href={telHref}>
              {phone}
            </a>
            {altPhone && (
              <>
                {" "}/{" "}
                <a className="text-ink underline decoration-gold/50 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold" href={altTelHref}>
                  {altPhone}
                </a>
              </>
            )}
          </Row>
        )}

        {email && (
          <Row icon={<MailIcon />} label="Email">
            <a className="text-ink underline decoration-gold/50 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold" href={mailHref}>
              {email}
            </a>
          </Row>
        )}

        {whatsapp && (
          <Row icon={<WhatsAppIcon />} label="WhatsApp">
            <a
              className="text-ink underline decoration-gold/50 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {whatsapp}
            </a>
          </Row>
        )}

        {address.length > 0 && (
          <div className="pt-3 border-t border-gold/45">
            <div className="flex items-start gap-2">
              <PinIcon className="mt-0.5 h-4 w-4 text-gold" />
              <div>
                <div className="font-medium text-ink">Head office</div>
                <address className="not-italic text-ink/55">
                  {address.map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
                </address>
              </div>
            </div>
            {hours && (
              <div className="mt-2 flex items-start gap-2 text-ink/55">
                <ClockIcon className="mt-0.5 h-4 w-4 text-gold" />
                <div>
                  <span className="font-medium text-ink">Hours: </span>
                  {hours}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </SectionCard>
  );
}

/* ------------------------------- UI bits ------------------------------- */

function Action({
  href,
  intent,
  children,
  className = "",
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  intent: "primary" | "secondary" | "ghost" | "whatsapp";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 min-h-[44px] text-sm transition focus:outline-none focus-visible:ring-2 active:scale-[0.985]";
  const ring = "ring-1";
  const styles: Record<string, string> = {
    primary: `bg-gold text-ink font-semibold hover:bg-gold_bright ${ring} ring-gold/60 focus-visible:ring-gold`,
    secondary: `bg-sand/50 text-ink hover:border-gold/65 ${ring} ring-gold/15 focus-visible:ring-gold`,
    ghost: `bg-sand/50 text-ink/80 hover:text-ink ${ring} ring-gold/15 focus-visible:ring-gold`,
    whatsapp: `bg-sand/50 text-ink hover:border-gold/65 ${ring} ring-gold/15 focus-visible:ring-gold`,
  };
  return (
    <a href={href} className={[base, styles[intent], className].join(" ")} {...rest}>
      {children}
    </a>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center text-gold">{icon}</span>
      <div>
        <div className="font-medium uppercase tracking-wide text-[11px] text-ink/40">{label}</div>
        <div className="mt-0.5 text-ink/70">{children}</div>
      </div>
    </div>
  );
}

function toWhatsApp(n: string) {
  const digits = n.replace(/[^\d+]/g, "").replace(/^\+/, "");
  const text = encodeURIComponent("Hello! I’d like to talk to an immigration expert.");
  return `https://wa.me/${digits}?text=${text}`;
}

/* -------------------------------- Icons -------------------------------- */

function ArrowRight() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="currentColor" d="M5 12.75h11.19l-3.72 3.72a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06L13.53 5.97a.75.75 0 1 0-1.06 1.06l3.72 3.72H5a.75.75 0 0 0 0 1.5z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1v3.49a1 1 0 01-1 1C11.3 22 2 12.7 2 1.99a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.21z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l7.4 6.17a1 1 0 001.2 0L20 8.24V18H4z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg aria-hidden viewBox="0 0 32 32" className="h-5 w-5">
      <path fill="currentColor" d="M19.11 17.36c-.29-.14-1.7-.84-1.96-.93-.26-.1-.44-.14-.63.14-.19.29-.73.93-.9 1.12-.17.2-.33.21-.62.07-.29-.14-1.23-.45-2.34-1.42-.86-.76-1.44-1.7-1.61-1.98-.17-.29-.02-.45.13-.59.14-.14.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.48-.63-.48-.17 0-.36-.02-.55-.02-.19 0-.5.07-.76.36-.26.29-1.01.98-1.01 2.39 0 1.41 1.03 2.77 1.18 2.96.14.19 2.02 3.09 4.89 4.34.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.24.17-1.37-.07-.14-.26-.21-.55-.36z" />
      <path fill="currentColor" d="M26.97 5.03A13.92 13.92 0 0016 .14C7.3.14.2 7.25.2 16c0 2.79.76 5.48 2.21 7.86L.03 31.86l8.18-2.32A15.77 15.77 0 0016 31.86C24.7 31.86 31.8 24.75 31.8 16c0-3.75-1.46-7.26-4.03-9.97z" />
    </svg>
  );
}
function PinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M12 2a7 7 0 00-7 7c0 4.2 5.28 10.24 6.32 11.42a1 1 0 001.36 0C13.72 19.24 19 13.2 19 9a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 112.5-2.5 2.5 2.5 0 01-2.5 2.5z" />
    </svg>
  );
}
function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M12 2a10 10 0 1010 10A10.01 10.01 0 0012 2zm.75 10.44V7a.75.75 0 00-1.5 0v6a.75.75 0 00.22.53l3 3a.75.75 0 001.06-1.06z" />
    </svg>
  );
}
function Dot() {
  return <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-gold" />;
}