"use client";

import Link from "next/link";
import React from "react";

import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentInput,
} from "@/lib/cookies/consent";

declare global {
  interface Window {
    showCookiePreferences?: () => void;
  }
}

const DEFAULT_PREFS: CookieConsentInput = {
  analytics: false,
  marketing: false,
  experience: false,
};

export default function CookieConsentManager() {
  const [ready, setReady] = React.useState(false);
  const [hasSavedChoice, setHasSavedChoice] = React.useState(false);
  const [showPrompt, setShowPrompt] = React.useState(false);
  const [showPreferences, setShowPreferences] = React.useState(false);
  const [prefs, setPrefs] = React.useState<CookieConsentInput>(DEFAULT_PREFS);

  React.useEffect(() => {
    const existing = readCookieConsent();
    if (existing) {
      setHasSavedChoice(true);
      setPrefs({
        analytics: existing.analytics,
        marketing: existing.marketing,
        experience: existing.experience,
      });
    } else {
      setHasSavedChoice(false);
      setShowPrompt(true);
    }
    setReady(true);
  }, []);

  const isVisible = showPrompt || showPreferences;

  const openPreferences = React.useCallback(() => {
    setShowPreferences(true);
    setShowPrompt(false);
  }, []);

  React.useEffect(() => {
    window.showCookiePreferences = openPreferences;
    return () => {
      if (window.showCookiePreferences === openPreferences) {
        delete window.showCookiePreferences;
      }
    };
  }, [openPreferences]);

  React.useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#open-cookie-preferences") {
        openPreferences();
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [openPreferences]);

  const savePreferences = React.useCallback((next: CookieConsentInput) => {
    writeCookieConsent(next);
    setPrefs(next);
    setHasSavedChoice(true);
    setShowPrompt(false);
    setShowPreferences(false);
  }, []);

  const acceptAll = React.useCallback(() => {
    savePreferences({ analytics: true, marketing: true, experience: true });
  }, [savePreferences]);

  const rejectAllOptional = React.useCallback(() => {
    savePreferences({ analytics: false, marketing: false, experience: false });
  }, [savePreferences]);

  const saveSelected = React.useCallback(() => {
    savePreferences(prefs);
  }, [prefs, savePreferences]);

  const closePopup = React.useCallback(() => {
    if (!hasSavedChoice) return;
    setShowPreferences(false);
    setShowPrompt(false);
  }, [hasSavedChoice]);

  React.useEffect(() => {
    if (!isVisible || !hasSavedChoice) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVisible, hasSavedChoice, closePopup]);

  React.useEffect(() => {
    if (!showPreferences) return; // only the full modal locks scroll — not the slim banner
    const docEl = document.documentElement;
    const prevOverflow = docEl.style.overflow;
    const prevPadRight = docEl.style.paddingRight;
    const scrollbarWidth = window.innerWidth - docEl.clientWidth;

    docEl.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      docEl.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      docEl.style.overflow = prevOverflow;
      docEl.style.paddingRight = prevPadRight;
    };
  }, [isVisible]);

  if (!ready || !isVisible) return null;

  return (
    <>
      {/* First-visit: a slim, non-occluding bottom banner. It never covers the
          hero, doesn't lock scroll, and can't become the LCP element. */}
      {showPrompt && !showPreferences ? (
        <div className="fixed inset-x-0 bottom-0 z-[2147483200] border-t border-gold/45 bg-white/95 px-4 py-3.5 font-sora text-ink shadow-[0_-8px_30px_rgba(0,0,0,0.18)] backdrop-blur sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-6 text-ink/70">
              We use essential cookies to run the site and optional cookies for analytics, marketing and personalization.{" "}
              <Link href="/cookies" className="font-medium text-gold underline underline-offset-4 hover:opacity-80">Learn more</Link>
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <button type="button" onClick={openPreferences} className="rounded-full border border-gold/45 px-4 py-2 text-[13px] font-semibold text-ink/75 transition-colors hover:border-gold/70 hover:text-gold">Preferences</button>
              <button type="button" onClick={rejectAllOptional} className="rounded-full border border-gold/45 px-4 py-2 text-[13px] font-semibold text-ink/75 transition-colors hover:border-gold/70 hover:text-gold">Reject all</button>
              <button type="button" onClick={acceptAll} className="rounded-full bg-gold px-5 py-2 text-[13px] font-semibold text-midnight transition-colors hover:brightness-110">Accept all</button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Full preference modal — only when the user opens it (post-LCP, intentional). */}
      {showPreferences ? (
        <div
          className="fixed inset-0 z-[2147483200] bg-sand/70 p-4 backdrop-blur-[2px] sm:p-6"
          onClick={hasSavedChoice ? closePopup : undefined}
        >
          <div className="flex min-h-full items-center justify-center">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-pref-title"
          className="max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-2xl border border-gold/45 bg-white p-5 font-sora text-ink shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:p-7"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2
                id="cookie-pref-title"
                className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                Cookie preferences
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink/55 sm:text-[15px]">
                We use essential cookies for site operation and optional cookies
                for analytics, marketing, and personalized experience.
              </p>
              <p className="mt-1 text-sm leading-6 text-ink/55 sm:text-[15px]">
                You can update your choice anytime from our cookies page.
              </p>
            </div>

            {hasSavedChoice ? (
              <button
                type="button"
                onClick={closePopup}
                aria-label="Close cookie preferences"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/45 text-ink/60 transition-colors hover:border-gold/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                x
              </button>
            ) : null}
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-gold/45">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <PreferenceTile
                label="Necessary"
                description="Required for core website functionality."
                checked
                disabled
                className="border-b border-gold/45 sm:border-r"
              />
              <PreferenceTile
                label="Analytics"
                description="Helps us understand usage and improve content."
                checked={prefs.analytics}
                onChange={(checked) =>
                  setPrefs((prev) => ({ ...prev, analytics: checked }))
                }
                className="border-b border-gold/45"
              />
              <PreferenceTile
                label="Marketing"
                description="Supports campaign measurement and remarketing."
                checked={prefs.marketing}
                onChange={(checked) =>
                  setPrefs((prev) => ({ ...prev, marketing: checked }))
                }
                className="border-b border-gold/45 sm:border-b-0 sm:border-r"
              />
              <PreferenceTile
                label="Experience"
                description="Stores personalized UI and content preferences."
                checked={prefs.experience}
                onChange={(checked) =>
                  setPrefs((prev) => ({ ...prev, experience: checked }))
                }
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid w-full grid-cols-1 gap-3 sm:w-auto sm:grid-cols-2">
              <button
                type="button"
                onClick={rejectAllOptional}
                className="rounded-xl border border-gold/45 bg-sand/50 px-4 py-2.5 text-sm font-semibold text-ink/80 transition-colors hover:border-gold/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-xl bg-gold px-4 py-2.5 text-sm font-semibold text-midnight transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                Accept all
              </button>
            </div>
            <button
              type="button"
              onClick={saveSelected}
              className="text-sm font-medium text-gold underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              Save selected
            </button>
          </div>

          <div className="mt-3 border-t border-gold/45 pt-3 text-center sm:text-left">
            <Link
              href="/cookies"
              className="text-sm font-medium text-ink/70 underline underline-offset-4 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              Learn more
            </Link>
          </div>
        </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PreferenceTile({
  label,
  description,
  checked,
  disabled,
  onChange,
  className,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <div className={`bg-sand/40 px-4 py-5 sm:px-5 sm:py-6 ${className ?? ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink sm:text-base">
            {label}
          </p>
          <p className="mt-1 text-xs leading-5 text-ink/45 sm:text-sm">
            {description}
          </p>
        </div>
        <label className="relative inline-flex items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            disabled={disabled}
            onChange={(event) => onChange?.(event.currentTarget.checked)}
          />
          <span
            className={[
              "h-7 w-12 rounded-full transition-colors",
              disabled
                ? "bg-gold/60"
                : "bg-pearl/15 peer-checked:bg-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold/50",
            ].join(" ")}
          />
          <span className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-pearl shadow transition-transform peer-checked:translate-x-5 peer-checked:bg-sand" />
        </label>
      </div>
    </div>
  );
}
