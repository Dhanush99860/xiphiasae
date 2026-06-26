"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="pointer-events-none fixed left-5 top-5 z-[60] rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">{children}</div>;
}
function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Eyebrow({ children, ar }: { children: React.ReactNode; ar: string }) {
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}><span className="h-px w-8" style={{ background: GOLD }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}

const CONTACT = [
  { label: "Call", value: "+971 4 123 4567", sub: "Sun–Thu · 9:00–18:00 GST" },
  { label: "Email", value: "concierge@xiphias.com", sub: "Replies within one business day" },
  { label: "WhatsApp", value: "+971 50 123 4567", sub: "Message our Dubai desk" },
];
const OFFICES = [
  { city: "Dubai", note: "DIFC · Gate Village", ar: "دبي" },
  { city: "London", note: "Mayfair", ar: "لندن" },
  { city: "Bengaluru", note: "UB City", ar: "بنغالورو" },
];
const INTERESTS = ["Citizenship by Investment", "Residency & Golden Visa", "Skilled Migration", "Corporate Mobility", "Not sure yet"];
const NEXT = [
  { t: "You reach out", d: "Share your goal and a few details — in confidence, under NDA." },
  { t: "We map your route", d: "A senior advisor returns a tailored strategy: jurisdiction, cost and timeline." },
  { t: "We begin", d: "One accountable desk handles every step, from documents to passports." },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0c1f3f]/50">{label}</span><div className="mt-2">{children}</div></label>;
}
const inputCls = "w-full rounded-md border bg-white px-4 py-3 text-[15px] text-[#0c1f3f] outline-none transition-colors focus:border-[#bfa15c]";

export default function ContactSample({ serifClass }: { serifClass: string }) {
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [sent, setSent] = useState(false);
  return (
    <div className="relative">
      <Badge>Sample · Contact page</Badge>
      <Header serifClass={serifClass} />

      {/* HERO + FORM */}
      <section data-tone="dark" className="relative isolate px-6 pb-24 pt-32 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: `radial-gradient(120% 90% at 15% 0%, #13284f 0%, ${NAVY} 60%)` }}>
        <Ambient tone="dark" />
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* left: info */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}><a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span> Contact</p>
            <p className="mt-7"><Eyebrow ar="تواصل معنا">Contact</Eyebrow></p>
            <h1 className={`${serifClass} mt-5 text-[clamp(2.6rem,5.5vw,4.6rem)] font-medium leading-[1.0]`}>Let&apos;s discuss your <span className="italic" style={{ color: GOLD }}>global future.</span></h1>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/75">Tell us your goal and a senior advisor will respond personally — privately, and entirely off the record.</p>
            <div className="mt-10 flex flex-col gap-6">
              {CONTACT.map((c) => (
                <div key={c.label} className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{c.label}</p>
                  <p className={`${serifClass} mt-1 text-[1.5rem] font-medium`}>{c.value}</p>
                  <p className="text-[13px] text-white/50">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
          {/* right: form card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-2xl border p-7 sm:p-9" style={{ borderColor: `${GOLD}40`, background: "#f6f9fd", boxShadow: "0 40px 110px -50px rgba(0,0,0,0.7)" }}>
            {sent ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center text-[#0c1f3f]">
                <div className="grid h-16 w-16 place-items-center rounded-full" style={{ background: GOLD, color: NAVY }}>✓</div>
                <h3 className={`${serifClass} mt-6 text-[2rem] font-medium`}>Thank you.</h3>
                <p className="mt-3 max-w-xs text-[15px] text-[#0c1f3f]/65">A senior advisor will be in touch within one business day. Everything you share stays confidential.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
                <h2 className={`${serifClass} text-[1.7rem] font-medium text-[#0c1f3f]`}>Request a private consultation</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name *"><input required className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="Your name" /></Field>
                  <Field label="Phone *"><input required className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="+971 …" /></Field>
                </div>
                <Field label="Email *"><input required type="email" className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="you@example.com" /></Field>
                <Field label="I'm interested in">
                  <div className="flex flex-wrap gap-2">{INTERESTS.map((x) => <button type="button" key={x} onClick={() => setInterest(x)} className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors" style={{ borderColor: interest === x ? GOLD : `${INK}22`, background: interest === x ? GOLD : "transparent", color: interest === x ? NAVY : `${INK}aa` }}>{x}</button>)}</div>
                </Field>
                <Field label="Your situation"><textarea rows={4} className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="A few details about your goals…" /></Field>
                <label className="flex items-start gap-3 text-[12px] text-[#0c1f3f]/60"><input type="checkbox" required className="mt-0.5 accent-[#bfa15c]" />I agree to be contacted about my enquiry. We never sell your data.</label>
                <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ background: GOLD, color: NAVY }}>Send confidential enquiry <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></button>
                <p className="text-center text-[12px] text-[#0c1f3f]/45">By appointment · Dubai · London · Bengaluru</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="mx-auto max-w-6xl">
          <Eyebrow ar="ماذا بعد">What happens next</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3rem)] font-medium`}><Rise text="Three steps, all confidential." /></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {NEXT.map((n, i) => (
              <motion.div key={n.t} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-t pt-6" style={{ borderColor: `${INK}1f` }}>
                <span className={`${serifClass} text-[2.4rem] font-medium leading-none`} style={{ color: GOLD }}>0{i + 1}</span>
                <h3 className={`${serifClass} mt-3 text-[1.6rem] font-medium`}>{n.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#0c1f3f]/65">{n.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section data-tone="dark" className="relative isolate px-6 py-24 text-[#eef3fb] sm:px-12 lg:px-20" style={{ background: NAVY }}>
        <Ambient tone="dark" />
        <div className="mx-auto max-w-6xl">
          <Eyebrow ar="مكاتبنا">Our offices</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3rem)] font-medium`}><Rise text="Three cities. One desk." /></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {OFFICES.map((o, i) => (
              <motion.div key={o.city} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="group rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#bfa15c]" style={{ borderColor: "rgba(191,161,92,0.28)", background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0))" }}>
                <div className="flex items-baseline justify-between"><h3 className={`${serifClass} text-[2rem] font-medium transition-colors group-hover:text-[#bfa15c]`}>{o.city}</h3><span lang="ar" dir="rtl" className="font-arabic-display text-lg" style={{ color: `${GOLD}cc` }}>{o.ar}</span></div>
                <p className="mt-3 text-[14px] uppercase tracking-[0.14em] text-white/55">{o.note}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: GOLD }}>By appointment <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}
