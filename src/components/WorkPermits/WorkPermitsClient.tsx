"use client";

// Navy/gold "luxury concierge" reskin of the Work Permit Advisory page.
// PRESENTATION ONLY — every piece of form logic, the field set, the validation,
// and the POST to /api/work-permit are unchanged from the original Desert Sand
// version; only the markup/styling moved to the navy/gold idiom. The page renders
// its own chrome (LuxeHeader / LuxeFooter / Ambient) and the metadata + JSON-LD
// live in the server page.

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Globe2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import { countryImage } from "@/components/Countries/country-image";
import {
  findWorkPermitCountry,
  workPermitCountries,
  type WorkPermitCountry,
} from "@/lib/work-permits";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; leadId: string }
  | { status: "error"; message: string };

const permitSteps = [
  "Resume review",
  "Permit route match",
  "Document readiness",
  "Advisor follow-up",
];

function Eyebrow({
  children,
  ar,
  tone = "dark",
}: {
  children: React.ReactNode;
  ar?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]"
      style={{ color: tone === "dark" ? GOLD : GOLD_DEEP }}
    >
      <span className="h-px w-8" style={{ background: tone === "dark" ? GOLD : GOLD_DEEP }} />
      {children}
      {ar ? (
        <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal">
          {ar}
        </span>
      ) : null}
    </p>
  );
}

