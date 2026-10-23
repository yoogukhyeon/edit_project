import ToolIcon from '@components/common/ToolIcon';
import { toolCategories } from 'constants/tools';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// 많이 찾는 툴 바로가기
const POPULAR_PATHS = ['/pdf-merge', '/img-compress', '/counter-char', '/avg-price'];
const popular = toolCategories.flatMap((category) =>
  category.tools.filter((tool) => POPULAR_PATHS.includes(tool.path)).map((tool) => ({ tool, category })),
);

const NotFound = () => {
  return (
    <div className="py-14 text-center max-sm:py-10">
      <Helmet>
        <title>페이지를 찾을 수 없습니다</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <p className="text-5xl font-extrabold text-sky-500">404</p>
      <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white max-sm:text-xl">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 원하는 도구를 찾아보세요.</p>

      <Link
        to="/"
        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 px-8 text-base font-semibold !text-white shadow-md hover:shadow-lg"
      >
        홈으로 이동
      </Link>

      <ul className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-2 text-left">
        {popular.map(({ tool, category }) => (
          <li key={tool.path}>
            <Link
              to={tool.path}
              className="flex min-h-[52px] items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:border-sky-300 dark:border-slate-600 dark:bg-slate-700/50 dark:text-white"
            >
              <ToolIcon icon={tool.icon} style={category.style} size="sm" />
              {tool.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotFound;
