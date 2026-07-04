/**
 * Downloads the WordPress XML export by logging into wp-admin
 * and triggering Tools → Export → Posts.
 *
 * Usage:
 *   node scripts/wp-export-download.mjs --user=admin --pass=xiphias@0101
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => { const [k,v] = a.slice(2).split('='); return [k, v ?? true]; })
);

const USER = args.user;
const PASS = args.pass;
const WP_HOST = 'www.xiphiasimmigration.ae';

if (!USER || !PASS) {
  console.error('Usage: node wp-export-download.mjs --user=<u> --pass=<p>');
  process.exit(1);
}

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

// Step 1: GET login page to grab nonce / login fields
async function getLoginNonce(cookies = '') {
  const res = await request({
    hostname: WP_HOST, path: '/wp-login.php', method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0', Cookie: cookies },
  });
  const html = res.body.toString();
  // Extract _wpnonce from login form if present
  const nonceMatch = html.match(/name="testcookie" value="([^"]+)"/);
  const setCookies = [].concat(res.headers['set-cookie'] ?? []);
  return { cookies: setCookies.map(c => c.split(';')[0]).join('; '), html };
}

// Step 2: POST login
async function login(cookieStr) {
  const body = new URLSearchParams({
    log: USER,
    pwd: PASS,
    'wp-submit': 'Log In',
    redirect_to: '/wp-admin/',
    testcookie: '1',
  }).toString();

  const res = await request({
    hostname: WP_HOST,
    path: '/wp-login.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
      'User-Agent': 'Mozilla/5.0',
      Cookie: cookieStr + '; wordpress_test_cookie=WP%20Cookie%20check',
      Referer: `https://${WP_HOST}/wp-login.php`,
    },
  }, body);

  const setCookies = [].concat(res.headers['set-cookie'] ?? []);
  const allCookies = [
    ...cookieStr.split('; ').filter(Boolean),
    ...setCookies.map(c => c.split(';')[0]),
  ].join('; ');

  console.log('Login status:', res.status, res.headers.location ?? '');
  return allCookies;
}

// Step 3: GET the export page to grab _wpnonce for export
async function getExportNonce(cookies) {
  const res = await request({
    hostname: WP_HOST, path: '/wp-admin/export.php', method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0', Cookie: cookies },
  });
  const html = res.body.toString();
  const match = html.match(/name="_wpnonce"\s+value="([^"]+)"/);
  if (!match) {
    // dump a snippet for debugging
    console.error('Could not find _wpnonce. Page snippet:');
    console.error(html.slice(0, 800));
    return null;
  }
  return match[1];
}

// Step 4: Download the XML export
async function downloadExport(cookies, nonce, outPath) {
  const params = new URLSearchParams({
    download: 'true',
    content: 'post',
    _wpnonce: nonce,
    'post-status': 'publish',
  }).toString();

  const res = await request({
    hostname: WP_HOST,
    path: `/wp-admin/export.php?${params}`,
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0', Cookie: cookies },
  });

  if (res.status !== 200) {
    console.error('Export failed, status:', res.status);
    console.error(res.body.toString().slice(0, 400));
    return false;
  }

  const ct = res.headers['content-type'] ?? '';
  if (!ct.includes('xml') && !ct.includes('octet')) {
    console.error('Unexpected content-type:', ct);
    console.error(res.body.toString().slice(0, 400));
    return false;
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, res.body);
  console.log(`Saved XML export: ${outPath} (${res.body.length} bytes)`);
  return true;
}

async function main() {
  const outPath = path.join(ROOT, 'scripts', 'wp-export.xml');

  console.log('Step 1: Getting login page…');
  const { cookies: initCookies } = await getLoginNonce();

  console.log('Step 2: Logging in…');
  const authCookies = await login(initCookies);

  console.log('Step 3: Getting export nonce…');
  const nonce = await getExportNonce(authCookies);
  if (!nonce) { process.exit(1); }
  console.log('Nonce:', nonce);

  console.log('Step 4: Downloading XML export…');
  const ok = await downloadExport(authCookies, nonce, outPath);
  if (!ok) { process.exit(1); }
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
