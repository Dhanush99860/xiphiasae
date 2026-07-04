/**
 * WordPress → MDX Blog Migration Script
 *
 * Pulls all published posts from xiphiasimmigration.ae via WP REST API,
 * downloads featured images + inline images to public/images/blogs/,
 * and writes MDX files to content/blog/.
 *
 * Usage:
 *   node scripts/migrate-wp-blogs.mjs --user=admin --pass=yourpassword
 *
 * Optional flags:
 *   --skip-existing   skip posts whose .mdx file already exists
 *   --dry-run         print what would be written, don't write anything
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Config ────────────────────────────────────────────────────────────────────
const WP_BASE = 'https://www.xiphiasimmigration.ae/blogs/wp-json/wp/v2';
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const IMG_DIR  = path.join(ROOT, 'public', 'images', 'blogs');
const PER_PAGE = 20; // WP REST API max per page

// ── Args ──────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => {
      const [k, v] = a.slice(2).split('=');
      return [k, v ?? true];
    })
);

const WP_USER = args.user;
const WP_PASS = args.pass;
const SKIP_EXISTING = !!args['skip-existing'];
const DRY_RUN = !!args['dry-run'];

if (!WP_USER || !WP_PASS) {
  console.error('Usage: node scripts/migrate-wp-blogs.mjs --user=<username> --pass=<password>');
  process.exit(1);
}

const AUTH = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

// ── Helpers ───────────────────────────────────────────────────────────────────

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, {
      headers: {
        Authorization: `Basic ${AUTH}`,
        'User-Agent': 'XiphiasWPMigrator/1.0',
      },
    }, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}: ${data.slice(0, 200)}`));
          return;
        }
        try { resolve({ body: JSON.parse(data), headers: res.headers }); }
        catch (e) { reject(new Error(`JSON parse error for ${url}: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (DRY_RUN) { resolve(false); return; }
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);
    const mod = url.startsWith('https') ? https : http;

    const doGet = (u) => {
      mod.get(u, { headers: { 'User-Agent': 'XiphiasWPMigrator/1.0' } }, res => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          doGet(res.headers.location);
          return;
        }
        if (res.statusCode >= 400) {
          file.close();
          fs.unlinkSync(destPath);
          reject(new Error(`HTTP ${res.statusCode} downloading ${u}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      }).on('error', err => {
        file.close();
        try { fs.unlinkSync(destPath); } catch (_) {}
        reject(err);
      });
    };
    doGet(url);
  });
}

/** Convert a WP filename to a web-safe slug */
function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-');
}

/** Extract the file extension from a URL (jpg, png, webp, etc.) */
function extFromUrl(url) {
  const u = url.split('?')[0];
  return path.extname(u) || '.jpg';
}

/**
 * Very lightweight HTML → Markdown converter.
 * For production-quality output install `turndown` and swap this out.
 */
function htmlToMarkdown(html) {
  if (!html) return '';

  let md = html
    // headings
    .replace(/<h1[^>]*>(.*?)<\/h1>/gis, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gis, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gis, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gis, '\n#### $1\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gis, '\n##### $1\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gis, '\n###### $1\n')
    // bold / italic
    .replace(/<strong[^>]*>(.*?)<\/strong>/gis, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gis, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gis, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gis, '*$1*')
    // links
    .replace(/<a[^>]+href="([^"]*)"[^>]*>(.*?)<\/a>/gis, '[$2]($1)')
    // images — handled separately, just strip for now
    .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gis, '![$1]($2)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gis, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gis, '![]($1)')
    // lists
    .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (_, inner) =>
      inner.replace(/<li[^>]*>(.*?)<\/li>/gis, '- $1\n'))
    .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (_, inner) => {
      let i = 0;
      return inner.replace(/<li[^>]*>(.*?)<\/li>/gis, () => `${++i}. $1\n`);
    })
    // blockquote
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (_, t) =>
      t.split('\n').map(l => `> ${l}`).join('\n'))
    // paragraphs & line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gis, '\n$1\n')
    .replace(/<div[^>]*>(.*?)<\/div>/gis, '\n$1\n')
    // strip remaining tags
    .replace(/<[^>]+>/g, '')
    // decode HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, '')
    // collapse excessive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return md;
}

/** Download an image from WP and return the local /images/blogs/… path */
async function localiseImage(wpUrl, slug) {
  if (!wpUrl) return null;
  const ext = extFromUrl(wpUrl);
  const filename = sanitizeFilename(`${slug}-hero${ext}`);
  const destPath = path.join(IMG_DIR, filename);
  const webPath  = `/images/blogs/${filename}`;

  if (fs.existsSync(destPath)) {
    console.log(`  [img] already exists: ${filename}`);
    return webPath;
  }

  try {
    await downloadFile(wpUrl, destPath);
    console.log(`  [img] downloaded: ${filename}`);
    return webPath;
  } catch (err) {
    console.warn(`  [img] FAILED ${wpUrl}: ${err.message}`);
    return wpUrl; // fall back to remote URL
  }
}

