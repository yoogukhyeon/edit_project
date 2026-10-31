import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { ShareBar } from '@components/invest/InvestUI';
import { useToolState } from 'hooks/useToolState';
import { ReactNode } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { applyRate, changeRate, discountRate, parseValue, percentOf, salePrice, whatPercent } from 'utill/percent';

const DEFAULTS = {
  a1: '250',
  b1: '20',
  a2: '30',
  b2: '120',
  a3: '80',
  b3: '100',
  a4: '10000',
  b4: '15',
  a5: '50000',
  b5: '35000',
  a6: '50000',
  b6: '30',
};

const changeLabel = (rate: number) => {
  if (rate > 0) return '증가';
  if (rate < 0) return '감소';
  return '변화 없음';
};

const fmt = (n: number | null, digits = 4) => (n === null ? '-' : n.toLocaleString(undefined, { maximumFractionDigits: digits }));

// 문장 속 빈칸처럼 보이는 작은 입력칸
const Blank = ({ id, value, onChange, label }: { id: string; value: string; onChange: (v: string) => void; label: string }) => (
  <input
    id={id}
    aria-label={label}
    inputMode="decimal"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="mx-1 inline-block w-28 rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-center text-base font-semibold text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white max-sm:w-24"
  />
);

const Card = ({ title, children, result, note }: { title: string; children: ReactNode; result: ReactNode; note?: string }) => (
  <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
    <h2 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">{title}</h2>
    <p className="leading-[2.6rem] text-gray-800 dark:text-gray-200">{children}</p>
    <p className="mt-2 rounded-lg bg-sky-50 px-3 py-2 text-lg font-bold text-sky-700 dark:bg-slate-700 dark:text-sky-300">{result}</p>
    {note && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{note}</p>}
  </section>
);

const Percent = () => {
  const { state, set, reset, shareUrl } = useToolState('tool:percent', DEFAULTS);
  const v = (key: keyof typeof DEFAULTS) => parseValue(state[key]);
  const calc = <T,>(fn: (...args: number[]) => T, ...keys: (keyof typeof DEFAULTS)[]) => {
    const nums = keys.map(v);
    return nums.some((n) => n === null) ? null : fn(...(nums as number[]));
  };

  const r1 = calc(percentOf, 'a1', 'b1');
  const r2 = calc(whatPercent, 'a2', 'b2');
  const r3 = calc(changeRate, 'a3', 'b3');
  const r4 = calc(applyRate, 'a4', 'b4');
  const r5 = calc(discountRate, 'a5', 'b5');
  const r6 = calc(salePrice, 'a6', 'b6');
  const a6 = v('a6');

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="퍼센트 계산기 · 할인율 계산기">
        빈칸에 숫자를 넣으면 바로 계산됩니다. 비율, 증감률, 할인율까지 자주 쓰는 퍼센트 계산을 한 곳에서 하세요.
      </ToolHeader>

      <div className="grid gap-3 md:grid-cols-2">
        <Card title="① 어떤 수의 몇 %" result={`= ${fmt(r1)}`}>
          <Blank id="a1" label="전체 값" value={state.a1} onChange={set('a1')} />의
          <Blank id="b1" label="퍼센트" value={state.b1} onChange={set('b1')} />% 는?
        </Card>
        <Card title="② 일부는 전체의 몇 %" result={`= ${fmt(r2)}%`}>
          <Blank id="a2" label="일부 값" value={state.a2} onChange={set('a2')} />
          은(는)
          <Blank id="b2" label="전체 값" value={state.b2} onChange={set('b2')} />의 몇 %?
        </Card>
        <Card title="③ 증가율·감소율 (변화율)" result={r3 === null ? '= -' : `= ${r3 > 0 ? '+' : ''}${fmt(r3, 2)}% ${changeLabel(r3)}`}>
          <Blank id="a3" label="이전 값" value={state.a3} onChange={set('a3')} />
          에서
          <Blank id="b3" label="이후 값" value={state.b3} onChange={set('b3')} />
          (으)로 바뀌면?
        </Card>
        <Card title="④ 몇 % 올리거나 내린 값" result={`= ${fmt(r4)}`} note="내릴 때는 -15처럼 음수로 입력하세요.">
          <Blank id="a4" label="기준 값" value={state.a4} onChange={set('a4')} />
          을(를)
          <Blank id="b4" label="변화율" value={state.b4} onChange={set('b4')} />% 바꾸면?
        </Card>
        <Card title="⑤ 할인율 (정가 → 판매가)" result={`= ${fmt(r5, 2)}% 할인`}>
          정가
          <Blank id="a5" label="정가" value={state.a5} onChange={set('a5')} />
          원이
          <Blank id="b5" label="판매가" value={state.b5} onChange={set('b5')} />
          원이면?
        </Card>
        <Card
          title="⑥ 할인가 (정가 × 할인율)"
          result={r6 === null ? '= -' : `= ${fmt(Math.round(r6))}원`}
          note={r6 !== null && a6 !== null ? `할인 금액 ${fmt(Math.round(a6 - r6))}원` : undefined}
        >
          정가
          <Blank id="a6" label="정가" value={state.a6} onChange={set('a6')} />
          원에서
          <Blank id="b6" label="할인율" value={state.b6} onChange={set('b6')} />% 할인하면?
        </Card>
      </div>

      <ShareBar shareUrl={shareUrl} onReset={reset} event="percent" />
      <SEOContent page="percent" />
      <Comment pathname="percent" />
    </div>
  );
};

export default Percent;
