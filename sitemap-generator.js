const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { statSync } = require('fs');
const { SITE_URL, routes } = require('./seo-routes');

// 현재 시간 또는 파일 수정 시간 기준 lastmod 생성
const getLastMod = (routePath = '') => {
  try {
    const route = routes.find((item) => item.path === routePath);
    const fullPath = resolve(__dirname, route?.source || 'src/App.tsx');
    const fileStats = statSync(fullPath);
    return new Date(fileStats.mtime).toISOString();
  } catch (err) {
    // fallback to current time if file not found
    return new Date().toISOString();
  }
};

const escapeXml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// sitemap 작성
try {
  const urls = routes
    .map((route) => {
      const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
      const priority = route.path === '/' ? '1.0' : '0.8';

      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${getLastMod(route.path)}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');

  writeFileSync(resolve(__dirname, './public/sitemap.xml'), xml);
  console.log('sitemap.xml generated');
} catch (err) {
  console.error('Error generating sitemap:', err);
  process.exitCode = 1;
}
