import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { NumberField, ResultCard, ShareBar, num, pct, toneOf, won } from '@components/invest/InvestUI';
import { useToolState } from 'hooks/useToolState';
import SEOMetaTag from 'seo/SEOMetaTag';
import { sellPriceForReturn, toNumber, tradeProfit } from 'utill/invest';

// 수수료·세금 기본값은 예시이며 증권사·거래소·연도별로 다르다 (화면에도 안내)
const PRESETS: Record<string, { label: string; buyFee: string; sellFee: string; tax: string; note: string }> = {
  kr: {
    label: '국내주식',
    buyFee: '0.015',
    sellFee: '0.015',
    tax: '0.15',
    note: '매도 시 증권거래세가 붙습니다. 세율은 시장·연도별로 다르니 확인 후 수정하세요.',
  },
  us: {
    label: '미국주식',
    buyFee: '0.25',
    sellFee: '0.25',
    tax: '0',
    note: '해외주식 양도소득세(연간 수익 250만원 초과분 22%)는 1년 합산이라 여기서는 제외했습니다.',
  },
  coin: { label: '코인', buyFee: '0.05', sellFee: '0.05', tax: '0', note: '거래소별 수수료가 다르니 이용 중인 거래소 수수료로 바꿔 입력하세요.' },
};

const DEFAULTS = { market: 'kr', buy: '50000', sell: '55000', qty: '10', buyFee: '0.015', sellFee: '0.015', tax: '0.15', target: '10' };

const StockProfit = () => {
  const { state, set, setState, reset, shareUrl } = useToolState('tool:stock-profit', DEFAULTS);
  const costs = { buyFeeRate: toNumber(state.buyFee) / 100, sellFeeRate: toNumber(state.sellFee) / 100, sellTaxRate: toNumber(state.tax) / 100 };
  const buy = toNumber(state.buy);
  const r = tradeProfit(buy, toNumber(state.sell), toNumber(state.qty), costs);
  const breakEven = sellPriceForReturn(buy, 0, costs);
  const targetRate = toNumber(state.target) / 100;
  const targetPrice = sellPriceForReturn(buy, targetRate, costs);
  const preset = PRESETS[state.market];

  const choose = (market: string) => {
    const p = PRESETS[market];
    setState((prev) => ({ ...prev, market, buyFee: p.buyFee, sellFee: p.sellFee, tax: p.tax }));
  };

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="주식 · 코인 수익률 계산기">
        수수료와 세금까지 뺀 실제 손익을 계산합니다. 시장을 고르면 수수료 예시값이 채워지고, 직접 수정할 수 있습니다.
      </ToolHeader>

      <div className="mb-4 flex gap-2">
        {Object.entries(PRESETS).map(([key, p]) => (
          <button
            key={key}
            type="button"
            onClick={() => choose(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              state.market === key ? 'bg-sky-600 text-white' : 'bg-slate-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
        <NumberField id="buy" label="매수가" value={state.buy} onChange={set('buy')} suffix="원" />
        <NumberField id="sell" label="매도가" value={state.sell} onChange={set('sell')} suffix="원" />
        <NumberField id="qty" label="수량" value={state.qty} onChange={set('qty')} suffix="주" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <NumberField id="buyFee" label="매수 수수료" value={state.buyFee} onChange={set('buyFee')} suffix="%" />
        <NumberField id="sellFee" label="매도 수수료" value={state.sellFee} onChange={set('sellFee')} suffix="%" />
        <NumberField id="tax" label="매도 세금" value={state.tax} onChange={set('tax')} suffix="%" />
      </div>
      {preset && <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">※ {preset.note}</p>}

      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
        <ResultCard label="순손익" value={won(r.net)} tone={toneOf(r.net)} />
        <ResultCard label="수익률" value={pct(r.rate)} tone={toneOf(r.net)} />
        <ResultCard label="손익분기 매도가" value={won(breakEven)} sub="이 가격 이상 팔아야 수익" />
        <ResultCard label="매수금액" value={won(r.buyAmount)} />
        <ResultCard label="매도금액" value={won(r.sellAmount)} />
        <ResultCard label="수수료 + 세금" value={won(r.fees + r.tax)} sub={`수수료 ${won(r.fees)} · 세금 ${won(r.tax)}`} />
      </div>

      <section className="mt-5 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">목표 수익률 매도가</h2>
        <div className="grid grid-cols-2 gap-3">
          <NumberField id="target" label="목표 수익률" value={state.target} onChange={set('target')} suffix="%" />
          <ResultCard
            label={`${num(toNumber(state.target))}% 수익 매도가`}
            value={won(targetPrice)}
            tone="main"
            sub={buy > 0 ? `매수가 대비 ${pct(targetPrice / buy - 1)} 상승 필요` : undefined}
          />
        </div>
      </section>

      <ShareBar shareUrl={shareUrl} onReset={reset} event="stock-profit" />
      <SEOContent page="stockProfit" />
      <Comment pathname="stockProfit" />
    </div>
  );
};

export default StockProfit;
