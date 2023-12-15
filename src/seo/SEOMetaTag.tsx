// SEOMetaTag.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMetaTag = (props: any) => {
  return (
    <Helmet>
      <title>{props.title} | EVERYDAY 웹툴</title>

      {/* <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />

      <link rel=”shortcut icon” href=”favicon.ico”>
      <link rel=”apple-touch-icon-precomposed” href=”icon57.png”>

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.imgsrc} />
      <meta property="og:url" content={props.url} />

      <meta property="og:image" content="https://example.com/image.jpg">

      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.imgsrc} />

      <link rel="canonical" href={props.url} /> */}
    </Helmet>
  );
};

export default SEOMetaTag;
