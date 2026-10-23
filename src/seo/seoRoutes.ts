import routes from 'constants/seoRoutes.json';

export type SeoRoute = { path: string; source: string; name: string; title: string; description: string; keywords: string[] };

export const SITE_NAME = 'EVERYDAY 웹툴';
export const SITE_URL = 'https://webtool.everyday-365.com';

// 페이지별 SEO 정보(제목·설명·키워드)는 constants/seoRoutes.json 한 곳에서 관리한다.
// 같은 파일을 sitemap·RSS 생성 스크립트(sitemap-generator.js)도 읽는다.
export const seoRoutes = routes as SeoRoute[];

export const findSeoRoute = (pathname: string) => {
  const path = pathname.replace(/\/+$/, '') || '/';
  return seoRoutes.find((route) => route.path === path);
};

export const absoluteUrl = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
