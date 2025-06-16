const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: '/tmp',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  await page.goto('https://chatgpt.com');
  await page.waitForTimeout(3000);
  await browser.close();

  const files = fs.readdirSync('/tmp').filter(f => f.endsWith('.webm'));
  console.log('Saved video:', files[0]);
})();
