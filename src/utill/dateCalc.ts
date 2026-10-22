const DAY = 1000 * 60 * 60 * 24;

export type YMD = { year: number; month: number; day: number };

// 'YYYY-MM-DD' 문자열을 시간대 영향 없이 파싱한다.
export const parseYMD = (value: string): YMD | null => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
};

export const toYMDString = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const toUTC = ({ year, month, day }: YMD) => Date.UTC(year, month - 1, day);

// to - from 일수 (같은 날이면 0)
export const diffDays = (from: YMD, to: YMD) => Math.round((toUTC(to) - toUTC(from)) / DAY);

export const addDays = (base: YMD, days: number): YMD => {
  const date = new Date(toUTC(base) + days * DAY);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
};

export const getWeekday = ({ year, month, day }: YMD) =>
  ['일', '월', '화', '수', '목', '금', '토'][new Date(Date.UTC(year, month - 1, day)).getUTCDay()];

export const formatYMD = (date: YMD) => `${date.year}년 ${date.month}월 ${date.day}일 (${getWeekday(date)})`;

// 시작일을 1일로 세는 기념일 (100일 = 시작일 + 99일), 1주년은 다음 해 같은 날짜
export const getAnniversary = (start: YMD, milestone: number): YMD =>
  milestone === 365 ? addDays({ ...start, year: start.year + 1 }, 0) : addDays(start, milestone - 1);

// 만 나이: 생일이 지났으면 연도 차, 아니면 1을 뺀다.
// 2월 29일생은 평년에 3월 1일부터 나이가 바뀐다 (민법 제160조 제3항).
export const getInternationalAge = (birth: YMD, base: YMD) => {
  const passed = base.month > birth.month || (base.month === birth.month && base.day >= birth.day);
  return base.year - birth.year - (passed ? 0 : 1);
};

export const getNextBirthday = (birth: YMD, base: YMD): YMD => {
  const thisYear = new Date(Date.UTC(base.year, birth.month - 1, birth.day));
  const candidate = { year: thisYear.getUTCFullYear(), month: thisYear.getUTCMonth() + 1, day: thisYear.getUTCDate() };
  if (diffDays(base, candidate) >= 0) return candidate;
  const nextYear = new Date(Date.UTC(base.year + 1, birth.month - 1, birth.day));
  return { year: nextYear.getUTCFullYear(), month: nextYear.getUTCMonth() + 1, day: nextYear.getUTCDate() };
};

const ZODIAC = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'];

// 양력 연도 기준 띠 (음력 설 이전 출생자는 전년도 띠일 수 있음)
export const getZodiac = (year: number) => ZODIAC[(((year - 4) % 12) + 12) % 12];

export const formatDday = (days: number) => {
  if (days === 0) return 'D-DAY';
  return days > 0 ? `D-${days}` : `D+${-days}`;
};
