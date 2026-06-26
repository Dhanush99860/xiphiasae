// src/components/PersonalBooking/Expert/index.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { BOOKING_PAID_ROUTE } from "@/components/PersonalBooking/booking-flow";

import {
  Calendar,
  Globe,
  ShieldCheck,
  Sparkles,
  Award,
  ExternalLink,
} from "lucide-react";

type Highlight = { icon: React.ReactNode; text: React.ReactNode };
type Fact = { label: string; value: string };
type CredentialLogo = {
  name: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
  width: number;
  height: number;
};

/* ------------------------------ Content ------------------------------ */

const NAME = "Varun Singh";
const ROLE = "Managing Director, XIPHIAS Immigration";

const PORTRAIT_SRC: string = "/images/avtar/varun-singh-md-xiphias.jpg";
/** Set to an MP4 path if you want video; keep empty string to force portrait image */
const VIDEO_SRC: string | undefined = ""; // e.g. "/videos/varun-singh.mp4"

/** SAFE narrowing: never call .trim() until we've proven it's a string */
const HAS_VIDEO: boolean =
  typeof VIDEO_SRC === "string" && VIDEO_SRC.trim().length > 0;

// Keep copy neutral (no unverified claims)
const BIO: string =
  "With more than 17 years of experience, Varun Singh, MD, Cert IMC, is an experienced advisor in international immigration and investment migration, known for his focus on integrity, precision, and client service as Managing Director of XIPHIAS Immigration.";

const HIGHLIGHTS: Highlight[] = [
  {
    icon: <Award className="w-5 h-5 text-gold relative z-10" />,
    text: <>17+ years of experience & IMC-certified leadership</>,
  },
  {
    icon: <Globe className="w-5 h-5 text-gold relative z-10" />,
    text: <>Customised advice on investments and corporate migration</>,
  },
  {
    icon: <Sparkles className="w-5 h-5 text-gold relative z-10" />,
    text: <>Solutions for family migration, residency, and international mobility</>,
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-gold relative z-10" />,
    text: <>Global regulatory edge and client-centric excellence</>,
  },
];

const FACTS: Fact[] = [
  { label: "Role", value: "Managing Director" },
  { label: "Credentials", value: "FIMC (IMC Fellow), Cert IM" },
  { label: "Focus", value: "Advisory for elite global clients" },
  { label: "Programs", value: "Specialisation in investment & corporate mobility" },
];

const CREDENTIAL_LOGOS: CredentialLogo[] = [
  {
    name: "IMC Fellow Directory",
    href: "https://investmentmigration.org/fellow-members-directory/",
    logoSrc: "/images/personal/credentials/imc-fellow-logo.svg",
    logoAlt: "IMC Fellow members directory logo",
    width: 500,
    height: 200,
  },
  {
    name: "IMI Professionals",
    href: "https://www.imidaily.com/imi-professionals/",
    logoSrc: "/images/personal/credentials/imi-professionals-logo.png",
    logoAlt: "IMI Professionals logo",
    width: 344,
    height: 163,
  },
];

/* ----------------------------- Component ----------------------------- */

const GOLD = "#bfa15c";
const GOLD_DEEP = "#a87d1f";
const NAVY = "#0a1733";
const INK = "#0c1f3f";

