"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

/* ─── office data (real addresses) ─── */
type OfficeEntry = { city: string; entity: string; address: string; phone: string; email: string; phone2?: string };
const ALL_REGIONS: { region: string; offices: OfficeEntry[] }[] = [
  { region: "India", offices: [
    { city: "Bengaluru", entity: "XIPHIAS IMMIGRATION PVT LTD", address: "1st Floor, JK Nirmala Arcade, Plot no. 780, 80 Feet Rd, 4th Block, Koramangala, Bengaluru, Karnataka 560034", phone: "+91 9021335577", email: "immigration@xiphias.in" },
    { city: "Gurugram", entity: "XIPHIAS IMMIGRATION PVT LTD", address: "Augusta Point, Golf Course Rd, near Parsvnath Exotica, DLF Phase 5, Sector 53, Gurugram, Haryana 122002", phone: "+91-96675 20211", email: "gurgaon@xiphias.in" },
  ]},
  { region: "UAE", offices: [
    { city: "Dubai", entity: "XIPHIAS IMMIGRATION DMCC", address: "Unit No: 608, Platinum Tower, Plot No: JLT-PH1-I2, Jumeirah Lakes Towers, Dubai, UAE", phone: "+971-527 275 101", email: "dubai@xiphiasimmigration.com" },
  ]},
  { region: "Europe", offices: [
    { city: "Larnaca, Cyprus", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "41-43 Spyros Kyprianou Ave., Patroclos Tower, 6th Floor, Larnaca, 6051", phone: "+357-24-812000", phone2: "+357-24-635964", email: "info@xiphiasimmigration.com" },
    { city: "Lisbon, Portugal", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "Rua do Mar Vermelho, nº 2, 2.1, 1990-152 Lisboa", phone: "+351-218 954 290", phone2: "+351-218 943 244", email: "info@xiphiasimmigration.com" },
    { city: "Valletta, Malta", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "120, St Ursula Street, Valletta, VLT 1236 AD", phone: "+356 2205 6611", phone2: "+356 2205 6201", email: "info@xiphiasimmigration.com" },
    { city: "València, Spain", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "Plaza del Ayuntamiento 19, Office 3G, València", phone: "+34 960 730 029", email: "info@xiphiasimmigration.com" },
  ]},
  { region: "United Kingdom", offices: [
    { city: "Leicester", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "5 Upper King Street, Leicester, LE1 6XF", phone: "+44 (0) 781 392 9395", phone2: "+44 (0) 116 319 4884", email: "info@xiphiasimmigration.com" },
  ]},
  { region: "Canada", offices: [
    { city: "Waterloo, ON", entity: "XIPHIAS Investment Migration Inc.", address: "3-133 Weber Street North, Suite 514, Waterloo, ON N2J 3G9", phone: "(438) 379-9101", email: "info@xiphiasimmigration.com" },
    { city: "Montreal, QC", entity: "XIPHIAS Projects Inc.", address: "1200 McGill College Avenue, Suite 1100, Montreal QC H3B 4G7", phone: "+1-438-379-9101", email: "info@xiphiasimmigration.com" },
  ]},
  { region: "Australia", offices: [
    { city: "Melbourne", entity: "XIPHIAS Immigration", address: "SSCS-Suite 204, 227 Collins Street, Melbourne, VIC 3000", phone: "+61-0451239 239", email: "info@xiphiasimmigration.com" },
  ]},
  { region: "New Zealand", offices: [
    { city: "Auckland", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Belinda Wang, LIA #200902240)", address: "26C Aviemore Drive, Highland Park, Auckland", phone: "+64 21 269 9692", phone2: "+64 9 535 0227", email: "belinda@xiphias.in" },
  ]},
  { region: "USA", offices: [
    { city: "Los Angeles, CA", entity: "XIPHIAS IMMIGRATION PVT LTD (Represented by Partners)", address: "1605 North Cahuenga Blvd, Hollywood, CA 90028", phone: "+1 323 466 1400", email: "info@xiphiasimmigration.com" },
  ]},
  { region: "Qatar", offices: [
    { city: "Doha", entity: "ILC LLC (Represented by Partners)", address: "Office 3402, Al Jazeera Tower, Conference Center Rd, West Bay, P.O Box 4011, Doha, Qatar", phone: "+974 4476 0562", phone2: "+974 4007 5001", email: "info@xiphiasimmigration.com" },
  ]},
  { region: "Brazil", offices: [
    { city: "São Paulo", entity: "HOFF ADVOCACIA", address: "Tabapuã Street, No. 594, Room 46, Itaim Bibi, São Paulo Capital, SP – 04533-002", phone: "(11) 3787-0935", phone2: "(11) 98070-8842", email: "info@xiphiasimmigration.com" },
  ]},
];

const CHANNELS = [
  { label: "Call", value: "+971-527 275 101", sub: "Mon–Sat · 9:00–18:00 GST", href: "tel:+971527275101" },
  { label: "Email", value: "dubai@xiphiasimmigration.com", sub: "Reply within one business day", href: "mailto:dubai@xiphiasimmigration.com" },
  { label: "WhatsApp", value: "+971-527 275 101", sub: "Message our Dubai advisory desk", href: "https://wa.me/971527275101" },
  { label: "Office", value: "Jumeirah Lakes Towers, Dubai", sub: "Unit 608, Platinum Tower, JLT-PH1-I2", href: "https://maps.google.com/?q=Platinum+Tower+JLT+Dubai" },
];

const INTERESTS = ["Citizenship by Investment", "Residency & Golden Visa", "Skilled Migration", "Corporate Mobility", "Not sure yet"];

const NEXT = [
  { n: "01", t: "You reach out", d: "Share your goal in confidence. NDA available on request." },
  { n: "02", t: "We map your route", d: "A senior advisor returns a bespoke strategy — jurisdiction, cost, timeline." },
  { n: "03", t: "We begin", d: "One accountable desk from documents to passports." },
];

/* ─── atoms ─── */
function Eyebrow({ children, ar, light }: { children: React.ReactNode; ar: string; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? `${INK}70` : GOLD }}>
      <span className="h-px w-8" style={{ background: light ? `${INK}44` : GOLD }} />
      {children}
      <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal" style={{ color: GOLD }}>{ar}</span>
    </p>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0c1f3f]/45">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
