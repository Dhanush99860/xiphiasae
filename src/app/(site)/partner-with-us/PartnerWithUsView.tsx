"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/HomeLuxe/LuxeHeader";
import Footer from "@/components/HomeLuxe/LuxeFooter";
import Ambient from "@/components/HomeLuxe/Ambient";
import PartnerWithUsForm from "@/components/PartnerWithUs/PartnerWithUsForm";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Globe2,
  Handshake,
  Landmark,
  LineChart,
  ShieldCheck,
  UserRoundSearch,
  Users2,
} from "lucide-react";

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

const partnerTypes = [
  {
    icon: Landmark,
    title: "Private advisory and wealth firms",
    description:
      "We support advisors working with global investors by providing clear, structured solutions for residency and investment migration.",
  },
  {
    icon: Building2,
    title: "Corporations and global mobility teams",
    description:
      "We help businesses manage employee relocation, international hiring, and expansion into new countries without delays or confusion.",
  },
  {
    icon: Users2,
    title: "Strategic and referral partners",
    description:
      "We act as your backend support to deliver high-quality migration solutions while you stay in control of your client relationships.",
  },
];

const valueCards = [
  {
    icon: LineChart,
    title: "17+ years of industry experience",
    description:
      "Proven expertise across investment migration, corporate mobility, and skilled visa solutions.",
  },
  {
    icon: BadgeCheck,
    title: "6,000+ successful relocations",
    description:
      "A strong track record of delivering consistent results for clients worldwide.",
  },
  {
    icon: Globe2,
    title: "25+ global jurisdictions",
    description:
      "Coverage across leading residency, citizenship, and business migration destinations.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-first approach",
    description:
      "Every case is handled with strict adherence to regulations, accuracy, and reliability.",
  },
];

const privateConsultationFeatures = [
  {
    title: "IMC-led advisory",
    description:
      "Every case is guided by a certified IMC professional, ensuring informed decisions and the right migration pathway.",
  },
  {
    title: "Strategy before execution",
    description:
      "We define the right pathway before any commitment is made, so the engagement begins with clarity rather than assumption.",
  },
  {
    title: "Structured engagement process",
    description:
      "Qualified opportunities move from initial discussion into a private, strategy-led consultation with clear next steps and practical direction.",
  },
];

const whatYouGet = [
  "A strategy tailored to the client profile",
  "The most suitable visa or residency options",
  "Guidance to move the case forward",
  "Clear timelines and transparent costs",
];

const processSteps = [
  {
    number: "01",
    title: "Qualification and strategic fit",
    description:
      "We assess your business model and client requirements to define the right partnership approach, whether referral, white-label, or co-advisory.",
  },
  {
    number: "02",
    title: "Case evaluation and pathway mapping",
    description:
      "Each case is carefully reviewed and matched with the most suitable migration option before it moves any further.",
  },
  {
    number: "03",
    title: "Seamless and confidential execution",
    description:
      "We manage the process with discretion and clarity, allowing you to focus on your clients and business growth.",
  },
];

const heroChips = [
  "17+ years industry experience",
  "25+ jurisdictions",
  "6,000+ relocations",
  "Compliance-first delivery",
];

function Rise({
  children,
  delay = 0,
  reduce,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  ar,
  tone = "dark",
}: {
  children: React.ReactNode;
  ar?: string;
  tone?: "dark" | "light";
}) {
  const c = tone === "light" ? GOLD_DEEP : GOLD;
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: c }}>
      <span className="h-px w-10" style={{ background: c }} />
      {children}
      {ar ? (
        <span lang="ar" dir="rtl" className="font-arabic-display text-sm tracking-normal" style={{ color: `${c}cc` }}>
          {ar}
        </span>
      ) : null}
    </p>
  );
}

