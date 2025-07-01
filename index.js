const puppeteer = require('puppeteer');


async function scrapeNovakDjokovic() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });

  const page = await browser.newPage();
  await page.goto('https://news.google.com/search?q=novak%20djokovic&hl=es-419&gl=AR&ceid=AR%3Aes-419', {
    waitUntil: 'networkidle2',
  });

try{
  await page.waitForSelector('article h3', {timeout: 60000});
} catch (err){
  console.error('No se cargo el selector a tiempo',err.message);
  await browser.close();
  return;
}
const articles = await page.evaluate(() => {
const data = [];
const articlesNodes = document.querySelectorAll('articles');

articleNodes.forEach((article) => {
  const titleElement = article.querySelector('h3');
  const  linkElement = article.querySelector('a');

  if (titleElement && linkElement) {
 const title = titleElement.innerText;
const url = linkElement.href.startsWith('http')
? linkElement.href
 : 'https://news.google.com' + linkElement.getAttribute('href').replace('./', '/');
data.push({ title, url });
      }
    });

    return data;
  });

  console.log('Noticias encontradas:\n', articles);

  await browser.close();



  }
 
scrapeNovakDjokovic();