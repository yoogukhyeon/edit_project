import { buildMetaTags } from './metaTag';

const base = { title: '', desc: '', keyword: '', url: '', image: '', writer: '', index: 'Y' };

test('입력값만 태그로 만들고 따옴표를 이스케이프한다', () => {
  const html = buildMetaTags({ ...base, title: '내 "블로그" <소개>', desc: '설명 & 안내', url: 'https://a.com/', image: 'https://a.com/og.png' });
  expect(html).toContain('<title>내 &quot;블로그&quot; &lt;소개&gt;</title>');
  expect(html).toContain('<meta property="og:title" content="내 &quot;블로그&quot; &lt;소개&gt;" />');
  expect(html).toContain('<meta name="description" content="설명 &amp; 안내" />');
  expect(html).toContain('<link rel="canonical" href="https://a.com/" />');
  expect(html).toContain('summary_large_image');
  expect(html).not.toMatch(/[“”]/);
  expect(html).not.toContain('keywords');
});

test('검색 노출 거부', () => {
  expect(buildMetaTags({ ...base, index: 'N' })).toContain('noindex, nofollow');
});
