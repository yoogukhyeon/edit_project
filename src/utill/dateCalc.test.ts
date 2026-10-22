import { addDays, diffDays, formatDday, getAnniversary, getInternationalAge, getNextBirthday, getZodiac, parseYMD } from './dateCalc';

const d = (value: string) => parseYMD(value)!;

test('만 나이는 생일 당일부터 한 살 늘어난다', () => {
  expect(getInternationalAge(d('2000-05-10'), d('2026-05-09'))).toBe(25);
  expect(getInternationalAge(d('2000-05-10'), d('2026-05-10'))).toBe(26);
});

test('2월 29일생은 평년 3월 1일에 나이가 바뀐다', () => {
  expect(getInternationalAge(d('2004-02-29'), d('2025-02-28'))).toBe(20);
  expect(getInternationalAge(d('2004-02-29'), d('2025-03-01'))).toBe(21);
  expect(getNextBirthday(d('2004-02-29'), d('2025-01-01'))).toEqual(d('2025-03-01'));
});

test('다음 생일은 지났으면 내년으로 넘어간다', () => {
  expect(getNextBirthday(d('2000-05-10'), d('2026-05-10'))).toEqual(d('2026-05-10'));
  expect(getNextBirthday(d('2000-05-10'), d('2026-05-11'))).toEqual(d('2027-05-10'));
});

test('날짜 차이와 더하기는 윤년/월말을 반영한다', () => {
  expect(diffDays(d('2024-02-28'), d('2024-03-01'))).toBe(2);
  expect(addDays(d('2026-12-31'), 1)).toEqual(d('2027-01-01'));
  expect(addDays(d('2026-03-01'), -1)).toEqual(d('2026-02-28'));
});

test('기념일은 시작일을 1일로 센다', () => {
  expect(getAnniversary(d('2026-01-01'), 100)).toEqual(d('2026-04-10'));
  expect(getAnniversary(d('2024-02-29'), 365)).toEqual(d('2025-03-01'));
});

test('D-day 표기와 띠', () => {
  expect(formatDday(3)).toBe('D-3');
  expect(formatDday(0)).toBe('D-DAY');
  expect(formatDday(-2)).toBe('D+2');
  expect(getZodiac(2020)).toBe('쥐');
  expect(getZodiac(1990)).toBe('말');
});
