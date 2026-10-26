import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { NumberField, ResultCard, ShareBar, won } from '@components/invest/InvestUI';
import { useToolState } from 'hooks/useToolState';
import SEOMetaTag from 'seo/SEOMetaTag';
import { toNumber } from 'utill/invest';
import { pyeongToSqm, round, sqmToPyeong, unitPrices } from 'utill/pyeong';

// 아파트 전용면적 예시. 공급면적(흔히 부르는 평형)은 단지마다 달라 대략적인 범위만 안내한다.
const COMMON = [
  { sqm: 39, note: '소형' },
  { sqm: 49, note: '소형' },
  { sqm: 59, note: '흔히 24~25평형' },
  { sqm: 74, note: '흔히 29~30평형' },
  { sqm: 84, note: '국민평형, 흔히 32~34평형' },
  { sqm: 114, note: '대형' },
];

const QUICK_PYEONG = [10, 20, 25, 30, 32, 34, 40, 50];

const DEFAULTS = { sqm: '84', price: '1000000000', priceSqm: '84' };

const Pyeong = () => {
  const { state, set, setState, reset, shareUrl } = useToolState('tool:pyeong', DEFAULTS);
  const sqm = toNumber(state.sqm);
  const pyeong = sqm > 0 ? String(round(sqmToPyeong(sqm))) : '';

  // ㎡·평 두 칸 중 어디에 입력해도 상태는 ㎡로 저장해 서로 맞춘다
  const onPyeongChange = (value: string) => {
    const p = toNumber(value);
    setState((prev) => ({ ...prev, sqm: value.trim() === '' ? '' : String(round(pyeongToSqm(p), 2)) }));
  };

  const prices = unitPrices(toNumber(state.price), toNumber(state.priceSqm));

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="평수 계산기 · ㎡ 평 변환">
        제곱미터(㎡)와 평을 서로 바로 바꿔드립니다. 아파트 전용면적별 평수와 평당 가격도 계산해보세요.
      </ToolHeader>

      <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <NumberField id="sqm" label="제곱미터 (㎡)" value={state.sqm} onChange={set('sqm')} suffix="㎡" />
          <span className="pb-2.5 text-xl text-gray-400" aria-hidden="true">
            ⇄
          </span>
          <NumberField id="pyeong" label="평" value={pyeong} onChange={onPyeongChange} suffix="평" />
        </div>
        <p className="mt-3 rounded-lg bg-sky-50 p-3 text-center text-base font-semibold text-sky-800 dark:bg-slate-700 dark:text-sky-300">
          {sqm > 0 ? `${round(sqm, 2).toLocaleString()}㎡ = ${Number(pyeong).toLocaleString()}평` : '면적을 입력해주세요'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_PYEONG.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPyeongChange(String(p))}
              className="min-h-[36px] rounded-md border border-gray-300 px-3 text-xs text-gray-700 hover:border-sky-500 hover:text-sky-600 dark:border-gray-600 dark:text-gray-200"
            >
              {p}평
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">1평 = 400/121㎡ ≈ 3.3058㎡ · 1㎡ ≈ 0.3025평</p>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">아파트 전용면적별 평수</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <th className="py-2 text-left">전용면적</th>
              <th className="text-right">전용 평수</th>
              <th className="pl-3 text-left">참고</th>
            </tr>
          </thead>
          <tbody>
            {COMMON.map((row) => (
              <tr
                key={row.sqm}
                onClick={() => set('sqm')(String(row.sqm))}
                className="cursor-pointer border-b border-gray-100 text-gray-800 hover:bg-sky-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-slate-700"
              >
                <td className="py-2.5 font-medium">{row.sqm}㎡</td>
                <td className="text-right font-semibold">{round(sqmToPyeong(row.sqm), 1)}평</td>
                <td className="pl-3 text-xs text-gray-500 dark:text-gray-400">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          흔히 말하는 &quot;34평형&quot;은 공용면적을 더한 공급면적 기준이라 전용 평수보다 큽니다. 정확한 공급면적은 분양 공고나 등기부를 확인하세요.
        </p>
      </section>

      <section className="mt-5 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">평당 가격 계산</h2>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <NumberField id="price" label="매매가·분양가" value={state.price} onChange={set('price')} suffix="원" />
          <NumberField id="priceSqm" label="면적" value={state.priceSqm} onChange={set('priceSqm')} suffix="㎡" hint="전용면적 또는 공급면적" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <ResultCard label="평당 가격" value={won(prices.perPyeong)} tone="main" />
          <ResultCard label="㎡당 가격" value={won(prices.perSqm)} />
        </div>
      </section>

      <ShareBar shareUrl={shareUrl} onReset={reset} event="pyeong" />
      <SEOContent page="pyeong" />
      <Comment pathname="pyeong" />
    </div>
  );
};

export default Pyeong;
