import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { NumberField, ResultCard, ShareBar, won } from '@components/invest/InvestUI';
import { useToolState } from 'hooks/useToolState';
import SEOMetaTag from 'seo/SEOMetaTag';
import { toNumber } from 'utill/invest';
import { vatFromSupply, vatFromTotal } from 'utill/vat';

const DEFAULTS = { mode: 'supply', amount: '1000000' };

const Vat = () => {
  const { state, set, reset, shareUrl } = useToolState('tool:vat', DEFAULTS);
  const amount = Math.floor(toNumber(state.amount));
  const r = state.mode === 'total' ? vatFromTotal(amount) : vatFromSupply(amount);

  const tabClass = (active: boolean) =>
    `min-h-[44px] flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
      active ? 'bg-sky-600 text-white' : 'bg-slate-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200'
    }`;

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="부가세 계산기">
        공급가액에 부가세 10%를 더하거나, 부가세가 포함된 금액에서 공급가액과 부가세를 역산합니다. 세금계산서·견적서 작성에 활용하세요.
      </ToolHeader>

      <div className="mb-4 flex gap-2">
        <button type="button" onClick={() => set('mode')('supply')} className={tabClass(state.mode !== 'total')}>
          공급가액 → 합계 (부가세 별도)
        </button>
        <button type="button" onClick={() => set('mode')('total')} className={tabClass(state.mode === 'total')}>
          합계 → 공급가액 (부가세 포함)
        </button>
      </div>

      <NumberField
        id="amount"
        label={state.mode === 'total' ? '부가세 포함 합계 금액' : '공급가액 (부가세 별도 금액)'}
        value={state.amount}
        onChange={set('amount')}
        suffix="원"
      />

      <div className="mt-4 grid grid-cols-3 gap-2 max-sm:grid-cols-1">
        <ResultCard label="공급가액" value={won(r.supply)} tone={state.mode === 'total' ? 'main' : 'normal'} />
        <ResultCard label="부가세 (10%)" value={won(r.vat)} tone="main" />
        <ResultCard label="합계 금액" value={won(r.total)} tone={state.mode === 'total' ? 'normal' : 'main'} />
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        ※ 부가세는 원 미만을 버려 계산합니다. 합계에서 역산할 때 부가세 = 합계 × 1/11, 공급가액 = 합계 − 부가세이며, 프로그램에 따라 1원 차이가 날 수
        있습니다.
      </p>

      <ShareBar shareUrl={shareUrl} onReset={reset} event="vat" />
      <SEOContent page="vat" />
      <Comment pathname="vat" />
    </div>
  );
};

export default Vat;
