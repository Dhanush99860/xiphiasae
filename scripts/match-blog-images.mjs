/**
 * Matches and assigns hero images to blog MDX files.
 * - Blogs with a proper hero already: kept as-is
 * - Blogs with missing hero: matched from public/images/blogs/ by keyword score
 * - Blogs with a generic WP body-image as hero (e.g. website-image-1024x576.png): upgraded to best WebP
 *
 * Usage: node scripts/match-blog-images.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const BLOG_DIR  = path.join(ROOT, 'content', 'blog');
const IMG_DIR   = path.join(ROOT, 'public', 'images', 'blogs');

const DRY_RUN = process.argv.includes('--dry-run');

// ── Manual overrides (slug → image filename) ─────────────────────────────────
// Used when keyword scoring would pick the wrong image.
const OVERRIDES = {
  'h1b-visa-2025-100k-fee-weighted-lottery-tips':                                 'h1b-visa-usa-india..webp',
  'american-passport-visa-free-countries-2025':                                   'american-passport-visa-free.webp',
  'how-to-create-a-business-plan-for-investors-key-elements-every-startup-needs': 'business-plan-investors.webp',
  'transparency-trust-and-due-diligence-the-new-standards-in-investment-migration':'new-standards-investment-migration.webp',
  'common-required-documents-for-visa-application':                               'required-documents-visa.webp',
  'eu-citizenship-by-descent-unlock-your-european-heritage':                      'eu-citizenship-descent.webp',
  'strongest-passports-in-the-world-in-2025':                                     'passport-strength.webp',
  'sao-tome-and-principe-citizenship-by-investment-a-complete-guide-by-xiphias-immigration': 'sao-tome-principe-citizenship.webp',
  'top-visa-tips-make-your-application-stand-out':                                'visa-tips.webp',
  'digital-nomad-visa-your-complete-guide-to-working-remotely-in-top-countries':  'digital-nomad-visa.webp',
  'singapore-pr-by-investment-investment-today-citizenship-tomorrow':              'singapore-pr-by-investment.webp',
  'grenada-citizenship-by-investment-real-estate-vs-donation-what-investors-choose-2014-2025': 'grenada-cbi-real-estate.webp',
  'essential-investment-migration-terms-for-smarter-decisions':                   'Key-Terms-In-Investment-Migration.webp',
  'wealthiest-countries-in-africa-2025':                                          'africa-wealth-map.webp',
  'golden-gateway-how-investing-in-business-bay-can-secure-your-uae-residency':   'golden-gateway.webp',
  'why-dubai-is-dominating-corporate-migration-in-2025':                          'why-dubai-dominating.webp',
  'corporate-migration-from-startup-to-global-enterprise':                        'corporate-migration.webp',
  'eb-5-visa-vs-l-1-visa-which-one-is-right-for-you':                            'eb5-l1-visa-comparison.webp',
  'tax-havens-explained-simply-advantages-risks-in-2025':                         'tax-havens-advantages-risks.webp',
  'invest-in-a-running-business-in-canada':                                       'canada-running-business-pr.webp',
  'canada-work-permit-from-dubai':                                                'canada-visa.webp',
  'how-to-choose-the-right-visa-for-your-business-needs':                         'visa-application.webp',
  'understanding-the-economic-impact-of-the-canada-express-entry-system-on-newcomers-income': 'canada-immigration.webp',
  'german-work-visa-everything-you-need-to-know':                                 'germany.webp',
  'important-u-s-work-visas-the-ultimate-guide':                                  'xiphias-us-visa-process.webp',
  'corporate-relocation-made-simple-top-strategies-for-immigration-success':      'corporate-migration.webp',
  'investment-migration':                                                          'investment-migration.webp',
  'h1b-visa-alternatives':                                                         'h1b-in-demand-occupations.webp',
  'caribbean-citizenship-by-investment':                                           'carribean-Investment.webp',
  'get-an-e2-visa-to-usa-through-grenada-citizenship-by-investment-program':      'eb5-invest-relocate-usa.webp',
  'supplementary-information-for-the-2024-2026-immigration-levels-plan-of-canada':'canada-immigration-levels.webp',
  'invest-in-the-real-estate-or-in-a-business-in-europe':                        'european-investment.webp',
  'understand-the-business-investment-immigration-programs-now':                  'importance-of-investment.webp',
  'an-intro-to-canada-permanent-residence-program':                               'canada-permanent-residency.webp',
  'citizenship-by-investment-programs-invest-in-the-caribbean':                   'investment-caribbean.webp',
  'relocate-to-uk-from-dubai-to-invest-and-grow':                                 'uk-migrate.webp',
  'run-your-own-business-or-farm-in-manitoba':                                    'manitoba-investor.png',
  'canada-start-up-visa':                                                          'canada-startup-visa.webp',
  'france-visa-talent-passport':                                                   'france-talent-passport.webp',
  'migrating-to-ontario-a-prime-destination-in-canada':                           'ontario-canada.webp',
  'invest-in-european-countries-from-dubai':                                       'european-country.webp',
  'work-with-the-right-immigration-firm-to-relocate-to-canada':                   'iccrc-registered-agents.webp',
  'ontario-received-additional-700-nominations-for-2019':                         'ontario-canada.webp',
  '10-reasons-why-living-in-antigua-and-barbuda-is-awesome':                      'affordable-citizenship-programs.webp',
  'necessary-logs-for-filing-u-s-e2-visa-petition':                               'eb5-invest-relocate-usa.webp',
  'things-you-should-know-about-the-alberta-express-entry-stream':                'alberta-immigration-streams.webp',
  'uks-conservative-party-promises-quick-track-visa-for-doctors':                 'uk-enter-visa.webp',
  'recent-updates-of-grenada-citizenship-by-investment-act':                      'grenada-cbi.webp',
  'few-facts-about-saint-lucia':                                                   'caribbean-second-passport.webp',
  'the-latest-changes-to-the-uk-immigration-rules':                               'uk-points-based.webp',
  'new-meaning-is-given-for-citizenship-applications-residency-by-uscis':         'uscis-issue.webp',
  'golden-visa-scheme-of-greece-is-irresistible-to-investors':                    'greece-golden-visa.webp',
  'us-e3-immigration-visa-program':                                                'usa.webp',
  'the-usa-waives-off-mandatory-visa-interview-for-certain-visas':                 'xiphias-appointement.webp',
  '1-million-more-immigrants-needed-in-canada-to-fill-in-their-job-vacancies':    'canada-immigration.webp',
  'high-boost-to-the-h1b-holders-in-the-us-the-us-fairness-of-high-skilled-workers-act-of-2019': 'h1b-visa-usa-india..webp',
  'british-columbia-pnp-extends-tech-pilot-to-june-2020':                         'british-columbia-pnp.webp',
  'get-citizenship-by-investment-and-enjoy-visa-free-travel':                     'citizenship-services.webp',
  'grenada-citizenship-by-investment-program-updates':                            'grenada-cbi.webp',
  'apply-for-australia-investment-visa-with-words-best-xiphias-australia-investment-visa-service-from-uae': 'australia-business-visa.webp',
  'best-caribbean-island-citizenship-by-investment-passports-for-2019':           'caribbean-second-passport.webp',
  'how-to-setup-a-company-in-dubai-free-zone':                                    'dubai-investment.webp',
  'how-to-apply-for-australia-spouse-visa-if-you-are-married-to-australia-citizenship': 'australia-pr.webp',
  'what-you-need-to-know-to-migrate-to-canada-from-dubai-with-xiphias-immigration': 'canada-immigration-xiphias.webp',
  'how-to-migrate-to-canada-from-dubai-citizenship-guide-2018':                   'canada-immigration-guide.webp',
  'how-to-migrate-to-australia-from-dubai':                                       'australia-migration.webp',
  '8-most-compelling-reasons-to-migrate-to-canada-from-dubai':                   'why-should-i-migrate-to-canada.webp',
  'ontario-announces-increased-allocation-for-2018-and-reopens-human-capital-priorities-stream': 'ontario-canada.webp',
  'important-aus-189-190-489-mltssl-stsol-10-1-2018':                             'subclass-189-vs-190-vs-491-skilled.webp',
  'alberta-announces-5600-nomination-intake-for-2018':                            'alberta-immigration-streams.webp',
  'ircc-introduced-a-1-4-increase-in-required-funds-on-january-5-2018':           'canada-immigration.webp',
  'saskatchewans-express-entry-sub-category-opens-for-400-new-applications':       'express-entry-latest-draw.webp',
  'nova-scotia-demand-express-entry-09-12-2017':                                   'canada-immigration.webp',
  'new-canada-job-bank-unique-portal-for-of-its-kind-for-non-canadians':           'Current-Job-canada.webp',
  'quebec-extends-deadline-for-accepting-applications':                            'quebec-immigration.webp',
  'express-entry-canada-2016':                                                     'express-entry-latest-draw.webp',
  'hello-world':                                                                   'immigration-consultants-xiphias.webp',
};

// Generic WP body-image filenames that should be replaced even if set as hero
const GENERIC_IMAGES = new Set([
  'website-image-1024x576.png',
  'image-1024x573.png',
  'ae-blog-pic.png',
  'portugal-uae-blog.png',
  'business-investment-immigrations.png',
  'australia-immigration-permanent-residency-1.png',
  'invest-in-the-new-shores-of-the-caribbean.png',
]);

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;
  return { raw: match[1], body: match[2] };
}

function getFrontmatterField(raw, field) {
  const re = new RegExp(`^${field}:\\s*(.+)$`, 'm');
  const m = raw.match(re);
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

function setFrontmatterField(raw, field, value) {
  const re = new RegExp(`^${field}:.*$`, 'm');
  const line = `${field}: ${JSON.stringify(value)}`;
  if (re.test(raw)) {
    // Use function to avoid $ in value being treated as regex backreference
    return raw.replace(re, () => line);
  }
  // insert after title if adding new field
  return raw.replace(/^(title:.*)$/m, (_, t) => `${t}\n${line}`);
}

function availableImages() {
  return fs.readdirSync(IMG_DIR).filter(f => /\.(webp|png|jpg|jpeg)$/i.test(f));
}

// Simple keyword scorer: split filenames on [-_.] and count matching words
const STOP = new Set(['in','the','a','an','of','to','for','and','is','are','by','with','from','that','this','at','as','on','how','what','why','its','your','you','all','be','do','if','or','not','we','it','so','our','but','can','get','has','was','new','top','my','about','up','when','than','more','best','few']);

function keywords(str) {
  return str.toLowerCase()
    .replace(/\.(webp|png|jpg|jpeg)$/i, '')
    .split(/[-_.\s]+/)
    .filter(w => w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w));
}

function score(slugWords, imgWords) {
  let s = 0;
  for (const w of slugWords) {
    if (imgWords.includes(w)) s += 2;
    else if (imgWords.some(iw => iw.includes(w) || w.includes(iw))) s += 1;
  }
  return s;
}

function bestImage(slug, images) {
  const slugWords = keywords(slug);
  let best = null, bestScore = -1;

  for (const img of images) {
    const imgWords = keywords(img);
    const sc = score(slugWords, imgWords);
    // Prefer WebP
    const bonus = img.endsWith('.webp') ? 0.5 : 0;
    const total = sc + bonus;
    if (total > bestScore) { bestScore = total; best = img; }
  }
  return best;
}

// ── Main ──────────────────────────────────────────────────────────────────────

function processBlog(file, images) {
  const filePath = path.join(BLOG_DIR, file);
  const content  = fs.readFileSync(filePath, 'utf8');
  const parsed   = parseFrontmatter(content);
  if (!parsed) { console.warn(`[skip] can't parse frontmatter: ${file}`); return; }

  const slug        = file.replace(/\.mdx$/, '');
  const title       = getFrontmatterField(parsed.raw, 'title') ?? slug;
  const currentHero = getFrontmatterField(parsed.raw, 'hero');

  // Determine if current hero is acceptable
  const heroFilename = currentHero ? path.basename(currentHero) : null;
  const heroNeedsUpdate =
    !currentHero ||
    (heroFilename && GENERIC_IMAGES.has(heroFilename));

  if (!heroNeedsUpdate) {
    console.log(`[keep] ${slug} → ${heroFilename}`);
    return;
  }

  // Pick image: override first, then auto-score
  const pick = OVERRIDES[slug] ?? bestImage(slug, images);
  if (!pick) { console.warn(`[no-match] ${slug}`); return; }

  // Verify the file exists
  if (!fs.existsSync(path.join(IMG_DIR, pick))) {
    console.warn(`[missing-img] ${slug} → ${pick} (file not found)`);
    return;
  }

  const webPath = `/images/blogs/${pick}`;

  let newRaw = setFrontmatterField(parsed.raw, 'hero', webPath);
  // Also set/update heroAlt
  const heroAltLine = `heroAlt: ${JSON.stringify(title)}`;
  if (/^heroAlt:/m.test(newRaw)) {
    newRaw = newRaw.replace(/^heroAlt:.*$/m, () => heroAltLine);
  } else {
    newRaw = newRaw.replace(/^(hero:.*)$/m, (_, heroLine) => `${heroLine}\n${heroAltLine}`);
  }

  const newContent = `---\n${newRaw}\n---\n${parsed.body}`;

  if (DRY_RUN) {
    console.log(`[dry-run] ${slug} → ${webPath}`);
    return;
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`[updated] ${slug} → ${webPath}`);
}

function main() {
  console.log('=== Blog Image Matcher ===\n');
  const files  = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  const images = availableImages();
  console.log(`Blogs: ${files.length}  |  Images: ${images.length}\n`);

  let updated = 0, kept = 0, skipped = 0;

  for (const file of files) {
    const before = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    processBlog(file, images);
    const after = DRY_RUN ? before : fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    if (before !== after) updated++;
    else if (before === after && !DRY_RUN) kept++;
  }

  console.log(`\nDone — ${updated} updated, kept ${files.length - updated}`);
}

main();
