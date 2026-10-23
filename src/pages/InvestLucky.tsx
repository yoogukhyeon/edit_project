import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import TodayLucksPromo from '@components/common/TodayLucksPromo';
import { toolCategories } from 'constants/tools';
import { h1Class, leadClass } from 'constants/ui';
import { Link } from 'react-router-dom';
import SEOMetaTag from 'seo/SEOMetaTag';

const InvestLucky = () => {
  const investTools = (toolCategories.find((category) => category.name === '투자')?.tools ?? []).filter((tool) => tool.path !== '/invest-lucky');

  return (
    <div>
      <SEOMetaTag
        title={'오늘의 투자운세'}
        description={'오늘의 재물운·투자운을 무료로 확인하고, 물타기·수익률·분할매수 계산기로 오늘의 매매 계획까지 숫자로 점검하세요.'}
        url={'https://webtool.everyday-365.com/invest-lucky'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className={h1Class}>오늘의 투자 운세</h1>
      <p className={leadClass}>오늘의 재물·투자운은 운월관에서 무료로 확인하고, 매매 계획은 아래 투자 계산기로 점검해보세요.</p>

      <TodayLucksPromo />

      <nav aria-label="투자 계산기" className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">운세 확인 후, 숫자로 점검해보세요</h2>
        <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
          운세는 참고만 하고, 실제 매매는 평단가·손익분기·손절가를 계산한 뒤 결정하세요.
        </p>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {investTools.map((tool) => (
            <li key={tool.path}>
              <Link
                to={tool.path}
                className="block h-full rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-sky-400 hover:bg-sky-50 dark:border-slate-600 dark:bg-slate-700/50 dark:hover:bg-slate-700"
              >
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">{tool.title}</span>
                <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">{tool.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <SEOContent page="investLucky" />
      <Comment pathname="investLucky" />
    </div>
  );
};

export default InvestLucky;
