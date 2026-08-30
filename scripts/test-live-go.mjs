import { chromium } from 'playwright';

const url = process.argv[2] ?? 'https://youtextme.github.io/wickedSmart/';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('requestfailed', (r) => errors.push(`FAIL ${r.url()}`));

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
const before = await page.isVisible('.go-btn');
await page.click('.go-btn');
await page.waitForTimeout(1500);
const beat = await page.isVisible('.beat-screen');
const text = beat ? (await page.textContent('.beat-screen'))?.slice(0, 120) : '';
console.log('url', url);
console.log('go before', before);
console.log('beat after click', beat);
console.log('beat text', text);
console.log('errors', errors);
await browser.close();
