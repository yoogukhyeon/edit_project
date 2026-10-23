import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, findSeoRoute, SITE_NAME, SITE_URL } from './seoRoutes';

const DEFAULT_IMAGE = `${SITE_URL}/images/meta.png`;

// 값을 넘기지 않으면 현재 주소로 seoRoutes.json에서 찾아 채운다 (페이지는 <SEOMetaTag />만 두면 된다).
type SEOMetaTagProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
};

const SEOMetaTag = ({ title, description, keywords, image = DEFAULT_IMAGE }: SEOMetaTagProps) => {
  const { pathname } = useLocation();
  const route = findSeoRoute(pathname);
  const path = route?.path ?? (pathname.replace(/\/+$/, '') || '/');
  const canonicalUrl = absoluteUrl(path);
  const rawTitle = title ?? route?.title ?? SITE_NAME;
  const pageTitle = rawTitle.includes(SITE_NAME) ? rawTitle : `${rawTitle} | ${SITE_NAME}`;
  const pageDescription = description ?? route?.description ?? '';
  const pageKeywords = (keywords ?? route?.keywords ?? []).join(', ');

  const publisher = { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}/images/logo.png` };
  const structuredData: object[] = [];
  if (path === '/') {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: pageDescription,
      inLanguage: 'ko-KR',
      publisher,
    });
  } else {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: route?.name ?? rawTitle,
      description: pageDescription,
      url: canonicalUrl,
      image,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      inLanguage: 'ko-KR',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      publisher,
    });
    // 검색 결과 경로 표시: 홈 > 툴 이름. (구글은 마지막을 뺀 모든 항목에 URL을 요구하는데,
    // 카테고리는 별도 페이지가 없어 구조화 데이터에는 넣지 않는다. 화면의 경로 표시는 SEOContent에서 한다.)
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: route?.name ?? rawTitle, item: canonicalUrl },
      ],
    });
  }

  return (
    <Helmet>
      <html lang="ko" />
      <title>{pageTitle}</title>

      <meta name="description" content={pageDescription} />
      {pageKeywords && <meta name="keywords" content={pageKeywords} />}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="Yeti" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      {/* 기본 공유 이미지(meta.png)는 1200x630 */}
      {image === DEFAULT_IMAGE && <meta property="og:image:width" content="1200" />}
      {image === DEFAULT_IMAGE && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={`${SITE_NAME} - 설치 없이 바로 쓰는 무료 웹 도구 모음`} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={canonicalUrl} />
      {structuredData.map((data) => (
        <script key={(data as { '@type': string })['@type']} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOMetaTag;
