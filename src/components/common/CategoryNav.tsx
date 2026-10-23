import { toolCategories } from 'constants/tools';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// PC용 전체 메뉴. 카테고리 줄에 마우스를 올리거나 클릭하면 모든 툴이 한 패널에 펼쳐진다.
// 패널은 닫혀 있어도 HTML에 남겨 크롤러가 내부 링크를 따라갈 수 있게 한다.
const CategoryNav = () => {
  const pathname = useLocation().pathname.replace(/\/+$/, '') || '/';
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className="relative mt-5 max-md:hidden"
      aria-label="웹툴 전체 메뉴"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full rounded-xl bg-slate-50 p-1.5 dark:bg-slate-700/60"
      >
        {toolCategories.map((category) => {
          const active = category.tools.some((tool) => tool.path === pathname);
          return (
            <span
              key={category.name}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
                active ? 'bg-white text-sky-700 shadow-sm dark:bg-slate-800 dark:text-sky-300' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {category.name}
            </span>
          );
        })}
        <span className="flex items-center px-3 text-xs text-gray-400">{open ? '▲' : '▼'}</span>
      </button>

      <div className={`${open ? 'block' : 'hidden'} absolute left-0 right-0 top-full z-50 pt-2`}>
        <div className="grid grid-cols-6 gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-slate-800">
          {toolCategories.map((category) => (
            <div key={category.name}>
              <p className={`px-2 pb-1.5 text-xs font-bold ${category.style.text}`}>{category.name}</p>
              <ul>
                {category.tools.map((tool) => (
                  <li key={tool.path}>
                    <NavLink
                      to={tool.path}
                      end
                      className={({ isActive }) =>
                        `block rounded-lg px-2 py-1.5 text-sm ${
                          isActive
                            ? 'bg-sky-50 font-semibold text-sky-700 dark:bg-slate-700 dark:text-sky-300'
                            : 'text-gray-700 hover:bg-slate-50 hover:text-sky-700 dark:text-gray-200 dark:hover:bg-slate-700'
                        }`
                      }
                    >
                      {tool.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
