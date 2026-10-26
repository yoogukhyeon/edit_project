import ToolHeader from '@components/common/ToolHeader';
import LottoBall from '@components/lotto/LottoBall';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import { fetchRecentLotto, winningNumbers } from 'utill/lottoData';
import { countFrequency, GenMode, generateGames, parseNumbers, validateOptions } from 'utill/lottoGen';

const HISTORY_KEY = 'tool:lotto-gen:history';
type HistoryItem = { at: string; games: number[][] };

// 암호학적 난수 (0 이상 1 미만)
const secureRandom = () => {
  const buf = new Uint32Array(1);
  window.crypto.getRandomValues(buf);
  return buf[0] / 2 ** 32;
};

const loadHistory = (): HistoryItem[] => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch (e) {
    return [];
  }
};

const MODES: { value: GenMode; label: string; desc: string }[] = [
  { value: 'random', label: '완전 랜덤', desc: '모든 번호가 같은 확률' },
  { value: 'hot', label: '많이 나온 번호 위주', desc: '최근 회차에 자주 나온 번호 가중' },
  { value: 'cold', label: '적게 나온 번호 위주', desc: '최근 회차에 덜 나온 번호 가중' },
];

const LottoGen = () => {
  const [count, setCount] = useState<number>(5);
  const [mode, setMode] = useState<GenMode>('random');
  const [fixedText, setFixedText] = useState<string>('');
  const [excludeText, setExcludeText] = useState<string>('');
  const [games, setGames] = useState<number[][]>([]);
  const [frequency, setFrequency] = useState<number[] | null>(null);
  const [drawRange, setDrawRange] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
    if (navigator.userAgent === 'ReactSnap') return;
    fetchRecentLotto().then((rows) => {
      if (!rows) return;
      setFrequency(countFrequency(rows.map(winningNumbers)));
      setDrawRange(`${rows[rows.length - 1].no}~${rows[0].no}회`);
    });
  }, []);

  const fixed = parseNumbers(fixedText);
  const exclude = parseNumbers(excludeText);
  const error = validateOptions({ fixed, exclude });
  const needsData = mode !== 'random' && !frequency;

  const onGenerate = () => {
    if (error) {
      toast.error(error);
      return;
    }
    const next = generateGames({ count, fixed, exclude, mode, frequency: frequency ?? undefined }, secureRandom);
    setGames(next);
    const item = { at: new Date().toLocaleString('ko-KR'), games: next };
    const nextHistory = [item, ...history].slice(0, 10);
    setHistory(nextHistory);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
    } catch (e) {
      // 저장 실패는 무시
    }
  };

  const onCopy = async () => {
    const textValue = games.map((g, i) => `${String.fromCharCode(65 + i)}: ${g.join(', ')}`).join('\n');
    try {
      await navigator.clipboard.writeText(textValue);
      toast.success('번호를 복사했습니다.');
    } catch (e) {
      toast.error('복사에 실패했습니다.');
    }
  };

  const optionClass = (active: boolean) =>
    `min-h-[40px] rounded-lg px-3 py-2 text-sm font-medium ${
      active ? 'bg-sky-600 text-white' : 'bg-slate-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200'
    }`;
  const inputClass =
    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white';

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="로또 번호 생성기">
        완전 랜덤 또는 최근 회차 당첨번호 통계를 반영해 로또 번호를 만들어드립니다. 고정수와 제외수도 정할 수 있습니다.
      </ToolHeader>

      <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">생성 방식</p>
        <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
          {MODES.map((m) => (
            <button key={m.value} type="button" onClick={() => setMode(m.value)} className={`${optionClass(mode === m.value)} text-left`}>
              <span className="block">{m.label}</span>
              <span className={`block text-xs font-normal ${mode === m.value ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>{m.desc}</span>
            </button>
          ))}
        </div>
        {mode !== 'random' && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {frequency
              ? `최근 ${drawRange} 당첨번호 통계를 반영합니다.`
              : '최근 당첨번호를 불러오는 중이거나 불러오지 못했습니다. 완전 랜덤으로 이용해주세요.'}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <div>
            <label htmlFor="fixed" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              고정수 (꼭 넣을 번호, 최대 5개)
            </label>
            <input
              id="fixed"
              inputMode="numeric"
              value={fixedText}
              onChange={(e) => setFixedText(e.target.value)}
              placeholder="예: 7, 23"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="exclude" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              제외수 (빼고 싶은 번호)
            </label>
            <input
              id="exclude"
              inputMode="numeric"
              value={excludeText}
              onChange={(e) => setExcludeText(e.target.value)}
              placeholder="예: 1, 45"
              className={inputClass}
            />
          </div>
        </div>
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">게임 수</span>
          {[1, 5, 10].map((n) => (
            <button key={n} type="button" onClick={() => setCount(n)} className={optionClass(count === n)}>
              {n}게임
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onGenerate}
          disabled={!!error || needsData}
          className="mt-5 w-full min-h-[52px] rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-lg font-bold text-white shadow-md hover:shadow-lg disabled:opacity-50"
        >
          번호 생성하기
        </button>
      </section>

      {games.length > 0 && (
        <section className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">생성된 번호</h2>
            <button
              type="button"
              onClick={onCopy}
              className="min-h-[36px] rounded-md border border-gray-300 px-3 text-xs font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              전체 복사
            </button>
          </div>
          <ol className="space-y-2.5">
            {games.map((g, i) => (
              <li
                key={g.join('-') + String(i)}
                className="flex items-center gap-2 rounded-lg bg-white p-2.5 shadow-sm dark:bg-slate-800 max-sm:gap-1.5"
              >
                <span className="w-6 shrink-0 text-center text-sm font-bold text-gray-500">{String.fromCharCode(65 + i)}</span>
                {g.map((n) => (
                  <LottoBall key={n} n={n} />
                ))}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            로또는 매 회차 모든 번호의 당첨 확률이 같습니다. 통계 방식은 재미로 참고하세요.{' '}
            <Link to="/lotto" className="font-medium !text-sky-600 underline">
              최신 당첨번호 확인
            </Link>
          </p>
        </section>
      )}

      {history.length > 0 && (
        <section className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">최근 생성 기록</h2>
            <button
              type="button"
              onClick={() => {
                setHistory([]);
                try {
                  localStorage.removeItem(HISTORY_KEY);
                } catch (e) {
                  // 무시
                }
              }}
              className="min-h-[36px] text-xs text-gray-500 underline"
            >
              기록 지우기
            </button>
          </div>
          <ul className="space-y-2">
            {history.map((item) => (
              <li key={item.at + item.games.flat().join('')} className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                <p className="mb-1.5 text-xs text-gray-500 dark:text-gray-400">{item.at}</p>
                <div className="space-y-1">
                  {item.games.map((g) => (
                    <div key={g.join('-')} className="flex gap-1">
                      {g.map((n) => (
                        <LottoBall key={n} n={n} size="sm" />
                      ))}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">기록은 이 브라우저에만 최근 10번까지 저장됩니다.</p>
        </section>
      )}

      <SEOContent page="lottoGen" />
      <Comment pathname="lottoGen" />
    </div>
  );
};

export default LottoGen;
