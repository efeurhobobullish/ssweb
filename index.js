const express = require('express');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 7860;
const TEMP_DIR = '/tmp';
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
app.get('/sswebvid', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Url parameter cannot be blank');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: '/tmp',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await page.waitForTimeout(15000);
    const videoPath = await page.video().path();

    await browser.close();

    res.setHeader('Content-Type', 'video/mp4');
    const stream = fs.createReadStream(videoPath);
    stream.pipe(res);
    stream.on('end', () => fs.unlink(videoPath, () => {})); 
  } catch (err) {
    await browser.close();
    res.status(500).send('Gagal rekam video: ' + err.message);
  }
});


app.get('/ssweb', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Parameter ?url= wajib');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 15000 });

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
  console.log(`Server jalan di http://localhost:${PORT}`);
});
