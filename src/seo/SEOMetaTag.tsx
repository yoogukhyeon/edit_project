import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'EVERYDAY 웹툴';
const SITE_URL = 'https://webtool.everyday-365.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/meta.png`;

type SEOMetaTagProps = {
  title: string;
  description: string;
  url: string;
  imgsrc?: string;
  keywords?: string;
};

const toAbsoluteUrl = (url: string) => {
  if (!url) return SITE_URL;
  if (url.startsWith('http')) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

const SEOMetaTag = ({ title, description, url, imgsrc = DEFAULT_IMAGE, keywords }: SEOMetaTagProps) => {
  const canonicalUrl = toAbsoluteUrl(url);
  const imageUrl = toAbsoluteUrl(imgsrc);
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const keywordContent =
    keywords ||
    'PDF 미리보기, PDF 이미지 변환, 이미지 PNG 변환, 이미지 JPG 변환, HTML 태그 제거기, 영어 대문자 소문자 변환, 글자수 문자수 계산기, QR코드 만들기, 메타태그 SEO 만들기, 아이피 확인, 로또 당첨번호, 투자운세, URL 인코딩, URL 디코딩';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: pageTitle,
    description,
    url: canonicalUrl,
    image: imageUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    inLanguage: 'ko-KR',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
  };

  return (
    <Helmet>
      <html lang="ko" />
      <title>{pageTitle}</title>

      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" href="/images/apple-touch-icon.png" />

      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="Yeti" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default SEOMetaTag;