/** Download all <img> srcs found in markdown body and rewrite paths */
async function localiseBodyImages(markdown, slug) {
  const imgRegex = /!\[([^\]]*)\]\((https?:\/\/(?:www\.)?xiphiasimmigration\.ae[^)]+)\)/g;
  const replacements = [];
  let match;
  while ((match = imgRegex.exec(markdown)) !== null) {
    replacements.push({ full: match[0], alt: match[1], url: match[2] });
  }

  for (const r of replacements) {
    const ext = extFromUrl(r.url);
    const basename = path.basename(r.url.split('?')[0]);
    const filename = sanitizeFilename(basename) || sanitizeFilename(`${slug}-img${ext}`);
    const destPath = path.join(IMG_DIR, filename);
    const webPath  = `/images/blogs/${filename}`;

    if (!fs.existsSync(destPath)) {
      try {
        await downloadFile(r.url, destPath);
        console.log(`  [body-img] downloaded: ${filename}`);
      } catch (err) {
        console.warn(`  [body-img] FAILED ${r.url}: ${err.message}`);
        continue;
      }
    }
    markdown = markdown.replace(r.full, `![${r.alt}](${webPath})`);
  }

  return markdown;
}

function buildFrontmatter(post, heroPath, categories, tags) {
  const title   = (post.title?.rendered ?? '').replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"');
  const slug    = post.slug ?? '';
  const date    = (post.date ?? '').slice(0, 10);
  const updated = (post.modified ?? '').slice(0, 10);
  const excerpt = htmlToMarkdown(post.excerpt?.rendered ?? '').replace(/\n/g, ' ').slice(0, 300);

  const catNames = categories.map(c => c.name).join(', ');
  const tagNames = tags.map(t => t.name);

  const lines = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `slug: ${JSON.stringify(slug)}`,
    `date: ${JSON.stringify(date)}`,
    `updated: ${JSON.stringify(updated)}`,
    `summary: ${JSON.stringify(excerpt)}`,
    heroPath ? `hero: ${JSON.stringify(heroPath)}` : null,
    heroPath ? `heroAlt: ${JSON.stringify(title)}` : null,
    tagNames.length ? `tags: [${tagNames.join(', ')}]` : null,
    catNames ? `categories: [${catNames}]` : null,
    `author: "XIPHIAS"`,
    '---',
  ].filter(Boolean);

  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function fetchAllPosts() {
  let page = 1;
  let allPosts = [];

  while (true) {
    const url = `${WP_BASE}/posts?per_page=${PER_PAGE}&page=${page}&status=publish&_embed=1`;
    console.log(`Fetching page ${page}…`);
    const { body: posts, headers } = await fetchJson(url);

    if (!Array.isArray(posts) || posts.length === 0) break;
    allPosts = allPosts.concat(posts);

    const totalPages = parseInt(headers['x-wp-totalpages'] ?? '1', 10);
    if (page >= totalPages) break;
    page++;
  }

  return allPosts;
}

async function fetchTerms(postId, taxonomy) {
  try {
    const { body } = await fetchJson(`${WP_BASE}/${taxonomy}?post=${postId}`);
    return Array.isArray(body) ? body : [];
  } catch {
    return [];
  }
}

async function processPost(post) {
  const slug    = post.slug;
  const outFile = path.join(BLOG_DIR, `${slug}.mdx`);

  if (SKIP_EXISTING && fs.existsSync(outFile)) {
    console.log(`[skip] ${slug}`);
    return;
  }

  console.log(`\n[post] ${slug}`);

  // 1. Featured image
  let heroPath = null;
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  if (featuredMedia?.source_url) {
    heroPath = await localiseImage(featuredMedia.source_url, slug);
  }

  // 2. Categories & tags from embedded data
  const embeddedTerms = post._embedded?.['wp:term'] ?? [];
  const categories = embeddedTerms.flat().filter(t => t.taxonomy === 'category');
  const tags       = embeddedTerms.flat().filter(t => t.taxonomy === 'post_tag');

  // 3. Convert body HTML → Markdown
  let body = htmlToMarkdown(post.content?.rendered ?? '');

  // 4. Download inline images in body
  body = await localiseBodyImages(body, slug);

  // 5. Build MDX
  const frontmatter = buildFrontmatter(post, heroPath, categories, tags);
  const mdx = `${frontmatter}\n\n${body}\n`;

  if (DRY_RUN) {
    console.log(`[dry-run] would write: ${outFile}`);
    console.log(frontmatter);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.mkdirSync(IMG_DIR,  { recursive: true });
  fs.writeFileSync(outFile, mdx, 'utf8');
  console.log(`  [ok] written: content/blog/${slug}.mdx`);
}

async function main() {
  console.log('=== Xiphias WP → MDX Migration ===');
  console.log(`Site  : ${WP_BASE}`);
  console.log(`Output: content/blog/  +  public/images/blogs/`);
  console.log(`DryRun: ${DRY_RUN}`);
  console.log('');

  const posts = await fetchAllPosts();
  console.log(`\nFound ${posts.length} published posts\n`);

  let ok = 0, fail = 0;

  for (const post of posts) {
    try {
      await processPost(post);
      ok++;
    } catch (err) {
      console.error(`[ERROR] ${post.slug}: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n=== Done: ${ok} OK, ${fail} failed ===`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
