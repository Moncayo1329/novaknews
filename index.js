const puppeteer = require('puppeteer');


async function scrapeNovakDjokovic() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });

  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com')
  const result = await page.evaluate(() => {
const quotes = document.querySelectorAll('.quote')
return quotes

  })

  console.log(result)

  await browser.close()
}
 
scrapeNovakDjokovic();