const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');

const options = {
url: 'https://news.google.com/search?q=novak%20djokovic&hl=es-419&gl=US&ceid=US%3Aes-419',
transform: body => cheerio.load(body)
};

rp(options)
  .then($ => {
    const tabla = new Table({
      head: ['Año', 'Título', 'Enlace'],
      colWidths: [60, 60]
    });

    $('a').each((i, el) => {
      const titulo = $(el).text().trim();
      const link = $(el).attr('href');

      if (titulo.toLowerCase().includes('novak')) {
        const url = link.startsWith('http') ? link : `https://news.google.com${link.replace('./', '/')}`;
        tabla.push([titulo, url]);
      }
    });

    if (tabla.length === 0) {
      console.log('❌ No se encontraron noticias sobre Novak.');
    } else {
      console.log(tabla.toString());
    }
  })
  .catch(err => {
    console.error('❌ Error en el scraping:', err.message);
  });