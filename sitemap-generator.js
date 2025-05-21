const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');
const { statSync } = require('fs');

const fs = require('fs');

const sitemap = new SitemapStream({
  hostname: 'https://webtool.everyday-365.com',
});

const writeStream = createWriteStream('./public/sitemap.xml');

// 현재 시간 또는 파일 수정 시간 기준 lastmod 생성
const getLastMod = (routePath = '') => {
  try {
    const fullPath = resolve(__dirname, `./pages${routePath === '/' ? '/index.js' : `${routePath}.js`}`);
    const fileStats = statSync(fullPath);
    return new Date(fileStats.mtime).toISOString();
  } catch (err) {
    // fallback to current time if file not found
    return new Date().toISOString();
  }
};

// 경로 배열 정의
const routes = [
  '/',
  '/html-remove',
  '/encode-decode',
  '/invest-lucky',
  '/lotto',
  '/my-ip',
  '/make-meta',
  '/make-qr',
  '/counter-char',
  '/text-convert',
  '/pdf-img',
  '/img-png',
  '/img-jpg',
];

// sitemap 작성
(async () => {
  try {
    // sitemap을 writeStream과 연결
    sitemap.pipe(writeStream);

    // 모든 경로 작성
    routes.forEach((path) => {
      sitemap.write({
        url: path,
        changefreq: 'monthly',
        priority: path === '/' ? 1.0 : 0.8,
        lastmod: getLastMod(path),
      });
    });

    sitemap.end();

    await streamToPromise(sitemap); // 여기서는 sitemap 자체를 넘겨야 함
    console.log('✅ sitemap.xml generated');
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
  }
})();
