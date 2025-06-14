const puppeteer = require('puppeteer');
const Table = require('cli-table');

async function scrapeNovakDjokovic() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });

  const page = await browser.newPage();
  await page.goto('https://news.google.com/home?hl=pt-PT&gl=PT&ceid=PT:pt-150');

  // Espera a que cargue el contenido correctamente
  await page.waitForSelector('.post-item');

  const noticias = await page.evaluate(() => {
    const resultados = [];
    document.querySelectorAll('.post-item').forEach(post => {
      const tituloEl = post.querySelector('h2 a');
      const fechaEl = post.querySelector('.post-date');
      if (tituloEl && fechaEl) {
        const titulo = tituloEl.textContent.trim();
        const fecha = fechaEl.textContent.trim();
        const link = tituloEl.href;
        if (titulo.toLowerCase().includes('novak djokovic')) {
          resultados.push({ titulo, fecha, link });
        }
      }
    });
    return resultados;
  });

  if (noticias.length === 0) {
    console.log('❌ No se encontraron noticias con "Novak Djokovic".');
  } else {
    const tabla = new Table({
      head: ['Título', 'Fecha', 'Link'],
      colWidths: [40, 20, 60],
      wordWrap: true,
    });

    noticias.forEach(noticia => {
      tabla.push([noticia.titulo, noticia.fecha, noticia.link]);
    });

    console.log(tabla.toString());

    console.log(`\n🔗 Navegando a la primera noticia: ${noticias[0].link}`);
    await page.goto(noticias[0].link, { waitUntil: 'networkidle2' });
  }
}

scrapeNovakDjokovic();
