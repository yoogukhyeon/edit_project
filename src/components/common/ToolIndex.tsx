import { toolCategories } from 'constants/tools';
import { Link } from 'react-router-dom';

// 홈 상단의 카테고리별 툴 목록. PDF 보기는 홈 화면 자체에 있으므로 제외한다.
const ToolIndex = () => {
  return (
    <div className="space-y-6">
      {toolCategories.map((category) => (
        <section key={category.name}>
          <h2 className="mb-2 text-sm font-semibold text-sky-700 dark:text-sky-300">{category.name}</h2>
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {category.tools
              .filter((tool) => tool.path !== '/')
              .map((tool) => (
                <li key={tool.path}>
                  <Link
                    to={tool.path}
                    className="block h-full rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-sky-400 hover:bg-sky-50 dark:border-slate-600 dark:bg-slate-700/50 dark:hover:bg-slate-700"
                  >
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">{tool.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-gray-500 dark:text-gray-400">{tool.desc}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default ToolIndex;
