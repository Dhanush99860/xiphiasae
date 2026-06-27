"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

function Rise({ text, className, delay = 0, play }: { text: string; className?: string; delay?: number; play?: boolean }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} style={{ display: "inline-block" }} initial="hidden" animate={play === undefined ? undefined : play ? "show" : "hidden"} whileInView={play === undefined ? "show" : undefined} viewport={play === undefined ? { once: true, amount: 0.4 } : undefined} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}>
      {words.map((w, i) => (<span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginInlineEnd: i < words.length - 1 ? "0.26em" : undefined }}><motion.span style={{ display: "inline-block" }} variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>{w}</motion.span></span>))}
    </motion.span>
  );
}
function Eyebrow({ children, ar, tone = "dark" }: { children: React.ReactNode; ar: string; tone?: "dark" | "light" }) {
  const c = tone === "light" ? GOLD_DEEP : GOLD;
  return <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: c }}><span className="h-px w-8" style={{ background: c }} />{children}<span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">{ar}</span></p>;
}

const CONTACT = [
  { label: "Call", value: "+91 90213 35577", sub: "Mon–Sat · 9:30–18:30 IST" },
  { label: "Email", value: "immigration@xiphias.in", sub: "Replies within one business day" },
  { label: "WhatsApp", value: "+91 74060 06061", sub: "Message our advisory desk" },
];
const OFFICES = [
  { city: "Bengaluru", note: "Koramangala · Aurbis Prime, 80 Feet Road", ar: "بنغالورو" },
  { city: "Dubai", note: "JLT · Platinum Tower, Unit 608", ar: "دبي" },
  { city: "Doha", note: "West Bay · Al Jazeera Tower", ar: "الدوحة" },
  { city: "Gurugram", note: "DLF Phase 5 · Augusta Point", ar: "غوروغرام" },
  { city: "Melbourne", note: "227 Collins Street, Suite 204", ar: "ملبورن" },
  { city: "Waterloo", note: "133 Weber Street North, Suite 514", ar: "واترلو" },
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

export default function ContactPage({ serifClass }: { serifClass: string }) {
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [play, setPlay] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPlay(true), 120); return () => clearTimeout(t); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          interest,
          variant: "contact",
          page: typeof window !== "undefined" ? window.location.pathname : undefined,
          referrer: typeof document !== "undefined" ? document.referrer : undefined,
          consent: true,
        }),
      });
      if (res.ok) setSent(true);
    } catch {
      /* network error — keep the form so the user can retry */
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      <section data-tone="dark" className="relative flex min-h-screen items-center overflow-hidden text-[#eef3fb]" style={{ background: NAVY }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={play ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 8, ease: "easeOut" }}>
          <Image src="/images/gallery/xiphias-immigration-gallery-03.jpeg" alt="" fill sizes="100vw" priority className="object-cover [filter:grayscale(0.5)_brightness(0.55)_contrast(1.05)]" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,18,42,0.92) 0%, rgba(8,18,42,0.55) 55%, rgba(8,18,42,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,18,42,0.8) 0%, transparent 45%)" }} />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-32 sm:px-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-20">
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-2xl border p-7 sm:p-9" style={{ borderColor: `${GOLD}40`, background: "#f6f9fd", boxShadow: "0 40px 110px -50px rgba(0,0,0,0.7)" }}>
            {sent ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center text-[#0c1f3f]">
                <div className="grid h-16 w-16 place-items-center rounded-full" style={{ background: GOLD, color: NAVY }}>✓</div>
                <h3 className={`${serifClass} mt-6 text-[2rem] font-medium`}>Thank you.</h3>
                <p className="mt-3 max-w-xs text-[15px] text-[#0c1f3f]/65">A senior advisor will be in touch within one business day. Everything you share stays confidential.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className={`${serifClass} text-[1.7rem] font-medium text-[#0c1f3f]`}>Request a private consultation</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name *"><input required id="name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="Your name" /></Field>
                  <Field label="Phone *"><input required id="phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="+971 …" /></Field>
                </div>
                <Field label="Email *"><input required id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="you@example.com" /></Field>
                <Field label="I'm interested in">
                  <div className="flex flex-wrap gap-2">{INTERESTS.map((x) => <button type="button" key={x} onClick={() => setInterest(x)} className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors" style={{ borderColor: interest === x ? GOLD : `${INK}22`, background: interest === x ? GOLD : "transparent", color: interest === x ? NAVY : `${INK}aa` }}>{x}</button>)}</div>
                </Field>
                <Field label="Your situation"><textarea rows={4} id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className={inputCls} style={{ borderColor: `${INK}22` }} placeholder="A few details about your goals…" /></Field>
                <label className="flex items-start gap-3 text-[12px] text-[#0c1f3f]/60"><input type="checkbox" name="consent" required className="mt-0.5 accent-[#bfa15c]" />I agree to be contacted about my enquiry. We never sell your data.</label>
                <button type="submit" disabled={submitting} className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] disabled:opacity-60" style={{ background: GOLD, color: NAVY }}>{submitting ? "Sending…" : "Send confidential enquiry"} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span></button>
                <p className="text-center text-[12px] text-[#0c1f3f]/45">By appointment · Dubai · London · Bengaluru</p>
              </form>
            )}
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-white/55"><span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span><span className="block h-9 w-px" style={{ background: `linear-gradient(${GOLD},transparent)` }} /></div>
      </section>

      <section data-tone="light" className="relative isolate px-6 py-24 text-[#0c1f3f] sm:px-12 lg:px-20" style={{ background: "#f3f7fd" }}>
        <Ambient tone="light" />
        <div className="mx-auto max-w-6xl">
          <Eyebrow ar="ماذا بعد" tone="light">What happens next</Eyebrow>
          <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4vw,3rem)] font-medium`}><Rise text="Three steps, all confidential." /></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {NEXT.map((n, i) => (
              <motion.div key={n.t} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-t pt-6" style={{ borderColor: `${INK}1f` }}>
                <span className={`${serifClass} text-[2.4rem] font-medium leading-none`} style={{ color: GOLD_DEEP }}>0{i + 1}</span>
                <h3 className={`${serifClass} mt-3 text-[1.6rem] font-medium`}>{n.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#0c1f3f]/65">{n.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
