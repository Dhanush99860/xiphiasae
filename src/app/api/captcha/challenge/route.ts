export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createChallenge } from "@/lib/captchaFallback";

/** Issues a fresh self-hosted captcha challenge (used when Turnstile is not configured). */
export async function GET() {
  return NextResponse.json(createChallenge(), {
    headers: { "Cache-Control": "no-store" },
  });
}