const inputCls = "w-full rounded-md border bg-white px-3.5 py-2.5 text-[14px] text-[#0c1f3f] outline-none transition-colors focus:border-[#bfa15c] placeholder:text-[#0c1f3f]/30";
const borderMuted = `${INK}1a`;

/* ─── page ─── */
export default function ContactPage({ serifClass }: { serifClass: string }) {
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [play, setPlay] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string>("UAE");

  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);

  const filtered = ALL_REGIONS.filter((r) => r.region === activeRegion);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message, interest, variant: "contact", page: typeof window !== "undefined" ? window.location.pathname : undefined, referrer: typeof document !== "undefined" ? document.referrer : undefined, consent: true }),
      });
      if (res.ok) setSent(true);
    } catch { /* network error — keep form so user can retry */ } finally { setSubmitting(false); }
  }

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── Hero: compact, wide ── */}
      <section
        data-tone="dark"
        className="relative flex items-end overflow-hidden text-[#eef3fb]"
        style={{ background: NAVY, minHeight: "52vh", paddingTop: "9rem", paddingBottom: "3.5rem" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={play ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src="/images/citizenship/dubai/dubai-country-image.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-center [filter:grayscale(0.2)_brightness(0.52)_contrast(1.05)]"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.96) 0%, rgba(8,18,42,0.65) 55%, rgba(8,18,42,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.9) 0%, transparent 55%)" }} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-20">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
            <a href="/" className="transition-colors hover:text-[#bfa15c]">Home</a>
            <span className="mx-2" style={{ color: GOLD }}>/</span>Contact
          </p>
          <Eyebrow ar="تواصل معنا">Get in touch</Eyebrow>
          <h1 className={`${serifClass} mt-4 text-[clamp(2.4rem,4.8vw,4rem)] font-medium leading-[1.0]`}>
            Let&apos;s discuss your <span className="italic" style={{ color: GOLD }}>global future.</span>
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/60">
            A senior advisor responds personally — in confidence, within one business day.
          </p>

          {/* quick stats row */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {[["17+", "Years advising"], ["10,000+", "Families relocated"], ["35", "Jurisdictions"], ["10", "Global offices"]].map(([v, u]) => (
              <div key={u} className="flex items-baseline gap-2">
                <span className={`${serifClass} text-[1.4rem] font-medium`} style={{ color: GOLD }}>{v}</span>
                <span className="text-[12px] text-white/40">{u}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact hub: channels + form ── */}
      <section data-tone="light" className="relative isolate px-6 py-14 sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">

          {/* left — direct channels + what happens next */}
          <div className="flex flex-col gap-8">
            <div>
              <Eyebrow ar="قنوات التواصل" light>Direct channels</Eyebrow>
              <div className="mt-5 flex flex-col" style={{ borderTop: `1px solid ${INK}12` }}>
                {CHANNELS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="group flex items-start gap-4 py-4 transition-colors"
                    style={{ borderBottom: `1px solid ${INK}0e` }}
                  >
                    <span
                      className="mt-0.5 w-16 shrink-0 text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: GOLD }}
                    >
                      {c.label}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0c1f3f] transition-colors group-hover:text-[#bfa15c]">{c.value}</p>
                      <p className="mt-0.5 text-[11px] text-[#0c1f3f]/40">{c.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* process steps */}
            <div className="rounded-xl border p-6" style={{ borderColor: borderMuted, background: "white" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>What happens next</p>
              <div className="mt-4 flex flex-col gap-5">
                {NEXT.map((n) => (
                  <div key={n.n} className="flex gap-4">
                    <span className={`${serifClass} shrink-0 text-[1.4rem] font-medium leading-none`} style={{ color: `${GOLD}77` }}>{n.n}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0c1f3f]">{n.t}</p>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-[#0c1f3f]/45">{n.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] uppercase tracking-[0.18em] text-[#0c1f3f]/30">By appointment · All enquiries confidential</p>
          </div>

          {/* right — consultation form */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border p-7 sm:p-8"
            style={{ borderColor: borderMuted, background: "white", boxShadow: "0 24px 80px -36px rgba(8,18,42,0.1)" }}
          >
            {sent ? (
              <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                <div className="grid h-14 w-14 place-items-center rounded-full text-xl" style={{ background: GOLD, color: NAVY }}>✓</div>
                <h3 className={`${serifClass} mt-5 text-[1.8rem] font-medium text-[#0c1f3f]`}>Thank you.</h3>
                <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-[#0c1f3f]/55">A senior advisor will be in touch within one business day. Everything stays confidential.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="border-b pb-4" style={{ borderColor: `${INK}0e` }}>
                  <h2 className={`${serifClass} text-[1.55rem] font-medium text-[#0c1f3f]`}>Request a private consultation</h2>
                  <p className="mt-1 text-[12px] text-[#0c1f3f]/40">All enquiries handled in strict confidence.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name *">
                    <input required id="name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} style={{ borderColor: borderMuted }} placeholder="Your name" />
                  </Field>
                  <Field label="Phone *">
                    <input required id="phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} style={{ borderColor: borderMuted }} placeholder="+971 …" />
                  </Field>
                </div>

                <Field label="Email *">
                  <input required id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} style={{ borderColor: borderMuted }} placeholder="you@example.com" />
                </Field>

                <Field label="I'm interested in">
                  <div className="mt-1 flex flex-wrap gap-2">
                    {INTERESTS.map((x) => (
                      <button
                        type="button"
                        key={x}
                        onClick={() => setInterest(x)}
                        className="rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-150"
                        style={{
                          borderColor: interest === x ? GOLD : `${INK}18`,
                          background: interest === x ? GOLD : "transparent",
                          color: interest === x ? NAVY : `${INK}80`,
                        }}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Your situation">
                  <textarea rows={3} id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className={inputCls} style={{ borderColor: borderMuted, resize: "none" }} placeholder="A few details about your goals…" />
                </Field>

                <label className="flex items-start gap-2.5 text-[11px] text-[#0c1f3f]/50">
                  <input type="checkbox" name="consent" required className="mt-0.5 accent-[#bfa15c]" />
                  I agree to be contacted about my enquiry. We never sell your data.
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] disabled:opacity-60"
                  style={{ background: GOLD, color: NAVY }}
                >
                  {submitting ? "Sending…" : "Send confidential enquiry"}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
                <p className="text-center text-[11px] text-[#0c1f3f]/30">Dubai · Bengaluru · Gurugram · Leicester · Waterloo</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Offices with region filter ── */}
      <section data-tone="dark" className="relative isolate px-6 py-14 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow ar="مكاتبنا">Our offices</Eyebrow>
              <h2 className={`${serifClass} mt-3 text-[clamp(1.7rem,3.2vw,2.6rem)] font-medium leading-[1.0]`}>
                10 countries. <span className="italic" style={{ color: GOLD }}>One standard.</span>
              </h2>
            </div>
            <p className="text-[12px] text-white/30">By appointment · Same senior service worldwide</p>
          </div>

          {/* region pills */}
          <div className="mt-6 flex flex-wrap gap-2 border-b pb-6" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {ALL_REGIONS.map((r) => (
              <button
                key={r.region}
                onClick={() => setActiveRegion(r.region)}
                className="rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-200"
                style={{
                  borderColor: activeRegion === r.region ? GOLD : "rgba(255,255,255,0.13)",
                  background: activeRegion === r.region ? GOLD : "transparent",
                  color: activeRegion === r.region ? NAVY : "rgba(255,255,255,0.4)",
                }}
              >
                {r.region}
              </button>
            ))}
          </div>

          {/* offices */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRegion}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered[0]?.offices.map((o) => (
                <div
                  key={o.city}
                  className="group rounded-lg border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfa15c44]"
                  style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)" }}
                >
                  <p className={`${serifClass} text-[1.05rem] font-medium leading-snug transition-colors group-hover:text-[#bfa15c]`}>{o.city}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.09em]" style={{ color: `${GOLD}80` }}>{o.entity}</p>
                  <p className="mt-2.5 text-[11.5px] leading-relaxed text-white/38">{o.address}</p>
                  <div className="mt-3 flex flex-col gap-1 border-t pt-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <a href={`tel:${o.phone.replace(/[\s-]/g, "")}`} className="flex items-center gap-2 text-[11.5px] text-white/40 transition-colors hover:text-[#bfa15c]">
                      <span className="w-3 text-[9px] font-bold shrink-0" style={{ color: GOLD }}>T</span>{o.phone}
                    </a>
                    {o.phone2 && (
                      <a href={`tel:${o.phone2.replace(/[\s-]/g, "")}`} className="flex items-center gap-2 text-[11.5px] text-white/40 transition-colors hover:text-[#bfa15c]">
                        <span className="w-3 text-[9px] font-bold shrink-0" style={{ color: GOLD }}>T</span>{o.phone2}
                      </a>
                    )}
                    <a href={`mailto:${o.email}`} className="flex items-center gap-2 text-[11.5px] text-white/40 transition-colors hover:text-[#bfa15c]">
                      <span className="w-3 text-[9px] font-bold shrink-0" style={{ color: GOLD }}>E</span>{o.email}
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/20">XIPHIAS Immigration · Est. 2007 · All offices by appointment only</p>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
