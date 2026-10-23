import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { NumberField, ResultCard, ShareBar, num, won } from '@components/invest/InvestUI';
import { useToolState } from 'hooks/useToolState';
import SEOMetaTag from 'seo/SEOMetaTag';
import { positionSizeForRisk, stopTakeProfit, toNumber } from 'utill/invest';

const DEFAULTS = { entry: '50000', qty: '20', stop: '5', take: '15', maxLoss: '100000' };

const StopLoss = () => {
  const { state, set, reset, shareUrl } = useToolState('tool:stop-loss', DEFAULTS);
  const entry = toNumber(state.entry);
  const stopRate = toNumber(state.stop) / 100;
  const r = stopTakeProfit(entry, stopRate, toNumber(state.take) / 100, toNumber(state.qty));
  const size = positionSizeForRisk(entry, stopRate, toNumber(state.maxLoss));

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="손절가 · 익절가 계산기">
        매수 전에 손절가와 익절가를 미리 정해두면 감정적인 매매를 줄일 수 있습니다. 손익비와 적정 매수 수량도 함께 확인하세요.
      </ToolHeader>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <NumberField id="entry" label="매수가" value={state.entry} onChange={set('entry')} suffix="원" />
        <NumberField id="qty" label="수량" value={state.qty} onChange={set('qty')} suffix="주" />
        <NumberField id="stop" label="손절 비율" value={state.stop} onChange={set('stop')} suffix="%" />
        <NumberField id="take" label="익절 비율" value={state.take} onChange={set('take')} suffix="%" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
        <ResultCard label="손절가" value={won(r.stopPrice)} tone="minus" sub={`예상 손실 ${won(r.lossAmount)}`} />
        <ResultCard label="익절가" value={won(r.takePrice)} tone="plus" sub={`예상 수익 ${won(r.profitAmount)}`} />
        <ResultCard
          label="손익비 (R:R)"
          value={`1 : ${num(r.riskReward)}`}
          tone="main"
          sub={r.riskReward >= 2 ? '손익비 2 이상으로 양호합니다' : '손익비 2 이상을 권장하는 경우가 많습니다'}
        />
      </div>

      <section className="mt-5 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">손실 한도로 매수 수량 정하기</h2>
        <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
          손절가에 닿았을 때 잃어도 되는 최대 금액을 입력하면, 위 매수가·손절 비율 기준으로 살 수 있는 수량을 계산합니다.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <NumberField id="maxLoss" label="최대 손실 한도" value={state.maxLoss} onChange={set('maxLoss')} suffix="원" />
          <ResultCard label="적정 매수 수량" value={`${num(Math.floor(size))}주`} tone="main" sub={`투자금액 약 ${won(Math.floor(size) * entry)}`} />
        </div>
      </section>

      <ShareBar shareUrl={shareUrl} onReset={reset} event="stop-loss" />
      <SEOContent page="stopLoss" />
      <Comment pathname="stopLoss" />
    </div>
  );
};

export default StopLoss;
