import { Helmet } from 'react-helmet-async';
import React from 'react';

const SEOMetaTag = (props: any) => {
  return (
    <Helmet>
      <title>{props.title}</title>

      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" href="/images/apple-touch-icon.png" />

      <meta name="description" content={props.description} />
      <meta
        name="keywords"
        content="PDF 미리보기, PDF 이미지 변환, 이미지 PNG 변환, 이미지 JPG 변환, HTML 태그 제거기, 영어 대문자 소문자 변환, 글자수 문자수 계산기, 나만의 QR코드 만들기, 메타태그(SEO) 만들기, 아이피, 내 아이피, 로또, 투자운세"
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.imgsrc} />
      <meta property="og:url" content={props.url} />
      <meta name="robots" content="index, follow" />

      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.imgsrc} />

      <link rel="canonical" href={props.url} />
    </Helmet>
  );
};

export default SEOMetaTag;
