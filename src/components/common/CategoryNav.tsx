import { toolCategories } from 'constants/tools';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// PC용 카테고리 메뉴. 펼침 목록은 닫혀 있어도 HTML에 남겨 크롤러가 내부 링크를 따라갈 수 있게 한다.
const CategoryNav = () => {
  const pathname = useLocation().pathname.replace(/\/+$/, '') || '/';
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    setOpen(null);
  }, [pathname]);

  return (
    <nav className="mt-5 max-md:hidden" aria-label="웹툴 카테고리" onKeyDown={(e) => e.key === 'Escape' && setOpen(null)}>
      <ul className="flex gap-2 rounded-xl bg-slate-50 p-1.5 dark:bg-slate-700/60">
        {toolCategories.map((category) => {
          const active = category.tools.some((tool) => tool.path === pathname);
          const isOpen = open === category.name;

          return (
            <li key={category.name} className="relative flex-1" onMouseEnter={() => setOpen(category.name)} onMouseLeave={() => setOpen(null)}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : category.name)}
                className={`w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active || isOpen
                    ? 'bg-white text-sky-700 shadow-sm dark:bg-slate-800 dark:text-sky-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                {category.name}
                <span className="ml-1 text-xs text-gray-400">▾</span>
              </button>
              <ul className={`${isOpen ? 'block' : 'hidden'} absolute left-0 top-full z-50 min-w-[220px] pt-2`} aria-label={`${category.name} 도구`}>
                <li className="overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-slate-800">
                  {category.tools.map((tool) => (
                    <NavLink
                      key={tool.path}
                      to={tool.path}
                      end
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm ${
                          isActive
                            ? 'bg-sky-50 font-semibold text-sky-700 dark:bg-slate-700 dark:text-sky-300'
                            : 'text-gray-700 hover:bg-slate-50 dark:text-gray-200 dark:hover:bg-slate-700'
                        }`
                      }
                    >
                      {tool.title}
                    </NavLink>
                  ))}
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryNav;
