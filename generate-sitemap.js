import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function generateSitemap() {
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

  const sitemap = new SitemapStream({ hostname: 'https://xpresscookinggas.com' });

  // Pipe sitemap to file
  const writeStream = createWriteStream(sitemapPath);
  sitemap.pipe(writeStream);

  // Add pages
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/About', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/Product', changefreq: 'monthly', priority: 0.7 });
  sitemap.write({ url: '/Services', changefreq: 'weekly', priority: 0.9 });
  sitemap.write({ url: '/Contact', changefreq: 'monthly', priority: 0.7 });

  sitemap.end();

  // Wait for the file to finish writing
  await streamToPromise(sitemap);

  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
