import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { NumberField, ResultCard, ShareBar, num, pct, toneOf, won } from '@components/invest/InvestUI';
import { useToolState } from 'hooks/useToolState';
import SEOMetaTag from 'seo/SEOMetaTag';
import { averagePrice, qtyForTargetAverage, toNumber } from 'utill/invest';

// 매수 내역은 "가격x수량,가격x수량" 문자열로 저장해 공유 링크에 담는다.
const parseLots = (text: string) =>
  text.split(',').map((pair) => {
    const [price = '', qty = ''] = pair.split('x');
    return { price, qty };
  });
const stringifyLots = (lots: { price: string; qty: string }[]) => lots.map((lot) => `${lot.price}x${lot.qty}`).join(',');

const DEFAULTS = { lots: '10000x10,8000x10', fee: '0', current: '8500', tbuy: '8000', target: '9000' };

const AvgPrice = () => {
  const { state, set, reset, shareUrl } = useToolState('tool:avg-price', DEFAULTS);
  const lots = parseLots(state.lots);
  const setLots = (next: { price: string; qty: string }[]) => set('lots')(stringifyLots(next));
  const updateLot = (i: number, key: 'price' | 'qty', value: string) =>
    setLots(lots.map((lot, j) => (j === i ? { ...lot, [key]: value.replace(/[x,]/g, '') } : lot)));

  const result = averagePrice(
    lots.map((lot) => ({ price: toNumber(lot.price), qty: toNumber(lot.qty) })),
    toNumber(state.fee) / 100,
  );
  const first = toNumber(lots[0]?.price ?? '0');
  const current = toNumber(state.current);
  const evalAmount = current * result.totalQty;
  const evalProfit = evalAmount - result.totalCost;

  const tbuy = toNumber(state.tbuy);
  const target = toNumber(state.target);
  const needQty = qtyForTargetAverage(result.avg, result.totalQty, tbuy, target);

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="물타기 계산기 · 평단가 계산기">
        매수 내역을 입력하면 평균 단가가 바로 계산됩니다. 주식은 정수, 코인은 소수점 수량도 입력할 수 있습니다.
      </ToolHeader>

      <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">매수 내역</h2>
        <div className="space-y-2">
          {lots.map((lot, i) => (
            <div key={i} className="grid grid-cols-[2rem_1fr_1fr_2rem] items-end gap-2">
              <span className="pb-2.5 text-center text-sm font-semibold text-sky-600">{i + 1}차</span>
              <NumberField
                id={`price-${i}`}
                label={i === 0 ? '매수가' : ''}
                value={lot.price}
                onChange={(v) => updateLot(i, 'price', v)}
                suffix="원"
              />
              <NumberField id={`qty-${i}`} label={i === 0 ? '수량' : ''} value={lot.qty} onChange={(v) => updateLot(i, 'qty', v)} suffix="주" />
              <button
                type="button"
                aria-label={`${i + 1}차 삭제`}
                disabled={lots.length === 1}
                onClick={() => setLots(lots.filter((_, j) => j !== i))}
                className="flex h-[42px] w-8 items-center justify-center text-gray-400 hover:text-red-500 disabled:opacity-30"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLots([...lots, { price: '', qty: '' }])}
          className="mt-3 w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-600 hover:border-sky-500 hover:text-sky-600 dark:border-gray-600 dark:text-gray-300"
        >
          + 매수 추가 (물타기)
        </button>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <NumberField id="fee" label="매수 수수료" value={state.fee} onChange={set('fee')} suffix="%" hint="평단가에 포함됩니다 (예: 0.015)" />
          <NumberField id="current" label="현재가 (선택)" value={state.current} onChange={set('current')} suffix="원" hint="평가손익 계산용" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
          <ResultCard
            label="평균 단가"
            value={won(result.avg)}
            tone="main"
            sub={first > 0 && result.avg > 0 ? `1차 매수가 대비 ${pct(result.avg / first - 1)}` : undefined}
          />
          <ResultCard label="총 수량" value={`${num(result.totalQty, 8)}주`} />
          <ResultCard label="총 매수금액" value={won(result.totalCost)} />
          {current > 0 && result.totalQty > 0 && (
            <>
              <ResultCard label="평가금액" value={won(evalAmount)} />
              <ResultCard label="평가손익" value={won(evalProfit)} tone={toneOf(evalProfit)} />
              <ResultCard label="수익률" value={pct(evalProfit / result.totalCost)} tone={toneOf(evalProfit)} />
            </>
          )}
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">목표 평단가 만들기 (역산)</h2>
        <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
          위에서 계산한 평단 {won(result.avg)} · {num(result.totalQty, 8)}주 기준으로, 원하는 평단가가 되려면 얼마나 더 사야 하는지 계산합니다.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <NumberField id="tbuy" label="추가 매수가" value={state.tbuy} onChange={set('tbuy')} suffix="원" />
          <NumberField id="target" label="목표 평단가" value={state.target} onChange={set('target')} suffix="원" />
        </div>
        <div className="mt-4">
          {needQty === null ? (
            <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-slate-700 dark:text-amber-300">
              목표 평단가는 현재 평단({won(result.avg)})과 추가 매수가 사이여야 합니다. 물타기라면 추가 매수가 &lt; 목표 평단 &lt; 현재 평단으로
              입력하세요.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              <ResultCard label="필요 수량" value={`${num(Math.ceil(needQty))}주`} tone="main" sub={`정확히는 ${num(needQty, 4)}주`} />
              <ResultCard label="필요 금액" value={won(Math.ceil(needQty) * tbuy)} />
              <ResultCard label="매수 후 평단" value={won((result.totalCost + Math.ceil(needQty) * tbuy) / (result.totalQty + Math.ceil(needQty)))} />
            </div>
          )}
        </div>
      </section>

      <ShareBar shareUrl={shareUrl} onReset={reset} event="avg-price" />
      <SEOContent page="avgPrice" />
      <Comment pathname="avgPrice" />
    </div>
  );
};

export default AvgPrice;
