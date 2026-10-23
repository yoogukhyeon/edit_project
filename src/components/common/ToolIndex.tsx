import { toolCategories } from 'constants/tools';
import { Link } from 'react-router-dom';
import ToolIcon from './ToolIcon';

// 홈의 카테고리별 툴 목록. query가 있으면 이름·설명·카테고리로 걸러서 보여준다.
const ToolIndex = ({ query = '' }: { query?: string }) => {
  const q = query.trim().toLowerCase().replace(/\s+/g, '');
  const match = (text: string) => text.toLowerCase().replace(/\s+/g, '').includes(q);
  const categories = toolCategories
    .map((category) => ({
      ...category,
      tools: q ? category.tools.filter((tool) => match(tool.title) || match(tool.desc) || match(category.name)) : category.tools,
    }))
    .filter((category) => category.tools.length > 0);

  if (categories.length === 0) {
    return (
      <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-gray-500 dark:bg-slate-700/50 dark:text-gray-300">
        ‘{query}’에 맞는 도구가 없습니다. 다른 단어로 찾아보세요.
      </p>
    );
  }

  return (
    <div className="space-y-7">
      {categories.map((category) => (
        <section key={category.name}>
          <h2 className={`mb-2.5 text-sm font-bold ${category.style.text}`}>
            {category.name} <span className="font-normal text-gray-400">{category.tools.length}</span>
          </h2>
          <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
            {category.tools.map((tool) => (
              <li key={tool.path}>
                <Link
                  to={tool.path}
                  className="flex h-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md dark:border-slate-600 dark:bg-slate-700/50 max-sm:flex-col max-sm:gap-2"
                >
                  <ToolIcon icon={tool.icon} style={category.style} size="md" />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">{tool.title}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-gray-500 dark:text-gray-400">{tool.desc}</span>
                  </span>
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