export default function Expert({ serifClass = "" }: { serifClass?: string }) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Respect reduced motion (no autoplay even if you add it later)
  React.useEffect(() => {
    const mq =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (!mq || !videoRef.current) return;
    if (mq.matches) videoRef.current.pause();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-5">
      <section
        className={[
          "relative w-full py-16 sm:py-24",
          "overflow-hidden",
        ].join(" ")}
        style={{ background: "#fbfaf7", color: INK }}
        aria-labelledby="expert-title"
      >
        {/* Background accents — gold guiding glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(191,161,92,0.10)" }} />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(191,161,92,0.06)" }} />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
            {/* LEFT: Content */}
            <div className="space-y-6 text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] backdrop-blur"
                style={{ border: "1px solid rgba(168,125,31,0.4)", color: "rgba(12,31,63,0.7)" }}
              >
                <ShieldCheck className="h-4 w-4" style={{ color: GOLD_DEEP }} />
                Trusted advisor
              </div>

              <div>
                <h2
                  id="expert-title"
                  className={`${serifClass} text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.05]`}
                  style={{ color: INK }}
                >
                  Meet{" "}
                  <span className="italic" style={{ color: GOLD_DEEP }}>
                    {NAME}
                  </span>
                </h2>
                <p className="mt-2 text-sm font-medium" style={{ color: "rgba(12,31,63,0.7)" }}>
                  {ROLE}
                </p>
              </div>

              <p className="mx-auto max-w-2xl text-base leading-relaxed md:mx-0" style={{ color: "rgba(12,31,63,0.6)" }}>
                {BIO}
              </p>

              {/* Highlights */}
              <h3 className={`${serifClass} pt-1 text-xl font-medium sm:text-2xl`} style={{ color: INK }}>
                Focus &amp; impact
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {HIGHLIGHTS.map((item: Highlight, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 transition"
                    style={{ border: "1px solid rgba(168,125,31,0.22)" }}
                  >
                    <div
                      className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full"
                      style={{ border: "1px solid rgba(191,161,92,0.4)", background: "rgba(191,161,92,0.1)" }}
                    >
                      {item.icon}
                    </div>
                    <p className="text-[15px] leading-relaxed sm:text-base" style={{ color: "rgba(12,31,63,0.7)" }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Facts row */}
              {/* <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-slate-600 dark:text-slate-400 md:justify-start">
                {FACTS.map((f: Fact) => (
                  <span
                    key={`${f.label}-${f.value}`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 dark:border-slate-700 dark:bg-slate-800/60"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="font-medium">{f.label}:</span> {f.value}
                  </span>
                ))}
              </div> */}

              {/* Credential logos */}
              <div className="pt-1">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(12,31,63,0.45)" }}>
                  Verified memberships
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  {CREDENTIAL_LOGOS.map((item: CredentialLogo) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 transition focus:outline-none focus-visible:ring-2"
                      style={{ border: "1px solid rgba(168,125,31,0.28)" }}
                      aria-label={`${item.name} (opens in a new tab)`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.logoSrc}
                        alt={item.logoAlt}
                        width={item.width}
                        height={item.height}
                        className="h-8 w-auto object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="text-xs font-medium" style={{ color: "rgba(12,31,63,0.7)" }}>
                        {item.name}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 transition" style={{ color: "rgba(12,31,63,0.45)" }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col items-center gap-3 pt-3 sm:flex-row md:items-start">
                <Link
                  href={BOOKING_PAID_ROUTE}
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] transition-transform hover:-translate-y-0.5"
                  style={{ background: GOLD, color: NAVY }}
                  aria-label="Reserve your consultation"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Reserve your consultation</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] transition"
                  style={{ border: "1px solid rgba(168,125,31,0.4)", color: INK }}
                >
                  About XIPHIAS
                </Link>
              </div>
            </div>

            {/* RIGHT: Media (portrait if no video; landscape if video) */}
            <div
              className={[
                "relative order-first overflow-hidden rounded-3xl shadow-2xl",
                "bg-white",
                HAS_VIDEO ? "aspect-[16/9]" : "aspect-[4/5]",
                "md:order-none",
              ].join(" ")}
              style={{ border: "1px solid rgba(168,125,31,0.3)" }}
            >
              {/* gloss */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ background: "linear-gradient(to top right, rgba(191,161,92,0.15), transparent 60%)" }}
              />
              {HAS_VIDEO ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={PORTRAIT_SRC}
                >
                  <source src={VIDEO_SRC} type="video/mp4" />
                  Your browser does not support video.
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={PORTRAIT_SRC}
                  alt={`${NAME} portrait`}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
                />
              )}

              {/* badge */}
              <div
                className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs shadow backdrop-blur"
                style={{ border: "1px solid rgba(168,125,31,0.4)", background: "rgba(251,250,247,0.85)", color: "rgba(12,31,63,0.7)" }}
              >
                <ShieldCheck className="h-4 w-4" style={{ color: GOLD_DEEP }} />
                Verified expert
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
