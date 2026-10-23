export type MetaInputs = {
  title: string;
  desc: string;
  keyword: string;
  url: string;
  image: string;
  writer: string;
  index: string; // 'Y' = 검색 노출 허용
};

// 속성값 안에 들어갈 문자열을 HTML 이스케이프한다 (따옴표가 있어도 태그가 깨지지 않게)
const esc = (value: string) => value.trim().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// 입력한 값만 태그로 만든다. canonical과 og:url은 같은 대표 URL을 쓴다.
export const buildMetaTags = (v: MetaInputs) => {
  const lines: string[] = ['<meta charset="utf-8" />', '<meta name="viewport" content="width=device-width, initial-scale=1" />'];
  const title = esc(v.title);
  const desc = esc(v.desc);
  const url = esc(v.url);
  const image = esc(v.image);

  if (title) lines.push(`<title>${title}</title>`);
  if (desc) lines.push(`<meta name="description" content="${desc}" />`);
  if (v.keyword.trim()) lines.push(`<meta name="keywords" content="${esc(v.keyword)}" />`);
  if (v.writer.trim()) lines.push(`<meta name="author" content="${esc(v.writer)}" />`);
  lines.push(`<meta name="robots" content="${v.index === 'Y' ? 'index, follow' : 'noindex, nofollow'}" />`);
  if (url) lines.push(`<link rel="canonical" href="${url}" />`);

  lines.push('', '<!-- Open Graph (카카오톡·페이스북 공유 미리보기) -->', '<meta property="og:type" content="website" />');
  if (title) lines.push(`<meta property="og:title" content="${title}" />`);
  if (desc) lines.push(`<meta property="og:description" content="${desc}" />`);
  if (url) lines.push(`<meta property="og:url" content="${url}" />`);
  if (image) lines.push(`<meta property="og:image" content="${image}" />`);

  lines.push('', '<!-- Twitter(X) 카드 -->', `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`);
  if (title) lines.push(`<meta name="twitter:title" content="${title}" />`);
  if (desc) lines.push(`<meta name="twitter:description" content="${desc}" />`);
  if (image) lines.push(`<meta name="twitter:image" content="${image}" />`);

  return lines.join('\n');
};
