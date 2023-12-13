import parse from 'html-react-parser';
import { Inputs } from 'pages/MetaTag';

export const script = (values: Inputs, checkVal: string): any => {
  const robot = checkVal === 'Y' ? '<meta name="robots" content="index, follow" />' : '<meta name="robots" content="noindex, nofollow" />';

  const tag = `
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <title>${values.title}</title>
    <meta name=“title” content="${values.title}">
    <meta name="author" content="${values.writer}">
    <meta name="description" content="${values.desc}">
    <meta name="keywords" content="${values.keyword}”>

    <meta property="og:type" content="website">
    <meta property="og:url" content="${values.url}">
    <meta property="og:title" content="${values.title}">
    <meta property="og:description" content="${values.desc}">
    <meta property="og:site_name" content="${values.title}">

    <meta name="twitter:title" content="${values.title}" /> 
    <meta name="twitter:description" content="${values.desc}" /> 
    ${robot}

    <link rel="canonical" href="${values.curl}">
    `;

  return tag;
};
