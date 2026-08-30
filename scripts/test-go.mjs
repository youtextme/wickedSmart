import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));

await page.goto('http://localhost:4317/wickedSmart/', { waitUntil: 'networkidle' });
await page.waitForSelector('.go-btn', { timeout: 10000 });
await page.click('.go-btn');
await page.waitForSelector('.beat-choice', { timeout: 5000 });
const choiceCount = await page.locator('.beat-choice').count();
const nextBefore = await page.isVisible('.beat-next');
await page.click('.beat-choice >> nth=0');
await page.waitForTimeout(1200);
const nextAfter = await page.isVisible('.beat-next');
const reveal = await page.isVisible('.beat-reveal');
console.log('choices after Go:', choiceCount);
console.log('Next before pick:', nextBefore);
console.log('Next after pick:', nextAfter);
console.log('reveal shown (wrong pick):', reveal);
console.log('logs:', logs);
await browser.close();