export default function WorkPermitsClient({
  initialCountrySlug,
  serifClass,
}: {
  initialCountrySlug?: string;
  serifClass: string;
}) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const initialCountry = findWorkPermitCountry(initialCountrySlug) || workPermitCountries[0];
  const [selectedSlug, setSelectedSlug] = useState(initialCountry.slug);
  const [selectedPermit, setSelectedPermit] = useState(initialCountry.permitTypes[0]);
  const [fileName, setFileName] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const intakeRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(
    () => findWorkPermitCountry(selectedSlug) || workPermitCountries[0],
    [selectedSlug],
  );

  const heroImg = countryImage("uae", "Africa & Middle East");

  function selectCountry(country: WorkPermitCountry) {
    setSelectedSlug(country.slug);
    setSelectedPermit(country.permitTypes[0]);
    router.replace(`/work-permits?country=${country.slug}`, { scroll: false });
    intakeRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("country", selectedCountry.country);
    formData.set("countrySlug", selectedCountry.slug);
    formData.set("permitType", selectedPermit);
    formData.set("page", "/work-permits");

    try {
      const response = await fetch("/api/work-permit", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        leadId?: string;
        error?: string;
      };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Could not submit your work permit review.");
      }

      setSubmitState({ status: "success", leadId: payload.leadId || "" });
      form.reset();
      setFileName("");
      window.setTimeout(() => {
        router.replace(`/work-permits?submitted=1&country=${selectedCountry.slug}`);
      }, 1800);
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "Could not submit your work permit review.",
      });
    }
  }

  return (
    <div className="relative">
      <Header serifClass={serifClass} />

      {/* ── HERO (real full-bleed image, navy overlay) ── */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden px-6 pb-20 pt-32 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="Work permit advisory" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 15% 0%, rgba(19,40,79,0.82) 0%, rgba(10,23,51,0.94) 60%, ${NAVY} 100%)`,
            }}
          />
        </div>
        <Ambient tone="dark" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(238,243,251,0.5)" }}>
              <a href="/" className="hover:text-[#bfa15c]">Home</a> <span style={{ color: GOLD }}>/</span>{" "}
              <span>Work Permits</span>
            </p>
            <p className="mt-7">
              <Eyebrow ar="تصاريح العمل">
                <BriefcaseBusiness className="h-4 w-4" aria-hidden /> Work Permit Advisory
              </Eyebrow>
            </p>
            <h1 className={`${serifClass} mt-5 max-w-3xl text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.02]`}>
              Work permits without the{" "}
              <span className="italic" style={{ color: GOLD }}>job consultancy noise.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75">
              XIPHIAS reviews work permit routes, resume fit, employer documentation, and filing
              readiness. We do not provide job placement; we help you understand whether the permit
              side is workable.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work-permit-intake"
                className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                style={{ background: GOLD, color: NAVY }}
              >
                Upload resume for review <ArrowRight className="size-4" />
              </a>
              <Link
                href="/skilled"
                className="inline-flex items-center gap-2 rounded-md border px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85 transition-colors hover:bg-white/10"
                style={{ borderColor: `${GOLD}55` }}
              >
                View skilled pathways
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.55, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl border backdrop-blur"
            style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.04)" }}
          >
            <div className="relative">
              <Image
                src={selectedCountry.image}
                alt={`${selectedCountry.country} work permit advisory`}
                width={840}
                height={560}
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${NAVY}f2 0%, ${NAVY}40 45%, transparent 75%)` }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                  Selected route desk
                </p>
                <h2 className={`${serifClass} mt-2 text-3xl font-semibold text-white`}>
                  {selectedCountry.country}
                </h2>
                <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-white/65">
                  {selectedCountry.advisoryFocus}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DESTINATIONS (choose a country) ── */}
      <section
        data-tone="dark"
        className="relative isolate px-6 pb-16 pt-20 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: `radial-gradient(120% 90% at 85% 0%, #13284f 0%, ${NAVY} 65%)` }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow ar="الوجهات">Countries covered</Eyebrow>
              <h2 className={`${serifClass} mt-3 text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.05]`}>
                Choose a work permit destination
              </h2>
            </div>
            <p className="max-w-xl text-[14px] leading-relaxed text-white/55">
              Country cards use current XIPHIAS assets and connect directly to the resume intake below.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {workPermitCountries.map((country, index) => {
              const active = country.slug === selectedCountry.slug;
              return (
                <motion.button
                  key={country.slug}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: Math.min(index * 0.04, 0.22), duration: 0.42 }}
                  onClick={() => selectCountry(country)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border text-left transition duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: active ? GOLD : `${GOLD}33`,
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: active ? `0 0 0 1px ${GOLD}55` : undefined,
                  }}
                >
                  <div className="relative">
                    <Image
                      src={country.image}
                      alt={`${country.country} permit options`}
                      width={520}
                      height={320}
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 92vw"
                      className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${NAVY}e6 0%, transparent 60%)` }}
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <span
                          className="rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                          style={{ borderColor: `${GOLD}55`, background: "rgba(10,23,51,0.55)", color: GOLD }}
                        >
                          {country.code}
                        </span>
                        <h3 className={`${serifClass} mt-2 text-xl font-semibold text-white`}>
                          {country.country}
                        </h3>
                      </div>
                      {active ? <CheckCircle2 className="h-6 w-6" style={{ color: GOLD }} aria-hidden /> : null}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: `${GOLD}cc` }}>
                      {country.region}
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">
                      {country.processingSignal}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Route readiness + document readiness */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <motion.div
              key={`${selectedCountry.slug}-readiness`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <Eyebrow>{selectedCountry.country} permit intelligence</Eyebrow>
                  <h3 className={`${serifClass} mt-3 text-2xl font-semibold text-white`}>
                    Route readiness snapshot
                  </h3>
                </div>
                <Link
                  href={selectedCountry.href}
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-[13px] font-semibold text-white/85 transition-colors hover:bg-white/10"
                  style={{ borderColor: `${GOLD}55` }}
                >
                  View related programme <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {selectedCountry.routeReadiness.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border p-5"
                    style={{ borderColor: `${GOLD}26`, background: "rgba(255,255,255,0.03)" }}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                      {item.label}
                    </p>
                    <p className={`${serifClass} mt-2 text-xl font-semibold`} style={{ color: GOLD }}>
                      {item.value}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/55">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              key={`${selectedCountry.slug}-documents`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-2xl border p-6"
              style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
            >
              <Eyebrow>Document readiness</Eyebrow>
              <h3 className={`${serifClass} mt-3 text-2xl font-semibold text-white`}>
                What the advisor will ask for
              </h3>
              <div className="mt-5 grid gap-3">
                {selectedCountry.documentChecklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border px-4 py-3 text-[13.5px] font-medium text-white/75"
                    style={{ borderColor: `${GOLD}26`, background: "rgba(255,255,255,0.03)" }}
                  >
                    <FileText className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD }} aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTAKE: route context + resume form ── */}
      <section
        ref={intakeRef}
        id="work-permit-intake"
        data-tone="dark"
        className="relative isolate px-6 pb-24 pt-16 text-[#eef3fb] sm:px-12 lg:px-20"
        style={{ background: NAVY }}
      >
        <Ambient tone="dark" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Route context panel */}
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                  style={{ borderColor: `${GOLD}55`, background: "rgba(191,161,92,0.12)", color: GOLD }}
                >
                  <Globe2 className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <Eyebrow>Route context</Eyebrow>
                  <h2 className={`${serifClass} text-2xl font-semibold text-white`}>
                    {selectedCountry.country}
                  </h2>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {selectedCountry.permitTypes.map((type) => {
                  const on = selectedPermit === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedPermit(type)}
                      className="flex items-center justify-between rounded-xl border px-4 py-3 text-left text-[14px] font-semibold transition"
                      style={{
                        borderColor: on ? GOLD : `${GOLD}33`,
                        background: on ? "rgba(191,161,92,0.16)" : "rgba(255,255,255,0.03)",
                        color: on ? GOLD : "rgba(238,243,251,0.78)",
                      }}
                    >
                      {type}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  );
                })}
              </div>
              <div
                className="mt-6 rounded-2xl border p-5"
                style={{ borderColor: `${GOLD}26`, background: "rgba(255,255,255,0.03)" }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                  XIPHIAS will check
                </p>
                <div className="mt-4 grid gap-3">
                  {selectedCountry.advisorChecks.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-[13.5px] font-medium text-white/75">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD }} aria-hidden />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume intake form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border p-6"
              style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <Eyebrow>Resume intake</Eyebrow>
                  <h2 className={`${serifClass} mt-2 text-2xl font-semibold text-white`}>
                    Send your profile for permit review
                  </h2>
                  <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-white/55">
                    Your resume and contact details are emailed to the work permit desk and saved as an
                    X-Hub lead.
                  </p>
                </div>
                <div
                  className="rounded-full border px-3 py-1.5 text-[11px] font-semibold"
                  style={{ borderColor: `${GOLD}55`, background: "rgba(191,161,92,0.12)", color: GOLD }}
                >
                  {selectedCountry.country}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Your full name" required />
                <Field label="Email" name="email" type="email" placeholder="name@email.com" required />
                <Field label="Phone / WhatsApp" name="phone" placeholder="+91..." required />
                <Field label="Current role" name="currentRole" placeholder="Software engineer, manager..." />
                <label className="grid gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Experience
                  </span>
                  <select
                    name="experience"
                    className="h-12 rounded-xl border px-4 text-[14px] font-semibold text-white outline-none transition focus:ring-2 [&>option]:bg-[#0a1733] [&>option]:text-white"
                    style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.05)" }}
                    defaultValue="3-5 years"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = GOLD;
                      e.currentTarget.style.boxShadow = `0 0 0 2px ${GOLD}55`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = `${GOLD}40`;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option>0-2 years</option>
                    <option>3-5 years</option>
                    <option>6-10 years</option>
                    <option>10+ years</option>
                  </select>
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Selected permit direction
                  </span>
                  <input
                    value={`${selectedCountry.country} - ${selectedPermit}`}
                    readOnly
                    className="h-12 rounded-xl border px-4 text-[14px] font-semibold outline-none"
                    style={{ borderColor: `${GOLD}40`, background: "rgba(191,161,92,0.1)", color: GOLD }}
                  />
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Resume / CV
                  </span>
                  <span
                    className="group flex min-h-[128px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-6 text-center transition hover:bg-[rgba(191,161,92,0.12)]"
                    style={{ borderColor: `${GOLD}59`, background: "rgba(191,161,92,0.06)" }}
                  >
                    <UploadCloud
                      className="h-8 w-8 transition group-hover:-translate-y-0.5"
                      style={{ color: GOLD }}
                      aria-hidden
                    />
                    <span className="mt-3 text-[14px] font-semibold text-white">
                      {fileName || "Upload resume"}
                    </span>
                    <span className="mt-1 text-[12px] font-medium text-white/45">
                      PDF, DOC, DOCX, or TXT up to 6 MB
                    </span>
                    <input
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                      required
                      className="sr-only"
                      onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name || "")}
                    />
                  </span>
                </label>
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Notes for advisor
                  </span>
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Current country, target timeline, employer situation, family needs, or refusal history..."
                    className="rounded-xl border px-4 py-3 text-[14px] font-medium text-white outline-none transition placeholder:text-white/40 focus:ring-2"
                    style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.05)" }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = GOLD;
                      e.currentTarget.style.boxShadow = `0 0 0 2px ${GOLD}55`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = `${GOLD}40`;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </label>
              </div>

              <label className="mt-5 flex items-start gap-3 text-[13.5px] font-medium text-white/60">
                <input
                  name="consent"
                  type="checkbox"
                  value="true"
                  required
                  className="mt-1 h-4 w-4 rounded"
                  style={{ accentColor: GOLD }}
                />
                I agree that XIPHIAS may contact me about this work permit review.
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={submitState.status === "submitting"}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-7 py-3.5 text-[14px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ background: GOLD, color: NAVY }}
                >
                  {submitState.status === "submitting" ? "Sending..." : "Send resume for review"}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
                <p className="text-[12px] font-medium text-white/45">
                  Sent to the XIPHIAS work permit desk and stored in X-Hub leads.
                </p>
              </div>

              <AnimatePresence>
                {submitState.status === "success" ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    className="mt-5 rounded-2xl border p-4 text-[13.5px] font-semibold"
                    style={{ borderColor: `${GOLD}59`, background: "rgba(191,161,92,0.12)", color: GOLD }}
                  >
                    Resume received. Our work permit desk will review it and get back to you shortly.
                  </motion.div>
                ) : null}
                {submitState.status === "error" ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    className="mt-5 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-[13.5px] font-semibold text-red-300"
                  >
                    {submitState.message}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </form>
          </div>

          {/* Process steps */}
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {permitSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border p-5"
                style={{ borderColor: `${GOLD}33`, background: "rgba(255,255,255,0.04)" }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: GOLD, color: NAVY }}
                >
                  {index + 1}
                </div>
                <p className="mt-4 text-[14px] font-semibold text-white">{step}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white/55">
                  {index === 0
                    ? "CV and role signals are captured."
                    : index === 1
                      ? "Country and permit direction are shortlisted."
                      : index === 2
                        ? "Missing evidence is flagged."
                        : "A specialist reviews the next step."}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div
            className="mt-8 rounded-2xl border p-6 text-[13.5px] leading-relaxed text-white/70"
            style={{ borderColor: `${GOLD}33`, background: "rgba(191,161,92,0.06)" }}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0" style={{ color: GOLD }} aria-hidden />
              <p>
                Work permit review is not job placement and does not guarantee visa approval. XIPHIAS
                uses the resume and intake details to assess route-fit, document readiness, and whether
                advisor verification is needed before any filing strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-12 rounded-xl border px-4 text-[14px] font-semibold text-white outline-none transition placeholder:text-white/40 focus:ring-2"
        style={{ borderColor: `${GOLD}40`, background: "rgba(255,255,255,0.05)" }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = GOLD;
          e.currentTarget.style.boxShadow = `0 0 0 2px ${GOLD}55`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = `${GOLD}40`;
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </label>
  );
}
