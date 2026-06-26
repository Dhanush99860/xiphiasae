# XIPHIAS Frontend Design & Motion Skill — Cinematic Luxury Edition

> Playbook for building a **world-class, cinematic, alive** immigration site — the
> Rolls-Royce / Rolex / Bugatti / Apple league. We sell a *premium outcome*
> (a second home, global freedom), so the site must feel like the product:
> restrained, expensive, in motion, unforgettable. This edition adds **video,
> parallax, scroll-choreography, brand-reference patterns, and an asset strategy**
> on top of the existing motion system.

---

## 0. What makes a luxury site feel luxury (the benchmark)

Study these and steal the *mechanics*, not the brand:

| Brand | What they do | Steal this |
|---|---|---|
| **Rolls-Royce** | Full-bleed slow cinematic video, near-silent UI, one statement per screen, dark | Dark full-screen media heroes; glacial pacing; one focal idea per viewport |
| **Rolex** | Crisp light editorial, museum-grade photography, signature green/gold, subtle motion | Big confident photography on light; a single signature accent; calm, not busy |
| **Bugatti** | Dark, high-contrast, dramatic kinetic type, fluid scroll transitions | Bold display type that moves; scene-to-scene fluid transitions; drama |
| **Apple** | Scroll-driven product reveals — media scales/pins/scrubs as you scroll | Pinned scroll scenes where media transforms in sync with scroll |
| **Aesop / Hermès** | Editorial spreads, asymmetric layouts, alternating light/dark chapters | Magazine layout rhythm; alternate dark/light "chapters" for drama |

**The 7 luxury laws (override taste):**
1. **Media is the hero.** Full-bleed image/video, edge to edge. The frame *is* the design.
2. **Slow is rich.** Long eases (1–1.6s), generous dwell, momentum scroll. Hurry reads cheap.
3. **One idea per viewport.** Never crowd. Whitespace = confidence.
4. **Motion is choreographed to scroll**, not sprinkled. Things move *because you scroll*.
5. **Restraint in color.** One accent. Two type sizes that matter (a huge display + a quiet body).
6. **Everything enters, nothing pops.** Reveal, never hard-cut. Even nav fades in.
7. **It must still be effortless to navigate** — parallax enhances, never hijacks. Natural scroll, readable sections, instant skip, reduced-motion honored.

---

## 1. The engine stack — which tool for what (cinematic-first)

| Library | Status | Use it for |
|---|---|---|
| **GSAP + ScrollTrigger** (`@gsap/react`) | ✅ | **THE cinematic core.** Pinned scenes, scroll-scrubbed timelines, parallax layers, scrub a video's `currentTime`, sequenced reveals, horizontal scroll. |
| **Lenis** | ✅ | One app-level **smooth/momentum scroll** instance feeding ScrollTrigger. The "expensive" glide. |
| **Framer Motion** (`motion`) | ✅ | Component enter/exit, `whileInView`, gestures, layout, `AnimatePresence`. Micro-motion + simple reveals. |
| **HTML5 `<video>`** | native | Hero background loops, cinemagraphs, scroll-scrubbed footage. Always `muted playsInline` + `poster`. |
| **keen-slider / swiper / react-fast-marquee** | ✅ installed | Collection carousels, horizontal galleries, logo marquees. |
| **anime.js** | `npm i animejs` | Optional — SVG line-draw, particle/grain shimmer outside React. GSAP covers most. |
| **R3F / three** | ✅ | Optional 3D accent (globe, particles). Lazy `dynamic({ssr:false})`, isolated. |
| **next/image** | native | All stills — `sizes`, `priority` for LCP, stable `aspect-ratio`. |

**Decision shortcut:** scroll-scrubbed/pinned/parallax/video-scrub → **GSAP ScrollTrigger**. Smooth scroll → **Lenis**. Component reveal/gesture → **Framer**. Carousel → **keen-slider/swiper**.
> Standing set = GSAP + Lenis + Framer. Don't add a 5th engine without a measurable reason.

---

## 2. VIDEO — the biggest lever (we currently have ~0; user will source)

### Where video earns its place
- **Hero background loop** — a 6–12s muted aerial/lifestyle loop behind the headline. The single biggest "alive" win.
- **Scroll-scrubbed footage** — pin a section, drive `video.currentTime` from scroll (Apple-style). Cinematic and interactive.
- **Cinemagraph** — a still with ONE moving element (drifting clouds, shimmering water). Subtle, premium, tiny.
- **Chapter transitions** — short clips between verticals/destinations.

### Rules (non-negotiable)
- `muted autoplay loop playsInline preload="metadata"` + a **`poster`** (the poster is the LCP, never the video).
- Encode **H.264 MP4 + WebM/VP9**, ≤1080p, ≤~3–5 MB per loop, 24–30fps. Compress hard (Handbrake).
- **Lazy-load** below-fold video; **pause when offscreen** (IntersectionObserver).
- **Reduced-motion / save-data / mobile** → show the poster still (Ken-Burns it), don't autoplay.
- Never put text-critical content only in video — text stays in the DOM.

### What to download (per direction; I'll give an exact shortlist once you pick)
Generic luxe-immigration b-roll: city skyline aerials (Dubai, London, Toronto, Lisbon, Singapore), private-jet/airport, coastline/yacht, family lifestyle, passport/document macro, golden-hour architecture. Sources: Pexels/Coverr/Mixkit (free), Artgrid/Filmsupply (paid). 16:9 + a 9:16 mobile crop.
**If no video:** I can fake 80% of it — Ken-Burns + parallax + grain + duotone on the **1,527 stills** we already have.

---

## 3. PARALLAX & SCROLL CHOREOGRAPHY (the "lively" engine)

