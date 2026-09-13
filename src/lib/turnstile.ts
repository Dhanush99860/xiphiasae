/**
 * Cloudflare Turnstile — server-side token verification.
 *
 * Turnstile is the "confirm you are not a robot" check on the public forms. For
 * the overwhelming majority of real visitors it resolves silently with no puzzle
 * and no click.
 *
 * Set these in .env.local:
 *   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...   (public, rendered in the page)
 *   TURNSTILE_SECRET_KEY=0x4AAAAAAA...             (private, server only)
 *
 * Until the secret key is set, verification is SKIPPED rather than failing, so
 * adding this code cannot take the forms down before the keys are in place. The
 * honeypot and lead-quality scoring still apply in the meantime.
 */

import { verifyFallbackToken } from "@/lib/captchaFallback";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult = {
  ok: boolean;
  status: "passed" | "skipped" | "failed";
  reason?: string;
};

export function isTurnstileConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string | undefined, remoteIp?: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // No Turnstile keys -> fall back to the self-hosted challenge, which the forms
  // render in Turnstile's place. This means there is ALWAYS a real human check.
  if (!secret) {
    const fallback = verifyFallbackToken(token);
    return fallback.ok
      ? { ok: true, status: "passed", reason: "self-hosted challenge" }
      : { ok: false, status: "failed", reason: fallback.reason };
  }

  if (!token) return { ok: false, status: "failed", reason: "no turnstile token submitted" };

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      // Never let Cloudflare being slow hang a form submission.
      signal: AbortSignal.timeout(8000),
    });

    const data: { success?: boolean; ["error-codes"]?: string[] } = await res.json();
    if (data.success) return { ok: true, status: "passed" };

    return { ok: false, status: "failed", reason: (data["error-codes"] || []).join(", ") || "rejected" };
  } catch (err) {
    // Cloudflare unreachable — fail OPEN. A captcha outage must never cost a real
    // enquiry; the honeypot and lead scoring are still in force behind it.
    console.error("[turnstile] verification error, failing open", err);
    return { ok: true, status: "skipped", reason: "verify endpoint unreachable" };
  }
}

/** Best-effort client IP from the proxy headers IIS/Cloudflare put in front of us. */
export function clientIpFrom(headers: Headers) {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return headers.get("cf-connecting-ip") || headers.get("x-real-ip") || undefined;
}
