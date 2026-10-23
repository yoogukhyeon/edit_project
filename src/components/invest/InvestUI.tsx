import { ReactNode } from 'react';
import { toast } from 'react-toastify';

const inputClass =
  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white';

type FieldProps = { id: string; label: string; value: string; onChange: (v: string) => void; suffix?: string; hint?: string; placeholder?: string };

// 숫자 입력칸 (쉼표 입력 허용, 모바일 숫자 키패드)
export const NumberField = ({ id, label, value, onChange, suffix, hint, placeholder }: FieldProps) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} ${suffix ? 'pr-12' : ''}`}
      />
      {suffix && <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">{suffix}</span>}
    </div>
    {hint && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
  </div>
);

type ResultProps = { label: string; value: ReactNode; tone?: 'plus' | 'minus' | 'main' | 'normal'; sub?: ReactNode };

export const ResultCard = ({ label, value, tone = 'normal', sub }: ResultProps) => {
  const color = {
    plus: 'text-red-600 dark:text-red-400',
    minus: 'text-blue-600 dark:text-blue-400',
    main: 'text-sky-700 dark:text-sky-300',
    normal: 'text-gray-900 dark:text-white',
  }[tone];
  return (
    <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700/50">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`mt-0.5 text-lg font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 dark:text-gray-400">{sub}</p>}
    </div>
  );
};

// 국내 관례대로 수익은 빨강, 손실은 파랑
export const toneOf = (n: number): ResultProps['tone'] => {
  if (n > 0) return 'plus';
  if (n < 0) return 'minus';
  return 'normal';
};

type ShareProps = { shareUrl: () => string; onReset: () => void; event: string };

export const ShareBar = ({ shareUrl, onReset, event }: ShareProps) => {
  const onShare = async () => {
    const url = shareUrl();
    (window as any).gtag?.('event', 'share_calculator', { tool: event });
    try {
      await navigator.clipboard.writeText(url);
      toast.success('입력값이 담긴 링크를 복사했습니다.');
    } catch (e) {
      window.prompt('아래 링크를 복사하세요.', url);
    }
  };
  return (
    <div className="mt-3 flex justify-end gap-2">
      <button
        type="button"
        onClick={onReset}
        className="min-h-[40px] rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-200"
      >
        초기화
      </button>
      <button
        type="button"
        onClick={onShare}
        className="min-h-[40px] rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
      >
        결과 공유 링크 복사
      </button>
    </div>
  );
};

// 금액·수량 표시
// 계산 범위를 벗어난 값(Infinity 등)은 '-'로, -0은 0으로 표시한다.
const OUT_OF_RANGE = '-';
export const won = (n: number) => (Number.isFinite(n) ? `${(Math.round(n) || 0).toLocaleString()}원` : OUT_OF_RANGE);
export const num = (n: number, digits = 2) =>
  Number.isFinite(n) ? (n || 0).toLocaleString(undefined, { maximumFractionDigits: digits }) : OUT_OF_RANGE;
export const pct = (rate: number, digits = 2) => {
  if (!Number.isFinite(rate)) return OUT_OF_RANGE;
  const fixed = (rate * 100).toFixed(digits);
  if (Number(fixed) === 0) return `${(0).toFixed(digits)}%`;
  return `${rate > 0 ? '+' : ''}${fixed}%`;
};
