import { chromium } from 'playwright';

const url = process.argv[2] ?? 'https://youtextme.github.io/wickedSmart/';
const browser = await chromium.launch();
const page = await browser.newPage();
const logs = [];
const errors = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => errors.push(e.message));
page.on('requestfailed', (r) => errors.push(`REQ_FAIL ${r.url()} ${r.failure()?.errorText}`));

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
const rootHtml = await page.$eval('#root', (el) => el.innerHTML);
const goVisible = await page.isVisible('.go-btn').catch(() => false);
const titleVisible = await page.isVisible('.game-title').catch(() => false);
console.log('URL:', url);
console.log('root innerHTML length:', rootHtml.length);
console.log('root snippet:', rootHtml.slice(0, 200) || '(empty)');
console.log('game-title visible:', titleVisible);
console.log('go-btn visible:', goVisible);
console.log('errors:', errors);
console.log('console:', logs.slice(0, 15));
await browser.close();
