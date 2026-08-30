import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));

await page.goto('http://localhost:4317/wickedSmart/', { waitUntil: 'networkidle' });
await page.waitForSelector('.go-btn', { timeout: 10000 });
console.log('title before:', await page.isVisible('.game-title'));
console.log('beat before:', await page.isVisible('.beat-screen'));
await page.click('.go-btn');
await page.waitForTimeout(1500);
console.log('title after:', await page.isVisible('.game-title'));
console.log('beat after:', await page.isVisible('.beat-screen'));
const beat = await page.$('.beat-screen');
if (beat) console.log('beat text:', (await beat.textContent()).slice(0, 300));
else console.log('no beat screen');
console.log('logs:', logs);
await browser.close();
