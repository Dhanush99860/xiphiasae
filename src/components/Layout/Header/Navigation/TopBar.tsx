'use client';

import * as React from 'react';
import Link from 'next/link';
import { Phone, Mail, Globe, LogIn } from 'lucide-react';
import GlobalSearch from '@/components/GlobalSearch';

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-[#0a1733] border-b border-gold/30">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div
          className="flex items-center justify-between py-2 px-0 text-[12.5px] leading-6 text-[#eef3fb]"
        >
          {/* Left — inline contact info */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919021335577"
              aria-label="Call +91 9021335577"
              className="group flex items-center gap-1.5 text-[#eef3fb]/70 hover:text-[#eef3fb] transition-colors duration-150"
            >
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gold/90 text-[#0a1733] shrink-0 group-hover:bg-gold transition-colors duration-150">
                <Phone className="h-3 w-3" aria-hidden />
              </span>
              <span className="font-medium tracking-wide">+91 9021335577</span>
            </a>

            <span className="h-4 w-px bg-gold/25" aria-hidden />

            <a
              href="mailto:immigration@xiphias.in"
              aria-label="Email immigration@xiphias.in"
              className="group flex items-center gap-1.5 text-[#eef3fb]/70 hover:text-[#eef3fb] transition-colors duration-150"
            >
              <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gold/90 text-[#0a1733] shrink-0 group-hover:bg-gold transition-colors duration-150">
                <Mail className="h-3 w-3" aria-hidden />
              </span>
              <span className="font-medium tracking-wide">immigration@xiphias.in</span>
            </a>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2.5">

            {/* Compact search icon */}
            <GlobalSearch compact />

            <span className="h-4 w-px bg-gold/25" aria-hidden />

            {/* Passport Power */}
            <Link
              href="/passport-index"
              className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[12px] font-bold text-[#0a1733] ring-1 ring-gold/30 hover:bg-gold_bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors duration-150"
            >
              <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Passport Power
            </Link>

            {/* Login icon */}
            <Link
              href="https://www.xiphiasimmigration.com/XIPHIAS/Account/Login"
              aria-label="Sign in to X-Hub"
              title="X-Hub Login"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-[#eef3fb] ring-1 ring-gold/20 hover:bg-gold/20 hover:ring-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 transition-colors duration-150"
            >
              <LogIn className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
