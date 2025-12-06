const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs');

const app = express();
const PORT = 7860;
const TEMP_DIR = '/tmp';
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

app.get('/sswebvid', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Url parameter cannot be blank');

  const browser = await chromium.launch({
    headless: false,
    args: [
      "--use-gl=angle",
      "--enable-webgl",
      "--disable-software-rasterizer"
    ]
  });

  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    recordVideo: {
      dir: TEMP_DIR,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  try {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(5000);
    await page.evaluate(() => { document.body.style.zoom = "1.15"; });

    await page.evaluate(async () => {
      for (let i = 0; i < 10; i++) {
        window.scrollBy(0, 300);
        await new Promise(r => setTimeout(r, 600));
      }
    });

    const video = page.video();
    await page.close();
    await context.close();
    await browser.close();
    const videoPath = await video.path();

    res.setHeader("Content-Type", "video/mp4");
    const stream = fs.createReadStream(videoPath);
    stream.pipe(res);
    stream.on("close", () => fs.unlink(videoPath, () => {}));

  } catch (err) {
    await browser.close();
    res.status(500).send('Gagal rekam video: ' + err.message);
  }
});

app.get('/ssweb', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Parameter ?url= wajib');

  const browser = await chromium.launch({
    headless: false,
    args: [
      "--use-gl=angle",
      "--enable-webgl",
      "--disable-software-rasterizer"
    ]
  });

  const page = await browser.newPage();

  try {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    await page.evaluate(() => { document.body.style.zoom = "1.15"; });

    const buffer = await page.screenshot({ fullPage: true });

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(500).send('Gagal screenshot foto: ' + err.message);
  } finally {
    await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
