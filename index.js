const puppeteer = require('puppeteer');


async function openWebPage() {

  const browser = await puppeteer.launch({
      headless: false,
      slowMo:400,
    }
  )
 
  const page = await browser.newPage()

  await  page.goto('https://www.puntodebreak.com/tag/novak-djokovic')

await browser.close()

}

openWebPage()

