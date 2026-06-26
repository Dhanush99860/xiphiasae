# XIPHIAS — Full Redesign Plan (for approval before any build)

> Built to the 8 rules: (1) parallax images, spaced — never congested back-to-back; (2) image-less
> sections too (what-we-do, tools) that introduce via animation; (3) a UNIQUE identity, not a copy;
> (4) clean, immigration-appropriate; (5) images animate every way — slide L/R, mask, scale — not just
> up/down; (6) varied text animation likewise; (7) a persistent BACKGROUND CANVAS over which images
> appear when a section wants one; (8) section-by-section for every page type.

---

## 1. THE BIG IDEA — our own identity: "The Living Horizon"

Not Bugatti's dark cinema, not Apple's white. **Our signature is a horizon that travels from night → day as you scroll** — the immigration story made literal: pre-dawn aspiration → daylight arrival.

- A single **persistent background canvas** sits behind the whole site: a soft horizon gradient + a faint, slowly-drifting **global graticule** (latitude/meridian lines) + one slow moving light. It's calm, premium, *global* — and unmistakably ours.
- As you scroll a page, the canvas **shifts hue & brightness** (deep ink → warm gold dawn → bright ivory day). This resolves the dark-vs-light tension with intent: the site is *both*, in sequence.
- **Images are "windows" onto destinations** that slide / mask / scale **in over** the canvas — discrete, framed, with air around them. Never a wall of full-bleed photos.
- **Text is the quiet authority** on the horizon. Gold is the dawn light — used as a line, a word, a glow, never a fill.