### Patterns (GSAP ScrollTrigger + Lenis)
- **Multi-layer parallax** — background image moves slow, mid layer medium, foreground/text fast. 3 speeds = depth.
- **Pinned scene** — `pin: true`, `scrub: true`; the section holds while media scales/crossfades/scrubs, then releases.
- **Reveal-on-scroll** — `SandReveal`/`Reveal` + a gold draw-line that fills with scroll (we have `ScrollGuideLine`).
- **Horizontal scroll gallery** — pin a row, translate X with vertical scroll (destinations/collections).
- **Scroll-scrub video** — map scrollProgress → `video.currentTime`.
- **Counter / odometer** on scroll-in; **marquee** of accreditations; **image-sequence** flipbook (frames) for product-grade reveals.

### Navigation discipline (user: "not tough to navigate")
- Parallax/pinned scenes must **release cleanly** and never trap the scroll. Keep a clear scroll-down affordance.
- Sections stay individually readable; a sticky minimal nav + the global scroll-guide line orient the user.
- Provide **skip-to-content**, working keyboard nav, and **reduced-motion** that flattens all of it to simple fades.
- Budget: animate **transform/opacity** only; `will-change` on active layers, removed after; one ScrollTrigger context per page, cleaned via `useGSAP`. 60fps on mid-phone.

---

## 4. ASSET STRATEGY — exploit the 1,527-image library

We have rich per-country imagery (`public/images/{residency,citizenship,corporate}/<country>/...-hero.webp`, events, awards, lifestyle). Treatments that make stock look couture:
- **Ken-Burns** (slow scale 1→1.08 + drift) on every hero still — instant life without video.
- **Duotone / graded** toward the chosen palette so 1,527 mismatched photos read as one collection.
- **Parallax stacks** — split a scene into 2–3 depth layers (sky / city / foreground) for fake-3D.
- **Masked reveals** — clip-path/curtain wipes; image emerges as you scroll.
- **Editorial grids & full-bleed spreads** — alternate huge single images with tight grids for rhythm.
- **Country "collection" rail** — horizontal scroll of country cards using their hero images.

---

## 5. Motion system (tokens + a11y)

```ts
// src/lib/motion-tokens.ts
export const EASE = { lux:[0.22,1,0.36,1], inOut:[0.83,0,0.17,1], expo:[0.16,1,0.3,1] } as const;
export const DUR  = { fast:0.2, base:0.6, slow:1.0, cinematic:1.5 } as const; // luxury = slow
export const STAGGER = { tight:0.05, base:0.08, loose:0.14 } as const;
```
**Principles:** eased not bouncy; slow-in/settle; one focal motion per viewport; choreograph to scroll. **a11y:** every effect degrades to a plain fade under `prefers-reduced-motion`; content lives in the DOM; keyboard + focus-visible + skip-link intact; RTL via logical props + mirrored motion.

---

## 6. Motion primitives we already have ([`src/components/motion/`](src/components/motion/))

`SmoothScroll`(Lenis) `ScrollProgress` `ScrollGuideLine` `HorizontalScroll` · `Reveal` `SandReveal` `Stagger`/`StaggerItem` `Parallax` `Marquee` · `SplitText` `CharReveal` `TextReveal` `TextType` `ShinyText` `GradientText` `HighlightText` `Counter` · `Magnetic` `TiltCard` · `AuroraBackground` `DrawLine` `LatticeOverlay` `GoldenFalcon` `GoldenBurj`.

**To build for cinematic:** `VideoHero` (poster+loop+reduced-motion), `KenBurns` image wrapper, `ScrollScene` (GSAP pin+scrub helper), `ParallaxLayer`, `ImageReveal` (masked), `ScrubVideo`, `CollectionRail` (horizontal). All reduced-motion aware.

---

## 7. Typography & color (direction-dependent — see the design options)

Luxury = a **huge editorial display face** + a quiet body. Candidates: display → a high-contrast serif (Playfair/Canela-style) OR a wide grotesque (the brand `Sora`); body → `Inter`/`Lato`. Keep ONE accent color. The theme (dark / light / mixed) is being re-chosen — see the design directions doc. Existing tokens (midnight/ink/gold/sand/pearl/royal) remain available; we may add a new accent per the chosen direction.

---

## 8. Performance & pre-ship checklist
- [ ] Poster image is LCP; video never blocks paint; below-fold media lazy + paused offscreen
- [ ] Only transform/opacity animated; no CLS; 60fps mid-phone; will-change cleaned up
- [ ] `prefers-reduced-motion` & save-data → posters + simple fades, no autoplay video
- [ ] Parallax/pins release cleanly; scroll never hijacked; keyboard + skip-link work; RTL mirrors
- [ ] One accent held; one focal moment per viewport; generous whitespace
- [ ] next/image `sizes`+`priority` on hero; total hero JS lean; Lighthouse LCP/CLS green

---

## 9. Copy & trust (unchanged)
Advisory tone — what we review, what the client provides, what happens next. **No** guaranteed-visa / job-placement claims. "permit route review", "document readiness", "advisor verification". X-Hub captures leads when contact details are given.

---

## 10. Build sequence (cinematic redesign)
1. **Pick ONE direction** (see design options) + confirm theme/accent + the video shortlist.
2. **Foundation:** motion tokens, `VideoHero`/`KenBurns`/`ScrollScene`/`ParallaxLayer` primitives, Lenis confirmed app-wide.
3. **Prototype the homepage hero + first scroll-scene**; review in browser (puppeteer audit).
4. **Roll the choreography** section-by-section; apply asset treatments; wire the collection rails.
5. **Propagate** to landings + key pages; performance + a11y + reduced-motion pass.
