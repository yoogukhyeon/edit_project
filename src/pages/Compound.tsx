import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { NumberField, ResultCard, ShareBar, pct, won } from '@components/invest/InvestUI';
import { h1Class, leadClass } from 'constants/ui';
import { useToolState } from 'hooks/useToolState';
import SEOMetaTag from 'seo/SEOMetaTag';
import { compoundGrowth, toNumber } from 'utill/invest';

const DEFAULTS = { initial: '10000000', monthly: '500000', rate: '7', years: '10' };

const Compound = () => {
  const { state, set, reset, shareUrl } = useToolState('tool:compound', DEFAULTS);
  // 너무 큰 기간은 표가 길어지므로 최대 60년
  const years = Math.min(Math.max(toNumber(state.years), 0), 60);
  const rows = compoundGrowth(toNumber(state.initial), toNumber(state.monthly), toNumber(state.rate) / 100, years);
  const last = rows[rows.length - 1];

  return (
    <div>
      <SEOMetaTag
        title={'복리 계산기 · 적립식 투자 계산기'}
        description={
          '초기 투자금과 매월 적립금, 연 수익률, 기간을 입력하면 복리로 불어나는 최종 금액과 연도별 원금·수익을 계산하는 적립식 복리 계산기입니다.'
        }
        url={'https://webtool.everyday-365.com/compound'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className={h1Class}>복리 계산기 · 적립식 투자 계산기</h1>
      <p className={leadClass}>매월 꾸준히 적립하며 복리로 굴렸을 때 자산이 어떻게 불어나는지 연도별로 확인하세요. (월복리, 매월 말 적립 기준)</p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <NumberField id="initial" label="초기 투자금" value={state.initial} onChange={set('initial')} suffix="원" />
        <NumberField id="monthly" label="매월 적립금" value={state.monthly} onChange={set('monthly')} suffix="원" />
        <NumberField id="rate" label="연 수익률" value={state.rate} onChange={set('rate')} suffix="%" />
        <NumberField id="years" label="투자 기간" value={state.years} onChange={set('years')} suffix="년" />
      </div>

      {last && (
        <>
          <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
            <ResultCard label={`${last.year}년 후 예상 금액`} value={won(last.value)} tone="main" />
            <ResultCard label="총 납입 원금" value={won(last.contributed)} />
            <ResultCard label="총 수익" value={won(last.profit)} tone="plus" />
            <ResultCard label="원금 대비 수익률" value={last.contributed > 0 ? pct(last.profit / last.contributed) : '-'} />
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-right text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <th className="py-2 text-center">연차</th>
                  <th>납입 원금</th>
                  <th>수익</th>
                  <th className="pr-1">평가 금액</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.year} className="border-b border-gray-100 text-gray-800 dark:border-gray-700 dark:text-gray-200">
                    <td className="py-2 text-center font-semibold text-sky-600">{row.year}년</td>
                    <td>{won(row.contributed)}</td>
                    <td className="text-red-600 dark:text-red-400">{won(row.profit)}</td>
                    <td className="pr-1 font-semibold">{won(row.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        ※ 세금과 수수료, 물가상승률은 반영하지 않은 단순 계산입니다. 실제 수익률은 매년 달라집니다.
      </p>

      <ShareBar shareUrl={shareUrl} onReset={reset} event="compound" />
      <SEOContent page="compound" />
      <Comment pathname="compound" />
    </div>
  );
};

export default Compound;
