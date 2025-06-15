const puppeteer = require('puppeteer');


async function scrapeNovakDjokovic() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });

  const page = await browser.newPage();
  await page.goto('https://www.puntodebreak.com')
  await page.click('a[href="/tag/novak-djokovic"]')
  await new Promise (r => setTimeout(r,10000));
  
  const result = await page.evaluate(()=> {
    document.querySelector('h1').innerText
  })

  console.log(result)
  await browser.close()

}

scrapeNovakDjokovic();
