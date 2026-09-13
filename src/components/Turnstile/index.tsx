"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Cloudflare Turnstile — the "confirm you are not a robot" widget.
 *
 * Renders nothing at all when NEXT_PUBLIC_TURNSTILE_SITE_KEY is absent, so the
 * forms keep working normally until the keys are added. The server treats a
 * missing token as "skipped" in that case, never as a failure.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("turnstile script failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile script failed"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function isTurnstileEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export default function Turnstile({
  onToken,
  theme = "light",
  className = "",
}: {
  onToken: (token: string | undefined) => void;
  theme?: "light" | "dark" | "auto";
  className?: string;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [failed, setFailed] = useState(false);
  const domId = useId();

  // Keep the latest callback without re-rendering the widget.
  useEffect(() => { onTokenRef.current = onToken; }, [onToken]);

  useEffect(() => {
    if (!siteKey || !ref.current) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          theme,
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(undefined),
          "error-callback": () => onTokenRef.current(undefined),
        });
      })
      .catch(() => {
        if (cancelled) return;
        // Script blocked (ad-blocker, network). Fail open: let the submit through
        // and let the server-side scoring decide.
        setFailed(true);
        onTokenRef.current(undefined);
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try { window.turnstile.remove(widgetId.current); } catch { /* already gone */ }
      }
    };
  }, [siteKey, theme]);

  // No Turnstile key (or the script was blocked) -> show the self-hosted challenge
  // so every form always carries a visible human check.
  if (!siteKey || failed) {
    return <FallbackChallenge onToken={onToken} className={className} />;
  }

  return <div id={domId} ref={ref} className={className} />;
}

/**
 * Self-hosted "I'm not a robot" challenge, shown when Turnstile is unavailable.
 * Fetches a signed arithmetic question and emits a token the server can verify.
 */
function FallbackChallenge({
  onToken,
  className = "",
}: {
  onToken: (token: string | undefined) => void;
  className?: string;
}) {
  const [challenge, setChallenge] = useState<{ question: string; exp: number; sig: string } | null>(null);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const inputId = useId();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/captcha/challenge", { cache: "no-store" })
      .then((r) => r.json())
      .then((c) => { if (!cancelled) setChallenge(c); })
      .catch(() => { /* offline — submit is still gated by honeypot + scoring */ });
    return () => { cancelled = true; };
  }, []);

  // Emit the token only once the box is ticked and an answer is typed.
  useEffect(() => {
    if (!challenge || !checked || !answer.trim()) { onToken(undefined); return; }
    onToken(`fallback:${answer.trim()}:${challenge.exp}:${challenge.sig}`);
  }, [challenge, checked, answer, onToken]);

  return (
    <div className={`rounded-md border border-black/10 bg-black/[0.02] p-3 ${className}`}>
      <label className="flex items-center gap-2.5 text-[13px] font-medium text-current">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="h-4 w-4 accent-[#bfa15c]"
        />
        I&apos;m not a robot
      </label>

      {checked ? (
        <div className="mt-2.5 flex items-center gap-2">
          <label htmlFor={inputId} className="text-[12px] opacity-70">
            {challenge ? challenge.question : "Loading…"}
          </label>
          <input
            id={inputId}
            inputMode="numeric"
            autoComplete="off"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-16 rounded border border-black/15 bg-white px-2 py-1 text-[13px] text-[#0c1f3f]"
            aria-label="Answer to the verification question"
          />
        </div>
      ) : null}
    </div>
  );
}
