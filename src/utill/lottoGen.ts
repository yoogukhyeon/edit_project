export type GenMode = 'random' | 'hot' | 'cold';

export type GenOptions = { count: number; fixed: number[]; exclude: number[]; mode: GenMode; frequency?: number[] };

const ALL = Array.from({ length: 45 }, (_, i) => i + 1);

// 1~45 번호별 출현 횟수 (index = 번호)
export const countFrequency = (draws: number[][]) => {
  const freq = Array(46).fill(0);
  draws.forEach((draw) =>
    draw.forEach((n) => {
      if (n >= 1 && n <= 45) freq[n] += 1;
    }),
  );
  return freq as number[];
};

// 옵션이 유효하지 않으면 사용자에게 보여줄 안내 문구를 돌려준다.
export const validateOptions = ({ fixed, exclude }: Pick<GenOptions, 'fixed' | 'exclude'>): string | null => {
  if (fixed.length > 5) return '고정수는 최대 5개까지 정할 수 있습니다.';
  if (fixed.some((n) => exclude.includes(n))) return '같은 번호를 고정수와 제외수에 동시에 넣을 수 없습니다.';
  if (45 - exclude.length < 6) return '제외수가 너무 많아 6개 번호를 만들 수 없습니다.';
  return null;
};

// 중복 없이 가중치 비례로 k개 뽑기
const weightedPick = (pool: number[], weights: number[], k: number, rand: () => number) => {
  const items = pool.map((n, i) => ({ n, w: Math.max(weights[i], 0.0001) }));
  const picked: number[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < k && items.length > 0; i++) {
    const total = items.reduce((sum, item) => sum + item.w, 0);
    let r = rand() * total;
    let idx = items.findIndex((item) => {
      r -= item.w;
      return r < 0;
    });
    if (idx < 0) idx = items.length - 1;
    picked.push(items[idx].n);
    items.splice(idx, 1);
  }
  return picked;
};

// 로또 번호 count게임 생성. rand는 테스트에서 고정 난수를 넣을 수 있게 주입한다.
export const generateGames = (options: GenOptions, rand: () => number = Math.random): number[][] => {
  const { count, fixed, exclude, mode, frequency } = options;
  const pool = ALL.filter((n) => !fixed.includes(n) && !exclude.includes(n));
  const freq = frequency ?? Array(46).fill(0);
  const max = Math.max(...pool.map((n) => freq[n]), 0);
  const weights = pool.map((n) => {
    if (mode === 'hot') return 1 + freq[n];
    if (mode === 'cold') return 1 + (max - freq[n]);
    return 1;
  });
  return Array.from({ length: count }, () => [...fixed, ...weightedPick(pool, weights, 6 - fixed.length, rand)].sort((a, b) => a - b));
};

// "3, 7 15" 같은 입력을 1~45 사이 중복 없는 번호 배열로
export const parseNumbers = (input: string) =>
  Array.from(
    new Set(
      input
        .split(/[^0-9]+/)
        .map(Number)
        .filter((n) => Number.isInteger(n) && n >= 1 && n <= 45),
    ),
  );

// 동행복권 공 색상 구간: 1~10 노랑, 11~20 파랑, 21~30 빨강, 31~40 회색, 41~45 초록
export const ballClass = (n: number) => {
  if (n <= 10) return 'bg-yellow-400 text-yellow-950';
  if (n <= 20) return 'bg-blue-500 text-white';
  if (n <= 30) return 'bg-red-500 text-white';
  if (n <= 40) return 'bg-gray-500 text-white';
  return 'bg-green-500 text-white';
};
