const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const sitemap = new SitemapStream({ hostname: 'https://xpresscookinggas.com' });

streamToPromise(
  sitemap.pipe(createWriteStream('./public/sitemap.xml'))
).then(() => console.log('Sitemap generated successfully!'));

// Add your pages
sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/About', changefreq: 'monthly', priority: 0.7 });
sitemap.write({ url: '/Product', changefreq: 'monthly', priority: 0.7 });
sitemap.write({ url: '/Contact', changefreq: 'monthly', priority: 0.7 });

sitemap.end();
