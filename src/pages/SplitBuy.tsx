import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { NumberField, ResultCard, ShareBar, num, pct, won } from '@components/invest/InvestUI';
import { useToolState } from 'hooks/useToolState';
import SEOMetaTag from 'seo/SEOMetaTag';
import { parseWeights, splitBuyPlan, toNumber } from 'utill/invest';

const WEIGHT_PRESETS = [
  { label: '균등 5회', value: '1,1,1,1,1' },
  { label: '점점 늘리기', value: '1,1,2,2,3' },
  { label: '2배씩 (마틴)', value: '1,2,4,8' },
  { label: '균등 3회', value: '1,1,1' },
];

const DEFAULTS = { budget: '10000000', first: '50000', weights: '1,1,1,1,1', drop: '5', asset: 'stock' };

const SplitBuy = () => {
  const { state, set, reset, shareUrl } = useToolState('tool:split-buy', DEFAULTS);
  const decimals = state.asset === 'coin' ? 8 : 0;
  const unit = state.asset === 'coin' ? '개' : '주';
  const rows = splitBuyPlan(toNumber(state.budget), toNumber(state.first), parseWeights(state.weights), toNumber(state.drop) / 100, decimals);
  const last = rows[rows.length - 1];
  const leftover = toNumber(state.budget) - (last?.totalAmount ?? 0);

  return (
    <div>
      <SEOMetaTag
        title={'분할매수 계산기'}
        description={
          '총 예산과 첫 매수가, 분할 비중, 하락 간격을 입력하면 회차별 매수가·수량·평단가를 표로 계획해주는 주식·코인 분할매수 계산기입니다.'
        }
        url={'https://webtool.everyday-365.com/split-buy'}
        imgsrc={'/images/meta.png'}
      />
      <ToolHeader title="분할매수 계산기">
        예산을 몇 번에 나눠, 얼마씩 떨어질 때마다 살지 정하면 회차별 매수 계획과 평단가 변화를 보여드립니다.
      </ToolHeader>

      <div className="mb-4 flex gap-2">
        {[
          ['stock', '주식 (정수 수량)'],
          ['coin', '코인 (소수 수량)'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => set('asset')(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              state.asset === key ? 'bg-sky-600 text-white' : 'bg-slate-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
        <NumberField id="budget" label="총 예산" value={state.budget} onChange={set('budget')} suffix="원" />
        <NumberField id="first" label="1차 매수가" value={state.first} onChange={set('first')} suffix="원" />
        <NumberField
          id="drop"
          label="회차별 하락 간격"
          value={state.drop}
          onChange={set('drop')}
          suffix="%"
          hint="직전 매수가보다 몇 % 낮을 때 살지"
        />
      </div>
      <div className="mt-3">
        <NumberField
          id="weights"
          label="회차별 비중"
          value={state.weights}
          onChange={set('weights')}
          hint="쉼표로 구분 (예: 1,1,2 → 25%, 25%, 50%)"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {WEIGHT_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => set('weights')(p.value)}
              className={`min-h-[36px] rounded-md border px-3 py-1.5 text-xs ${
                state.weights === p.value
                  ? 'border-sky-600 text-sky-700 dark:text-sky-300'
                  : 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {rows.length > 0 && last && (
        <>
          <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
            <ResultCard label="최종 평단가" value={won(last.avg)} tone="main" sub={`1차 매수가 대비 ${pct(last.avg / toNumber(state.first) - 1)}`} />
            <ResultCard label="마지막 매수가" value={won(last.price)} sub={`1차 대비 ${pct(last.dropFromFirst)}`} />
            <ResultCard label="총 수량" value={`${num(last.totalQty, decimals)}${unit}`} />
            <ResultCard label="사용 금액" value={won(last.totalAmount)} sub={`남는 금액 ${won(leftover)}`} />
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-right text-sm md:min-w-[560px]">
              <thead>
                <tr className="border-b border-gray-200 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <th className="py-2 text-center">회차</th>
                  <th>매수가</th>
                  <th>1차 대비</th>
                  <th>수량</th>
                  <th className="max-sm:hidden">매수금액</th>
                  <th className="max-sm:hidden">누적 금액</th>
                  <th className="pr-1">누적 평단</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.round} className="border-b border-gray-100 text-gray-800 dark:border-gray-700 dark:text-gray-200">
                    <td className="py-2 text-center font-semibold text-sky-600">{row.round}차</td>
                    <td>{won(row.price)}</td>
                    <td className="text-blue-600 dark:text-blue-400">{pct(row.dropFromFirst, 1)}</td>
                    <td>
                      {num(row.qty, decimals)}
                      {unit}
                    </td>
                    <td className="max-sm:hidden">{won(row.amount)}</td>
                    <td className="max-sm:hidden">{won(row.totalAmount)}</td>
                    <td className="pr-1 font-semibold">{won(row.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ShareBar shareUrl={shareUrl} onReset={reset} event="split-buy" />
      <SEOContent page="splitBuy" />
      <Comment pathname="splitBuy" />
    </div>
  );
};

export default SplitBuy;
