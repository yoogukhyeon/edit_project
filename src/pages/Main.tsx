import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import ToolIndex from '@components/common/ToolIndex';
import { useState } from 'react';
import { TbSearch } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import SEOMetaTag from 'seo/SEOMetaTag';

const POPULAR = [
  { path: '/pdf-merge', label: 'PDF 합치기' },
  { path: '/img-compress', label: '이미지 용량 줄이기' },
  { path: '/counter-char', label: '글자수 세기' },
  { path: '/avg-price', label: '물타기 계산기' },
  { path: '/age-calc', label: '만 나이' },
  { path: '/make-qr', label: 'QR코드' },
];

const Main = () => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <SEOMetaTag />

      <section className="mb-8 rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 px-6 py-8 text-white shadow-lg max-sm:px-4 max-sm:py-6">
        <h1 className="text-2xl font-bold leading-snug max-sm:text-xl">자주 쓰는 웹 도구, 설치 없이 바로</h1>
        <p className="mt-2 text-sm leading-6 text-white/90">
          PDF·이미지·텍스트·계산기·투자 도구를 모두 무료로 쓰세요. 파일은 서버로 전송되지 않고 브라우저에서만 처리됩니다.
        </p>
        <label htmlFor="tool-search" className="relative mt-5 block">
          <span className="sr-only">도구 검색</span>
          <TbSearch size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 !text-gray-400" aria-hidden="true" />
          <input
            id="tool-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="어떤 도구를 찾으세요? 예: pdf, 나이, 평단"
            className="block w-full rounded-xl border-0 bg-white py-3.5 pl-12 pr-4 text-base text-gray-900 shadow-md focus:ring-4 focus:ring-white/40"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {POPULAR.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex min-h-[36px] items-center rounded-full bg-white/20 px-3.5 text-sm font-medium !text-white hover:bg-white/30"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <ToolIndex query={query} />

      <SEOContent page="main" />
      <Comment pathname="main" />
    </div>
  );
};

export default Main;