export default function PartnerWithUsView({ serifClass }: { serifClass: string }) {
  const reduce = useReducedMotion();

  return (
    <main style={{ background: NAVY, color: "#fff" }}>
      <Header serifClass={serifClass} />

      {/* ───────── HERO + FEATURED SPOTLIGHT (dark) ───────── */}
      <section
        data-tone="dark"
        aria-labelledby="partner-with-us-title"
        className="relative overflow-hidden px-6 pb-24 pt-36 md:px-10 lg:px-16"
        style={{ background: `radial-gradient(120% 90% at 50% 0%, #13284f 0%, ${NAVY} 60%)`, color: "#fff" }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div>
            <Rise reduce={reduce}>
              <Eyebrow ar="شراكة">Trusted experts in global relocation</Eyebrow>
            </Rise>

            <Rise reduce={reduce} delay={0.1}>
              <h1
                id="partner-with-us-title"
                className={`${serifClass} mt-6 max-w-3xl text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.0]`}
              >
                Your partner in <span className="italic" style={{ color: GOLD }}>global mobility</span> and migration
              </h1>
            </Rise>

            <Rise reduce={reduce} delay={0.18}>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/65 md:text-base">
                At XIPHIAS, we do not just process applications. We build structured, end-to-end global mobility
                solutions for businesses, partner firms, and professional networks operating across international
                markets. From the first eligibility assessment to final execution, we function as your dedicated
                backend partner with precision, regulatory compliance, and a clear strategic roadmap.
              </p>
            </Rise>

            <Rise reduce={reduce} delay={0.24}>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/50">
                Whether you are supporting high-net-worth individuals, skilled professionals, or corporate expansion
                plans, our systems are designed to scale without compromising accuracy or timelines.
              </p>
            </Rise>

            <Rise reduce={reduce} delay={0.3}>
              <ul className="mt-8 flex flex-wrap gap-2.5 text-xs sm:text-sm">
                {heroChips.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-medium text-white/70"
                    style={{ border: "1px solid rgba(191,161,92,0.32)", background: "rgba(255,255,255,0.03)" }}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" style={{ color: GOLD }} />
                    {item}
                  </li>
                ))}
              </ul>
            </Rise>

            <Rise reduce={reduce} delay={0.36}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#partner-form"
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Discuss a partnership
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Link
                  href="/personal-booking"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
                  style={{ border: "1px solid rgba(191,161,92,0.4)" }}
                >
                  View Personal Booking
                </Link>
              </div>
            </Rise>
          </div>

          {/* FEATURED spotlight — private consultation */}
          <Rise reduce={reduce} delay={0.34}>
            <aside
              className="rounded-3xl p-8 md:p-9"
              style={{ border: "1px solid rgba(191,161,92,0.4)", background: "rgba(255,255,255,0.03)" }}
            >
              <span className={`${serifClass} block text-[clamp(2.6rem,6vw,4rem)] font-medium leading-none`} style={{ color: GOLD }}>
                01
              </span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                Private consultation
              </p>
              <h2 className={`${serifClass} mt-3 text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-tight`}>
                Clarity. Direction. Execution.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-white/60">
                A one-on-one session to understand the requirement and guide the case towards the right migration path
                clearly and practically.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                {["Tailored strategy", "Right pathway options", "Transparent next steps"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium text-white/70"
                    style={{ border: "1px solid rgba(191,161,92,0.32)" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} aria-hidden />
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                prefetch={false}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                style={{ background: GOLD, color: NAVY }}
              >
                Book Strategy Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </aside>
          </Rise>
        </div>
      </section>

      {/* ───────── WHO WE PARTNER WITH (light) ───────── */}
      <section
        data-tone="light"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: "#fbfaf7", color: INK }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Rise reduce={reduce}>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD_DEEP }}>
              <Handshake className="h-3.5 w-3.5" />
              Who we partner with
            </span>
            <h2 className={`${serifClass} mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`} style={{ color: INK }}>
              Built for firms that need <span className="italic" style={{ color: GOLD_DEEP }}>reliable</span> mobility execution
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7" style={{ color: "rgba(12,31,63,0.6)" }}>
              We work with selected firms and professional networks that need reliable support for handling global
              mobility and migration matters with accuracy, consistency, and clear strategic direction.
            </p>
          </Rise>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {partnerTypes.map(({ icon: Icon, title, description }, i) => (
              <Rise key={title} reduce={reduce} delay={0.05 * i}>
                <article
                  className="flex h-full flex-col rounded-2xl p-7"
                  style={{ border: "1px solid rgba(168,125,31,0.22)", background: "#fff" }}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ border: "1px solid rgba(168,125,31,0.3)", color: GOLD_DEEP }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`${serifClass} mt-5 text-[1.4rem] font-medium leading-snug`} style={{ color: INK }}>
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "rgba(12,31,63,0.6)" }}>
                    {description}
                  </p>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY PARTNERS CHOOSE XIPHIAS (dark) ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: NAVY, color: "#fff" }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Rise reduce={reduce}>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              <BadgeCheck className="h-3.5 w-3.5" />
              The XIPHIAS advantage
            </span>
            <h2 className={`${serifClass} mt-4 max-w-2xl text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-tight`}>
              Why partners choose XIPHIAS
            </h2>
          </Rise>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {valueCards.map(({ icon: Icon, title, description }, i) => (
              <Rise key={title} reduce={reduce} delay={0.04 * i}>
                <article
                  className="flex h-full flex-col rounded-2xl p-7 transition-colors hover:border-[#bfa15c]"
                  style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ border: "1px solid rgba(191,161,92,0.32)", color: GOLD }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`${serifClass} mt-5 text-[1.3rem] font-medium leading-snug`}>{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">{description}</p>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PRIVATE CONSULTATION (light) ───────── */}
      <section
        data-tone="light"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: "#f7f4ef", color: INK }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Rise reduce={reduce}>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD_DEEP }}>
              <UserRoundSearch className="h-3.5 w-3.5" />
              Private consultation
            </span>
            <h2 className={`${serifClass} mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.06]`} style={{ color: INK }}>
              Clarity. Direction. <span className="italic" style={{ color: GOLD_DEEP }}>Execution.</span>
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7" style={{ color: "rgba(12,31,63,0.6)" }}>
              Qualified opportunities move into a private, strategy-led consultation for investors and professionals
              seeking clarity, direction, and expert guidance. This is where we align the right migration pathway
              before formal execution begins.
            </p>
          </Rise>

          <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {privateConsultationFeatures.map((item, i) => (
              <Rise key={item.title} reduce={reduce} delay={0.05 * i}>
                <article
                  className="flex h-full flex-col rounded-2xl p-7"
                  style={{ border: "1px solid rgba(168,125,31,0.22)", background: "#fff" }}
                >
                  <span className={`${serifClass} text-3xl font-medium`} style={{ color: GOLD_DEEP }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`${serifClass} mt-3 text-[1.3rem] font-medium leading-snug`} style={{ color: INK }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: "rgba(12,31,63,0.6)" }}>
                    {item.description}
                  </p>
                </article>
              </Rise>
            ))}
          </div>

          <Rise reduce={reduce} delay={0.12}>
            <div className="mt-8 rounded-2xl p-7" style={{ border: "1px solid rgba(168,125,31,0.22)", background: "#fff" }}>
              <h3 className={`${serifClass} text-[1.4rem] font-medium`} style={{ color: INK }}>
                What you get
              </h3>
              <ul className="mt-4 grid gap-3 text-sm leading-7 sm:grid-cols-2" style={{ color: "rgba(12,31,63,0.72)" }}>
                {whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD_DEEP }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/personal-booking"
                  prefetch={false}
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                  style={{ background: GOLD, color: NAVY }}
                >
                  View Personal Booking
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors"
                  style={{ border: "1px solid rgba(168,125,31,0.4)", color: GOLD_DEEP }}
                >
                  Contact
                </Link>
              </div>
            </div>
          </Rise>
        </div>
      </section>

      {/* ───────── HOW OUR PARTNERSHIP WORKS (dark) ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: NAVY, color: "#fff" }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Rise reduce={reduce}>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Operating model
            </span>
            <h2 className={`${serifClass} mt-4 max-w-2xl text-[clamp(1.8rem,3.8vw,2.8rem)] font-medium leading-tight`}>
              How our partnership works
            </h2>
          </Rise>

          <div className="mt-12 flex flex-col gap-6">
            {processSteps.map((step, i) => (
              <Rise key={step.number} reduce={reduce} delay={0.05 * i}>
                <div
                  className="grid gap-6 rounded-2xl p-7 md:grid-cols-[auto_1fr] md:items-center"
                  style={{ border: "1px solid rgba(191,161,92,0.22)", background: "rgba(255,255,255,0.02)" }}
                >
                  <span className={`${serifClass} text-[clamp(2.4rem,5vw,3.4rem)] font-medium leading-none`} style={{ color: GOLD }}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className={`${serifClass} text-[1.4rem] font-medium leading-snug`}>{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/55">{step.description}</p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PARTNER ENQUIRY FORM (light) ───────── */}
      <section
        id="partner-form"
        data-tone="light"
        className="relative overflow-hidden px-6 py-24 md:px-10 lg:px-16"
        style={{ background: "#f3f7fd", color: INK }}
      >
        <Ambient tone="light" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <div>
            <Rise reduce={reduce}>
              <Eyebrow ar="تواصل معنا" tone="light">Start the conversation</Eyebrow>
            </Rise>
            <Rise reduce={reduce} delay={0.1}>
              <h2 className={`${serifClass} mt-5 text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.02]`} style={{ color: INK }}>
                Let&apos;s build a <span className="italic" style={{ color: GOLD_DEEP }}>partnership</span>.
              </h2>
            </Rise>
            <Rise reduce={reduce} delay={0.16}>
              <p className="mt-5 max-w-md text-[15px] leading-7" style={{ color: "rgba(12,31,63,0.6)" }}>
                Tell us who you are and the kind of partnership you have in mind. A senior member of our partnerships
                desk will respond personally, usually within one business day.
              </p>
            </Rise>
            <Rise reduce={reduce} delay={0.22}>
              <ul className="mt-8 flex flex-col gap-5">
                {whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-t pt-5" style={{ borderColor: "rgba(12,31,63,0.12)" }}>
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: GOLD_DEEP }} />
                    <span className="text-[15px] leading-6" style={{ color: "rgba(12,31,63,0.72)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>

          <Rise reduce={reduce} delay={0.18}>
            {/* The form is a self-contained client component (PartnerWithUsForm) whose
                internal field markup uses the legacy sand/gold tokens. We keep its
                logic, fields and endpoint untouched, and present it inside a navy/gold
                spotlight card to match the Spotlight Feature aesthetic. */}
            <div
              className="rounded-3xl p-2 sm:p-3"
              style={{ border: "1px solid rgba(191,161,92,0.4)", background: NAVY, boxShadow: "0 40px 110px -50px rgba(0,0,0,0.7)" }}
            >
              <PartnerWithUsForm />
            </div>
          </Rise>
        </div>
      </section>

      {/* ───────── CLOSING CTA (dark) ───────── */}
      <section
        data-tone="dark"
        className="relative overflow-hidden px-6 py-28 md:px-10 lg:px-16"
        style={{ background: NAVY, color: "#fff" }}
      >
        <Ambient tone="dark" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Rise reduce={reduce}>
            <h2 className={`${serifClass} text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.04]`}>
              The same standard, <span className="italic" style={{ color: GOLD }}>for your clients</span>.
            </h2>
          </Rise>
          <Rise reduce={reduce} delay={0.12}>
            <Link
              href="/contact"
              prefetch={false}
              className="group mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Book a private consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Rise>
        </div>
      </section>

      <Footer serifClass={serifClass} />
    </main>
  );
}
