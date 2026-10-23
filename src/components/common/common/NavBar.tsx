import { toolCategories } from 'constants/tools';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ToolIcon from '../ToolIcon';

const Navbar = () => {
  const { pathname } = useLocation();
  const [nav, setNav] = useState<boolean>(false);

  // 페이지를 이동하면 메뉴를 닫는다.
  useEffect(() => {
    setNav(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setNav(!nav)}
        aria-label={nav ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={nav}
        className="p-1 text-gray-900 dark:text-white"
      >
        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* 배경을 누르면 닫힘 */}
      {nav && <div className="fixed inset-0 z-[9998] bg-black/30" onClick={() => setNav(false)} aria-hidden="true" />}

      <nav
        aria-label="웹툴 메뉴"
        className={`fixed top-0 bottom-0 z-[9999] w-[75%] max-w-xs overflow-y-auto bg-white px-3 pb-8 shadow-xl transition-[left] duration-300 dark:bg-slate-800 ${
          nav ? 'left-0' : 'left-[-100%]'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 p-4 text-base font-extrabold text-gray-900 dark:text-white">
          <img src="/images/logo.svg" alt="EVERYDAY 웹툴 로고" width={32} height={32} />
          EVERYDAY 웹툴
        </Link>

        {toolCategories.map((category) => (
          <div key={category.name} className="mt-3">
            <p className={`px-3 pb-1 text-xs font-bold ${category.style.text}`}>{category.name}</p>
            <ul>
              {category.tools.map((tool) => (
                <li key={tool.path}>
                  <NavLink
                    to={tool.path}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm ${
                        isActive ? 'bg-sky-50 font-semibold text-sky-700 dark:bg-slate-700 dark:text-sky-300' : 'text-gray-800 dark:text-gray-200'
                      }`
                    }
                  >
                    <ToolIcon icon={tool.icon} style={category.style} size="sm" />
                    {tool.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
