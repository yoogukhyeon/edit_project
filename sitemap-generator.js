// sitemap.xml과 rss.xml을 src/constants/seoRoutes.json(페이지별 SEO 정보) 하나로 생성한다.
// npm run build 전에(prebuild) 실행되어 public/에 쓰고, 빌드 때 그대로 배포된다.
const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const routes = require('./src/constants/seoRoutes.json');

const SITE_URL = 'https://webtool.everyday-365.com';
const SITE_NAME = 'EVERYDAY 웹툴';

const absoluteUrl = (path) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const escapeXml = (value = '') =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

// lastmod는 페이지 소스 파일의 마지막 커밋 시각으로 정한다.
// 커밋 전 수정 사항이 있으면(곧 배포될 변경) 지금 시각을 쓴다. 파일 수정 시각(mtime)은 포매터만 돌려도 바뀌어 부정확하다.
const now = new Date().toISOString();
const getLastMod = (source) => {
  try {
    const file = resolve(__dirname, source);
    const dirty = execSync(`git status --porcelain -- "${file}"`, { cwd: __dirname }).toString().trim();
    if (dirty) return now;
    const committed = execSync(`git log -1 --format=%cI -- "${file}"`, { cwd: __dirname }).toString().trim();
    return committed ? new Date(committed).toISOString() : now;
  } catch (err) {
    return now;
  }
};

const entries = routes.map((route) => ({ ...route, loc: absoluteUrl(route.path), lastmod: getLastMod(route.source) }));

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map((e) =>
    [
      '  <url>',
      `    <loc>${escapeXml(e.loc)}</loc>`,
      `    <lastmod>${e.lastmod}</lastmod>`,
      `    <changefreq>${e.path === '/' ? 'weekly' : 'monthly'}</changefreq>`,
      `    <priority>${e.path === '/' ? '1.0' : '0.8'}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n');

// 네이버 서치어드바이저에 제출할 수 있는 RSS (최근 수정한 페이지가 위로)
const rssItems = [...entries]
  .sort((a, b) => b.lastmod.localeCompare(a.lastmod))
  .map((e) =>
    [
      '    <item>',
      `      <title>${escapeXml(e.name)}</title>`,
      `      <link>${escapeXml(e.loc)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(e.loc)}</guid>`,
      `      <description>${escapeXml(e.description)}</description>`,
      `      <pubDate>${new Date(e.lastmod).toUTCString()}</pubDate>`,
      '    </item>',
    ].join('\n'),
  );
const rss = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  `    <title>${SITE_NAME}</title>`,
  `    <link>${SITE_URL}/</link>`,
  `    <description>${escapeXml(routes.find((r) => r.path === '/').description)}</description>`,
  '    <language>ko</language>',
  `    <lastBuildDate>${new Date(now).toUTCString()}</lastBuildDate>`,
  `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
  ...rssItems,
  '  </channel>',
  '</rss>',
  '',
].join('\n');

writeFileSync(resolve(__dirname, 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(__dirname, 'public/rss.xml'), rss);
console.log(`sitemap.xml (${entries.length} urls), rss.xml generated`);
