const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '../src/data/articles.json');
const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(articlesPath)) {
  console.error('articles.json not found!');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));
const siteUrl = 'https://adarsh.dev';

// 1. Generate RSS Feed
let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Adarsh | Technical Articles &amp; Logs</title>
  <link>${siteUrl}/articles</link>
  <description>Technical essays, architectural reviews, and tutorials on systems design.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
`;

articles.forEach((art) => {
  rss += `  <item>
    <title>${art.title.replace(/&/g, '&amp;')}</title>
    <link>${siteUrl}/articles/${art.slug}</link>
    <guid>${siteUrl}/articles/${art.slug}</guid>
    <pubDate>${new Date(art.date).toUTCString()}</pubDate>
    <description>${art.excerpt.replace(/&/g, '&amp;')}</description>
    <category>${art.category || 'Technology'}</category>
  </item>
`;
});

rss += `</channel>
</rss>`;

fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
console.log('Successfully generated public/rss.xml');

// 2. Generate Sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/projects</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/experience</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/articles</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/timeline</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${siteUrl}/certificates</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${siteUrl}/contact</loc>
    <priority>0.7</priority>
  </url>
`;

articles.forEach((art) => {
  sitemap += `  <url>
    <loc>${siteUrl}/articles/${art.slug}</loc>
    <lastmod>${art.date}</lastmod>
    <priority>0.6</priority>
  </url>
`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Successfully generated public/sitemap.xml');
