const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const judgeRoutes = require('./routes/judge');

dotenv.config();

const app = express();
puppeteer.use(StealthPlugin());

const allowedOrigins = [
  "http://localhost:5173",
  "https://code-arena-olive.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

// --- Route: Fetch Codeforces Problem ---
app.get('/api/codeforces/:contestId/:index', async (req, res) => {
  const { contestId, index } = req.params;
  let browser;

  try {
    const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`;
    
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-zygote',
        '--disable-gpu',
        '--single-process'
      ]
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );
    await page.setViewport({ width: 1366, height: 768 });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });

    const problemStatementExists = await page.$('.problem-statement');
    if (!problemStatementExists) {
      throw new Error('Problem statement not found. Page structure might have changed.');
    }

    // Extract sample input/output safely
    let sampleInput = '';
    let sampleOutput = '';
    try {
      [sampleInput, sampleOutput] = await page.evaluate(() => {
        const inputPre = document.querySelector('.sample-test .input pre');
        const outputPre = document.querySelector('.sample-test .output pre');
        return [
          inputPre ? inputPre.textContent.trim() : '',
          outputPre ? outputPre.textContent.trim() : ''
        ];
      });
    } catch (e) {
      console.warn('Sample input/output not found:', e.message);
    }

    const htmlContent = await page.content();
    const $ = cheerio.load(htmlContent);

    const title = $('.problem-statement .title').first().text().trim();

    let descriptionHtml = '';
    const problemStatement = $('.problem-statement');

    problemStatement.children().each((i, elem) => {
      const el = $(elem);
      if (!el.hasClass('title') &&
          !el.hasClass('time-limit') &&
          !el.hasClass('memory-limit') &&
          !el.hasClass('input-file') &&
          !el.hasClass('output-file') &&
          !el.hasClass('sample-test') &&
          !el.hasClass('after-sample-test')) {
        descriptionHtml += el.html() || '';
      }
    });

    if (!descriptionHtml.trim()) {
      descriptionHtml = $('.problem-statement .problem-description').html() || '';
    }

    res.json({ title, description: descriptionHtml, sampleInput, sampleOutput });
  } catch (err) {
    console.error(`Error fetching Codeforces problem ${contestId}/${index}:`, err.stack || err);

    let message = 'Failed to fetch problem from Codeforces.';
    if (err.message.includes('timeout')) {
      message = 'Page load or content timeout. Codeforces may be slow or blocking automated access.';
    } else if (err.message.includes('Problem statement not found')) {
      message = 'Problem statement not found. Page structure might have changed.';
    }

    res.status(500).json({ error: message });
  } finally {
    if (browser) await browser.close();
  }
});

// Judge routes
app.use('/api/judge', judgeRoutes);

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
