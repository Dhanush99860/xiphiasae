"use client";

import { usePathname } from "next/navigation";

import DeferredClientWidgets from "@/components/DeferredClientWidgets";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import MainPadding from "@/components/Layout/MainPadding";
import SocialSidebar from "@/components/Layout/SocialSidebar";
import { ScrollGuideLine, SmoothScroll } from "@/components/motion";

type Props = {
  children: React.ReactNode;
  gaId?: string;
};

function isUtilityRoute(pathname?: string | null) {
  return (
    pathname?.startsWith("/content-admin") ||
    pathname?.startsWith("/x-hub") ||
    pathname?.startsWith("/crm") ||
    pathname?.startsWith("/sample")
  );
}

export default function SiteChrome({ children, gaId }: Props) {
  const pathname = usePathname();

  if (isUtilityRoute(pathname)) {
    return (
      <main id="main" className="min-h-screen">
        {children}
      </main>
    );
  }

  // The luxe homepage and the citizenship hub bring their own (transparent,
  // animated) header + footer, so the global chrome steps aside on those routes
  // — we keep smooth scroll + analytics.
  // Redesigned navy/gold routes bring their own header/footer: the homepage, the
  // citizenship/residency hubs, country pages and programme pages.
  const REDESIGNED_PAGES = [
    "/about",
    "/contact",
    "/insights",
    // Legal cluster — reskinned to the navy/gold "Obsidian Ledger" template,
    // which renders its own LuxeHeader/LuxeFooter.
    "/privacy-policy",
    "/terms",
    "/cookies",
    "/refunds",
    "/accessibility",
    "/anti-fraud",
    // Tools cluster (navy/gold reskin)
    "/programme-explorer",
    "/compare-programs",
    // XIA intelligence suite — the gateway + tool pages render their own
    // navy/gold LuxeHeader/LuxeFooter (so the global Header must step aside).
    "/xia-intelligence",
    "/route-intelligence",
    "/deep-analysis",
    "/us-visa-intelligence",
    "/document-readiness",
    "/high-skill-visa",
    "/investment-residency",
    "/report-advisor-workflow",
    // Vertical landing — navy/gold "Hub" (renders its own LuxeHeader/LuxeFooter)
    "/golden-visa",
    // Eligibility assessment funnel — navy/gold "Tool Panel" shell renders its
    // own LuxeHeader/LuxeFooter (the per-track /…/eligibility-check pages are
    // already covered by the vertical-cluster regex below).
    "/eligibility",
    // Reports catalog — navy/gold PaymentCatalog renders its own chrome.
    "/payment",
    // Marketing hubs — navy/gold ① "Category Grid" (CategoryHub renders its own
    // LuxeHeader/LuxeFooter).
    "/programs",
    "/solutions",
    // Gallery + Resource Guide — navy/gold reskin; GalleryView/GuideView render
    // their own LuxeHeader/LuxeFooter.
    "/gallery",
    "/guide",
    // Audience pages (navy/gold SolutionPage) + work-permits (navy/gold) — own chrome.
    "/for-investors",
    "/for-families",
    "/for-professionals",
    "/for-businesses",
    "/for-entrepreneurs",
    "/work-permits",
    // Work Permit Intelligence — navy/gold editorial module (renders its own
    // LuxeHeader/LuxeFooter).
    "/work-permit-intelligence",
  ];
  // Company/careers cluster (reskinned to the navy/gold "Spotlight Feature"
  // look) brings its own LuxeHeader/Footer, including dynamic sub-routes
  // (/careers/[slug], /client-referrals/thank-you).
  const companyCluster = /^\/(awards|teams|reviews|partner-with-us|client-referrals|careers|registration|personal-booking|countries)(\/[^/]+)*$/.test(pathname ?? "");
  // Content cluster (lists + detail) reskinned to the navy/gold ★ Mix / ArticleDetail.
  const contentCluster = /^\/(news|blog|articles|media|events)(\/[^/]+)?$/.test(pathname ?? "");
  // Passport Index ① "Power Index" cluster renders its own navy/gold
  // LuxeHeader/LuxeFooter via PassportIndexShell, so the global chrome steps
  // aside for the whole journey: overview + ranking, compare, improve,
  // my-passport, methodology, and /passport/[code].
  const passportIndexCluster = /^\/passport-index(\/[^/]+)*$/.test(pathname ?? "");
  // XIA tool pages reskinned to the navy/gold ① "Tool Panel" look render their own
  // LuxeHeader/LuxeFooter. (The /{vertical}/eligibility-check routes are already
  // covered by the hub regex above.)
  const toolPanelCluster = /^\/(eligibility|cost-estimator|xiphias-program-index)(\/[^/]+)*$/.test(pathname ?? "");
  const bringsOwnChrome = pathname === "/" || REDESIGNED_PAGES.includes(pathname ?? "") || /^\/(citizenship|residency|corporate|skilled)(\/[^/]+){0,2}$/.test(pathname ?? "") || companyCluster || contentCluster || passportIndexCluster || toolPanelCluster;
  if (bringsOwnChrome) {
    return (
      <>
        <SmoothScroll />
        <main id="main">{children}</main>
        <DeferredClientWidgets gaId={gaId} />
      </>
    );
  }

  return (
    <>
      <SmoothScroll />
      <ScrollGuideLine />
      <Header />
      <main id="main" className="min-h-screen">
        <MainPadding />
        {children}
      </main>
      <Footer />
      <SocialSidebar />
      <DeferredClientWidgets gaId={gaId} />
    </>
  );
}
