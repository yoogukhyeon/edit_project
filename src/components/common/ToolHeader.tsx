import { findTool } from 'constants/tools';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import ToolIcon from './ToolIcon';

type Props = { title: string; children?: ReactNode };

// 툴 페이지 상단 공통 헤더: 아이콘 + 카테고리 배지 + 제목(h1) + 한 줄 설명
const ToolHeader = ({ title, children }: Props) => {
  const found = findTool(useLocation().pathname);

  return (
    <header className="mb-6 flex items-start gap-3">
      {found && <ToolIcon icon={found.tool.icon} style={found.category.style} size="lg" />}
      <div className="min-w-0">
        {found && (
          <span className={`mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${found.category.style.chip}`}>
            {found.category.name}
          </span>
        )}
        <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white max-sm:text-xl">{title}</h1>
        {children && <p className="mt-1.5 text-sm leading-6 text-gray-500 dark:text-gray-400">{children}</p>}
      </div>
    </header>
  );
};

export default ToolHeader;
