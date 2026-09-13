/**
 * Lead quality scoring — server-side spam / bot detection for public forms.
 *
 * Tuned against ~2 months of real xiphiasimmigration.ae submissions. The bot
 * traffic hitting this site has a very consistent signature:
 *
 *   name:    "eWmtcrFHhpbjpSKQ", "LLJGiLnuSPLDgXFKAfZBKWLC"  (random glyphs)
 *   email:   "u.j.upuq.ab.il.o.r14@gmail.com"                (dot-stuffed alias)
 *   message: "ETlmgfqqKgziHItcDZarxA"                        (random glyphs)
 *
 * Scoring is additive; anything at or above SPAM_THRESHOLD is rejected. Keeping
 * it additive means no single weak signal can bin a real enquiry on its own —
 * a genuine lead with an odd name still passes if the rest of it reads human.
 */

export const SPAM_THRESHOLD = 5;

export type LeadQuality = {
  score: number;
  isSpam: boolean;
  reasons: string[];
};

export type LeadInput = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** Hidden honeypot field — must stay empty for a human. */
  honeypot?: string;
  /** Milliseconds between form render and submit, when the client reports it. */
  elapsedMs?: number;
};

/** Vowel-less / random-looking glyph runs, e.g. "Xewpik Nhxarly" or "zQNPWgWt". */
function gibberishScore(raw: string): number {
  const text = raw.replace(/[^A-Za-z]/g, "");
  if (text.length < 6) return 0;

  let score = 0;
  const lower = text.toLowerCase();
  const vowels = (lower.match(/[aeiou]/g) || []).length;
  const vowelRatio = vowels / lower.length;

  // Human words in every language this site serves sit roughly 25–60% vowels.
  if (vowelRatio < 0.2) score += 2;
  else if (vowelRatio > 0.75) score += 1;

  // Long consonant runs: "Nhxarly", "Kjdrwsohu", "zQNPWgWt".
  if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(lower)) score += 2;

  // Random camel/caps flipping mid-word: "eWmtcrFHhpbjpSKQ".
  const caseFlips = (text.match(/[a-z][A-Z]/g) || []).length;
  if (caseFlips >= 3) score += 2;

  // No repeated letters at all across a long string is unusual for real names.
  if (text.length >= 12 && new Set(lower).size / lower.length > 0.92) score += 1;

  return score;
}

/** Dot-stuffed Gmail aliases: "u.j.upuq.ab.il.o.r14@gmail.com". */
function emailScore(email: string): number {
  const value = email.trim().toLowerCase();
  if (!value) return 0;

  let score = 0;
  const local = value.split("@")[0] ?? "";
  const domain = value.split("@")[1] ?? "";

  const dots = (local.match(/\./g) || []).length;
  if (dots >= 4) score += 3;
  else if (dots === 3) score += 2;

  // Single-letter segments strung together — "u.j.upuq.ab.il.o.r14".
  const segments = local.split(".");
  const singles = segments.filter((s) => s.length === 1).length;
  if (singles >= 3) score += 2;

  score += Math.min(gibberishScore(local.replace(/\./g, "")), 2);

  // Throwaway inboxes.
  if (/^(mailinator|guerrillamail|10minutemail|tempmail|yopmail|trashmail|sharklasers|dispostable)\./.test(domain)) {
    score += 4;
  }

  return score;
}

function messageScore(message: string): number {
  const text = message.trim();
  if (!text) return 0;

  let score = 0;

  // A single random token with no spaces — "ETlmgfqqKgziHItcDZarxA".
  if (text.length >= 12 && !/\s/.test(text)) score += Math.min(gibberishScore(text) + 1, 4);
  else score += Math.min(gibberishScore(text), 2);

  // Link spam / SEO outreach.
  const links = (text.match(/https?:\/\//g) || []).length;
  if (links >= 3) score += 3;
  else if (links >= 1 && text.length < 200) score += 1;

  if (/\b(seo|backlink|guest post|rank your site|crypto|casino|viagra|loan offer)\b/i.test(text)) {
    score += 3;
  }

  return score;
}

function phoneScore(phone: string): number {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return 0;
  if (/^(\d)\1+$/.test(digits)) return 3;               // 0000000000
  if (/^(0123456789|1234567890|9876543210)$/.test(digits)) return 3;
  if (digits.length < 7 || digits.length > 15) return 2; // outside E.164
  return 0;
}

export function scoreLead(input: LeadInput): LeadQuality {
  const reasons: string[] = [];
  let score = 0;

  // Honeypot: a hidden field no human ever sees. Instant rejection.
  if (input.honeypot && input.honeypot.trim()) {
    return { score: 99, isSpam: true, reasons: ["honeypot filled"] };
  }

  // Sub-2s submissions are automated; humans cannot type a form that fast.
  if (typeof input.elapsedMs === "number" && input.elapsedMs >= 0 && input.elapsedMs < 2000) {
    score += 4;
    reasons.push(`submitted in ${input.elapsedMs}ms`);
  }

  const nameScore = gibberishScore(input.name || "");
  if (nameScore) {
    score += nameScore;
    reasons.push(`name looks random (+${nameScore})`);
  }

  const mailScore = emailScore(input.email || "");
  if (mailScore) {
    score += mailScore;
    reasons.push(`email looks generated (+${mailScore})`);
  }

  const msgScore = messageScore(input.message || "");
  if (msgScore) {
    score += msgScore;
    reasons.push(`message looks random (+${msgScore})`);
  }

  const telScore = phoneScore(input.phone || "");
  if (telScore) {
    score += telScore;
    reasons.push(`phone invalid (+${telScore})`);
  }

  return { score, isSpam: score >= SPAM_THRESHOLD, reasons };
}
