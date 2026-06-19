'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { SubmenuItem } from '../menu.types';
import { cx, flagEmojiFromCode, flagImageSrcFromCode } from '../menu.utils';

interface MegaPanelProps {
  rootLabel: string;
  columns: SubmenuItem[];
  open: boolean;
  onClose: () => void;
}

function MenuFlag({ code, emoji }: { code?: string | null; emoji?: string | null }) {
  const src = flagImageSrcFromCode(code);
  const [failed, setFailed] = React.useState(false);
  if (src && !failed) {
    return (
      <Image
        src={src} alt="" aria-hidden width={18} height={13} unoptimized
        className="mt-px h-[13px] w-[18px] shrink-0 rounded-[2px] object-cover ring-1 ring-black/10"
        onError={() => setFailed(true)}
      />
    );
  }
  if (!emoji) return null;
  return <span className="text-sm leading-none shrink-0">{emoji}</span>;
}

const MAX_VISIBLE = 5;

export default function MegaPanel({ rootLabel, columns, open, onClose }: MegaPanelProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const rafRef   = React.useRef<number | null>(null);

  const [query,    setQuery]    = React.useState('');
  const [panelTop, setPanelTop] = React.useState(84);

  const measureTop = React.useCallback(() => {
    const anchor = document.querySelector('[data-mega-anchor]') as HTMLElement | null;
    if (!anchor) return;
    setPanelTop(Math.round(anchor.getBoundingClientRect().bottom + 8));
  }, []);

  React.useEffect(() => {
    if (!open) return;
    measureTop();
    const tick = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measureTop);
    };
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open, measureTop]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const onDoc = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDoc);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDoc);
    };
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  React.useEffect(() => { if (!open) setQuery(''); }, [open]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return columns;
    return columns
      .map(c => {
        const nameMatch = c.label.toLowerCase().includes(q);
        const matched   = c.submenu?.filter(p => p.label.toLowerCase().includes(q)) ?? [];
        if (!nameMatch && matched.length === 0) return null;
        return nameMatch ? c : { ...c, submenu: matched };
      })
      .filter(Boolean) as SubmenuItem[];
  }, [columns, query]);

  if (!open) return null;

  const PANEL_MAX_H = `calc(72vh - ${panelTop}px)`;
  const BODY_MAX_H  = `calc(72vh - ${panelTop}px - 44px - 36px)`;

  return (
    <div
      className="fixed inset-x-0 z-[60] pointer-events-none"
      style={{ top: panelTop }}
    >
      <div className="w-full px-2 sm:px-4 pointer-events-auto">
        <div
          ref={panelRef}
          role="menu"
          aria-label={`${rootLabel} menu`}
          className="mega-panel-enter w-full overflow-hidden rounded-2xl backdrop-blur-2xl bg-white/75 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.30),0_4px_16px_rgba(0,0,0,0.10)] ring-1 ring-black/[0.08] dark:bg-zinc-900/70 dark:ring-white/10"
          style={{ maxHeight: PANEL_MAX_H }}
        >
          {/* ── Sticky header ── */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-200/60 bg-white/60 px-4 py-2.5 backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/60">
            <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Explore {rootLabel}
            </span>
            <label className="relative flex items-center">
              <Search className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-zinc-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Filter country or program…"
                className="w-52 rounded-lg border border-zinc-200/80 bg-white/70 py-1.5 pl-8 pr-3 text-[13px] text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-primary/40 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-200 dark:placeholder:text-zinc-500"
              />
            </label>
          </div>

          {/* ── Grid body ── */}
          <div
            className="overflow-y-auto overscroll-contain p-3"
            style={{ maxHeight: BODY_MAX_H, scrollbarGutter: 'stable both-edges' } as React.CSSProperties}
          >
            {filtered.length > 0 ? (
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}
              >
                {filtered.map(country => {
                  const any     = country as any;
                  const code    = any.code ?? any?.meta?.code;
                  const emoji   = any?.meta?.iconEmoji ?? (code ? flagEmojiFromCode(code) : null);
                  const progs   = country.submenu ?? [];
                  const visible = progs.slice(0, MAX_VISIBLE);
                  const extra   = progs.length - MAX_VISIBLE;

                  return (
                    <div
                      key={country.label}
                      className={cx(
                        'group relative flex flex-col gap-2 rounded-xl p-3 transition-all duration-150',
                        'ring-1 ring-zinc-200/60 hover:ring-primary/20 dark:ring-white/[0.07] dark:hover:ring-primary/25',
                        'bg-white/60 hover:bg-white/90 dark:bg-white/[0.04] dark:hover:bg-primary/[0.10]',
                        'before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-200',
                        'before:bg-[radial-gradient(circle_at_top_left,rgba(28,87,180,0.10),transparent_60%)]',
                        'hover:before:opacity-100'
                      )}
                    >
                      {/* Country name */}
                      <Link
                        href={country.href}
                        onClick={onClose}
                        className="relative flex items-center gap-2 min-w-0"
                      >
                        <MenuFlag code={code} emoji={emoji} />
                        <span className="truncate text-[14px] font-bold text-zinc-800 group-hover:text-primary transition-colors duration-150 dark:text-zinc-100">
                          {country.label}
                        </span>
                      </Link>

                      {/* Programs */}
                      {visible.length > 0 && (
                        <ul className="relative flex flex-col gap-0.5">
                          {visible.map(p => (
                            <li key={p.label}>
                              <Link
                                href={p.href}
                                onClick={onClose}
                                className="flex items-center gap-1.5 rounded-md px-1.5 py-[5px] text-[13px] leading-tight text-zinc-600 hover:text-primary hover:bg-primary/[0.06] transition-colors duration-100 dark:text-zinc-300 dark:hover:text-primary dark:hover:bg-primary/[0.12] focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
                              >
                                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                                <span className="truncate">{p.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* View all remaining */}
                      {extra > 0 && (
                        <Link
                          href={country.href}
                          onClick={onClose}
                          className="relative inline-flex items-center gap-1 pl-1.5 text-[12px] font-semibold text-primary/60 hover:text-primary transition-colors duration-100"
                        >
                          +{extra} more program{extra !== 1 ? 's' : ''} →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="py-12 text-center text-[14px] text-zinc-400 dark:text-zinc-500">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
          </div>

          {/* ── Sticky footer ── */}
          <div className="sticky bottom-0 flex items-center justify-between border-t border-zinc-200/60 bg-white/60 px-4 py-2 backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/60">
            <span className="text-[12px] text-zinc-500">{filtered.length} countr{filtered.length !== 1 ? 'ies' : 'y'}</span>
            <span className="text-[12px] text-zinc-500">
              Press <kbd className="rounded bg-zinc-100/80 px-1 py-px font-mono text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">Esc</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
