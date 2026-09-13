/**
 * Build-safe font descriptors.
 *
 * The application previously used next/font/google in every route, which made
 * production builds depend on a live Google Fonts response. These descriptors
 * keep the same className/variable interface while using resilient local system
 * stacks defined in globals.css.
 */
export const cormorant = {
  className: "font-cormorant-local",
} as const;

export const inter = {
  className: "font-inter-local",
  variable: "font-inter-variable",
} as const;

export const sora = {
  className: "font-sora-local",
  variable: "font-sora-variable",
} as const;

export const lato = {
  className: "font-lato-local",
  variable: "font-lato-variable",
} as const;

export const reemKufi = {
  className: "font-arabic-display-local",
  variable: "font-arabic-display-variable",
} as const;

export const plexArabic = {
  className: "font-arabic-local",
  variable: "font-arabic-variable",
} as const;