This single device gives us: cohesion (one canvas), drama (night→day), cleanliness (lots of canvas/negative space), uniqueness (no luxury brand owns "the traveling horizon"), and a home for image-less sections (they're just text on the living canvas).

### Palette (refined)
```
Night    #0b0f17  (canvas base, top of pages)        Dawn   #14233b → warm
Day      #f5f0e6  (canvas base, lower / light pages)  Ivory  #fbfaf7 text-on-dark
Ink      #0c1322  text-on-light          Gold #d4af37  +  gold-deep #a87d1f
```
One accent (gold). Two type roles: a huge display (Sora / or a refined high-contrast serif for headlines — TBD with you) + a quiet body (Inter/Lato).

---

## 2. THE BACKGROUND CANVAS (rule 7) — one system, every page

A fixed, full-viewport layer mounted globally (behind the header, below content), built **cheap** (no $100k WebGL): a CSS/Canvas animated gradient + an SVG graticule + a drifting radial light. Driven by Lenis scroll progress to shift night→day.
- **Section modes:** each section declares `canvas="night|dawn|day"` and either `media=false` (text floats on the canvas) or `media=<image/video>` (a framed window reveals over the canvas).
- **Performance:** transform/opacity + one requestAnimationFrame; `prefers-reduced-motion` freezes it to a static gradient. Mobile = simplified static gradient (no graticule drift).
- This is the thing that makes us look designed, not "pictures stacked." Images get **breathing room** because the canvas carries the continuity between them.

---

## 3. ANIMATION VOCABULARY (rules 5 & 6 — varied, not just up/down)

**Images (windows):** slide-in from **left/right** (alternating), **iris/curtain clip-reveal**, **scale-from-mask**, **horizontal parallax** inside the frame, **horizontal collection rails** (Rolex), **stacked-card peel**, **duotone→full-color** on reveal. Each image moment uses a *different* one.
**Text:** word-rise, **char-stagger**, **slide-from-side**, **line-by-line mask-wipe**, **kinetic accent word** (gold shine/gradient), **counter** for numbers, **typewriter** for rotating value-props, **pinned text while canvas shifts behind** (Apple). Vary per section.
**Transitions:** the canvas is continuous — sections **cross-fade through the horizon**, no hard seams. Magnetic CTAs. A thin gold scroll-spine (we have it) ties it together.
**Spacing law (rule 1):** between any two image windows there is canvas/whitespace or a text-only section. Image windows are framed with margin — never edge-to-edge stacked.

---

## 4. GLOBAL CHROME
- **Header:** slim, glass that tints with the canvas (dark on night, light on day). Nav: Programs · Countries · Solutions · Tools · Insights · About (already ported). One gold CTA "Start your assessment".
- **Footer:** on the **day** end of the canvas — light, calm, full sitemap, offices, trust marks.
- **Scroll-spine** (gold, fills with scroll) + a "you are here / chapter" marker.

---

## 5. SECTION-BY-SECTION, PER PAGE TYPE

Legend per section: **[mode]** night/dawn/day · **media** yes/no · the animation.

### A. HOME  (canvas journeys night → day)
1. **Hero** **[night]** media:yes — horizon canvas + ONE framed window of Dubai (Ken-Burns/video) that *irises open*; headline "Your world, without borders." word-rise; rotating value-prop typewriter; gold CTA (magnetic). *Lots of canvas around the window — not full-bleed.*
2. **What we do** **[night→dawn]** media:NO — text-on-canvas; a 1-line manifesto, char-stagger; 4 pathway names reveal as **kinetic type** (no images) with a hairline that draws between them.
3. **Pathways** **[dawn]** media:yes — each pathway = a framed window that **slides in from alternating sides** with text opposite; spaced with canvas between (not 4 stacked photos). Parallax inside frame.
4. **Destinations** **[dawn→day]** media:yes — **horizontal collection rail** (Rolex), country windows slide sideways; "drag / →" affordance.
5. **How XIA works** **[day]** media:NO — text + animated diagram (line-draw nodes), pinned text while a subtle graphic builds. Introduces the tool, no photo.
6. **Proof** **[day]** media:NO — big **counters** on the bright canvas (17+ / 25+ / 10,000+ / 98%), staggered.
7. **Final CTA** **[day]** media:light — calm bright close, gold CTA, Arabic flourish.
*(Brings back the route map + process as OPTIONAL: route map → an animated line-draw on the canvas in §2; process → a horizontal step rail. No photo walls.)*

### B. VERTICAL LANDING (residency / citizenship / skilled / corporate)
1. **Hero [night]** media:yes — one framed destination window + bold vertical name (huge), one-line promise.
2. **The promise [night→dawn]** media:NO — 3 value props as kinetic text, icons line-draw in.
3. **How it works [dawn]** media:NO — horizontal 4-step rail, numbers + gold connector draws.
4. **Explore by country [dawn→day]** media:yes — horizontal **country rail** (windows slide in).
5. **Top programmes [day]** media:light — clean cards (image + 1 stat), staggered, gold hover.
6. **Proof + testimonial [day]** media:NO — counter band + a quote that types in.
7. **CTA [day]**.

### C. COUNTRY DETAIL (/countries/[country], /residency/[country])
1. **Hero [night]** media:yes — that country's window iris-opens; country name + flag + 1 headline stat.
2. **Sticky facts rail** — a **pinned** side panel (investment / timeline / family / passport power) that stays as the body scrolls (Apple pinned). Numbers count in.
3. **Overview [dawn]** media:NO — pinned heading, body reveals line-by-line; prose collapsed into tabs/accordions (info present, not overwhelming).
4. **Routes [dawn]** media:light — each route a small framed window sliding in + key facts.
5. **Process [day]** media:NO — horizontal step rail.
6. **Costs & docs [day]** media:NO — clean tables, reveal on scroll.
7. **FAQ [day]** + **sticky CTA bar** (always-visible "Start assessment").

### D. PROGRAM DETAIL (deep page)
Same skeleton as C but program-scoped: hero window → sticky cost calculator/facts rail → overview tabs → eligibility → process rail → cost breakdown → FAQ → sticky CTA. **Information-rich but presented** (tabs, reveals, big numbers lead each block).

### E. COUNTRIES INDEX (/countries)
1. **Hero [night]** media:NO — "Find your country" + a search that focuses; counter (35 destinations).
2. **Region chapters [dawn→day]** — each region a **horizontal rail** of country windows (sideways browse), region label pinned as you scroll its rail.

### F. SOLUTIONS / AUDIENCE (for-investors, families, …)
1. **Hero [night]** media:yes — audience-matched window + persona headline.
2. **Why this fits you [dawn]** media:NO — 3 kinetic value points.
3. **Recommended routes [dawn→day]** media:light — filtered programme windows, staggered.
4. **Tools for you [day]** media:NO — tool cards line-draw in.
5. **CTA [day]**.

### G. TOOLS (eligibility / cost / passport-index / compare)
Functional first, lightly cinematic. **[dawn]** canvas, mostly **media:NO**. Hero = a short kinetic intro; then the tool UI on a clean panel floating on the canvas; gold progress; results count in. No photo walls — these are utilities, kept clean & fast.

### H. CONTENT — list (blog/news/articles/media/events/insights)
1. **Hero [night]** media:NO — section title kinetic + a search/filter.
2. **Featured [dawn]** media:yes — one large featured window.
3. **Grid [dawn→day]** media:light — editorial cards (image + title + date), reveal-on-scroll, gold-active filters. **Article page:** big title on canvas → one hero window → themed Prose with a reading-progress spine.

### I. ABOUT / HERITAGE  (the most dramatic — scrollytelling)
1. **Hero [night]** media:NO — "17 years. 10,000 families." kinetic.
2. **Timeline [night→day]** — **pinned scrollytelling**: as you scroll, the year advances, the canvas brightens night→day, milestone windows fade through, numbers count. (NYT "Snow Fall".)
3. **Leadership [day]** media:yes — portrait windows reveal.
4. **Values [day]** media:NO — kinetic statements.

### J. CAREERS / TEAMS  (deliberately DIFFERENT — warm, human)
- Warmer canvas (day-leaning), candid people windows, quotes that type in, open-roles as clean cards, a human CTA. *Different feel from Heritage on purpose.*

### K. CONTACT / LEGAL
- Contact: **[day]** map + offices as windows + a clean form on the canvas.
- Legal: **[day]** calm, themed Prose, reading spine. No media.

---

## 6. ASSETS
- **Build now on parallax stills** (we have 1,527; use the hero-grade ones for windows, the rest for cards/rails).
- **Later, you download** (Pexels/Coverr, 6–12s muted ≤1080p, MP4+WebM): 1 hero loop (Dubai dawn aerial), ~4 chapter loops; ~8 wide 2400px stills for top countries. Windows upgrade from Ken-Burns → video instantly.

## 7. BUILD SEQUENCE (after you approve)
1. Background-canvas system + section modes (the foundation everything sits on).
2. Animation primitives we still need: `SlideReveal` (L/R/mask directions), `IrisReveal`, `PinnedText`, `StickyFactsRail`, `CanvasSection` wrapper.
3. Prototype **Home** to this plan → you judge → lock.
4. Roll per page type: Vertical landing → Country/Program detail → Solutions → Countries → Tools → Content → About/Heritage → Careers → Contact/Legal.
</content>
