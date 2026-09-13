import crypto from "crypto";

/**
 * Self-hosted "confirm you are not a robot" challenge.
 *
 * Used whenever Cloudflare Turnstile keys are not configured, so the forms
 * ALWAYS carry a real, verifiable human check instead of silently having none.
 *
 * The server issues a signed arithmetic challenge; the browser sends back the
 * answer with the signature. No third party, no account, no keys.
 */

const TTL_MS = 10 * 60 * 1000; // a challenge is valid for 10 minutes

function secret() {
  return (
    process.env.CAPTCHA_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.CONTENT_ADMIN_SECRET ||
    "xiphias-fallback-captcha"
  );
}

function sign(payload: string) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex").slice(0, 32);
}

export type Challenge = { question: string; exp: number; sig: string };

/** Build a fresh challenge. The answer is never sent to the client. */
export function createChallenge(): Challenge {
  const a = 1 + Math.floor(Math.random() * 8);
  const b = 1 + Math.floor(Math.random() * 8);
  const exp = Date.now() + TTL_MS;
  // The signature commits to the answer, so the client cannot alter either half.
  const sig = sign(`${a + b}:${exp}`);
  return { question: `What is ${a} + ${b}?`, exp, sig };
}

/**
 * Verify a token of the form "fallback:<answer>:<exp>:<sig>".
 * Returns true only for a correctly answered, unexpired, untampered challenge.
 */
export function verifyFallbackToken(token: string | undefined): { ok: boolean; reason?: string } {
  if (!token) return { ok: false, reason: "no challenge answer submitted" };

  const parts = token.split(":");
  if (parts.length !== 4 || parts[0] !== "fallback") return { ok: false, reason: "malformed token" };

  const [, answer, expRaw, sig] = parts;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp)) return { ok: false, reason: "bad expiry" };
  if (Date.now() > exp) return { ok: false, reason: "challenge expired" };

  const expected = sign(`${answer}:${exp}`);
  // Constant-time compare to avoid leaking the signature byte by byte.
  const a = Buffer.from(expected);
  const b = Buffer.from(sig || "");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "wrong answer" };
  }
  return { ok: true };
}
