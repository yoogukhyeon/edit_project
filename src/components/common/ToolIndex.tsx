import { Link } from 'react-router-dom';
import { SEOPageKey, seoContent } from 'constants/seoContent';

const toolOrder: SEOPageKey[] = [
  'pdfToImg',
  'imgToPng',
  'imgToJpg',
  'htmlTagRemove',
  'textConvert',
  'counterChar',
  'makeQr',
  'metaTag',
  'myIp',
  'lotto',
  'investLucky',
  'urlEncoded',
];

const ToolIndex = () => {
  return (
    <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
      <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">무료 웹툴 모음</h2>
      <p className="mb-6 text-sm leading-7 text-gray-600 dark:text-gray-300">
        PDF, 이미지 변환, 텍스트 정리, QR코드 생성, SEO 메타태그, URL 인코딩과 디코딩까지 자주 필요한 온라인 도구를 한 곳에서 사용할 수 있습니다.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {toolOrder.map((key) => {
          const tool = seoContent[key];

          return (
            <article key={key} className="rounded-md border border-gray-200 p-4 transition hover:border-sky-300 dark:border-gray-700">
              <div className="mb-2 text-xs font-semibold text-sky-600 dark:text-sky-300">{tool.category}</div>
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                <Link to={tool.path}>{tool.title}</Link>
              </h3>
              <p className="mb-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{tool.intro}</p>
              <Link className="text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-300" to={tool.path}>
                바로 사용하기
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ToolIndex;
