import { DDAY_EVENTS, findDdayEvent, nextOccurrence, upcomingEvents } from './ddayEvents';
import { applyRate, changeRate, discountRate, parseValue, percentOf, salePrice, whatPercent } from './percent';
import { vatFromSupply, vatFromTotal } from './vat';

test('퍼센트 계산', () => {
  expect(percentOf(250, 20)).toBe(50);
  expect(whatPercent(30, 120)).toBe(25);
  expect(whatPercent(1, 0)).toBeNull();
  expect(changeRate(80, 100)).toBe(25);
  expect(changeRate(100, 80)).toBe(-20);
  expect(changeRate(0, 5)).toBeNull();
  expect(applyRate(10000, 15)).toBe(11500);
  expect(applyRate(10000, -15)).toBe(8500);
  expect(discountRate(50000, 35000)).toBeCloseTo(30);
  expect(salePrice(50000, 30)).toBe(35000);
  expect(parseValue('1,234.5')).toBe(1234.5);
  expect(parseValue('-3')).toBe(-3);
  expect(parseValue('')).toBeNull();
  expect(parseValue('abc')).toBeNull();
});

test('부가세 계산', () => {
  expect(vatFromSupply(10000)).toEqual({ supply: 10000, vat: 1000, total: 11000 });
  expect(vatFromSupply(12345)).toEqual({ supply: 12345, vat: 1234, total: 13579 });
  expect(vatFromTotal(11000)).toEqual({ supply: 10000, vat: 1000, total: 11000 });
  expect(vatFromTotal(10000)).toEqual({ supply: 9091, vat: 909, total: 10000 });
});

test('기념일 다음 날짜와 정렬', () => {
  const christmas = DDAY_EVENTS.find((e) => e.slug === 'christmas')!;
  expect(nextOccurrence(christmas, { year: 2026, month: 10, day: 31 })).toEqual({ year: 2026, month: 12, day: 25 });
  expect(nextOccurrence(christmas, { year: 2026, month: 12, day: 25 })).toEqual({ year: 2026, month: 12, day: 25 });
  expect(nextOccurrence(christmas, { year: 2026, month: 12, day: 26 })).toEqual({ year: 2027, month: 12, day: 25 });
  const list = upcomingEvents({ year: 2026, month: 10, day: 31 });
  expect(list[0].event.slug).toBe('pepero-day');
  expect(list[0].days).toBe(11);
  expect(list.find((x) => x.event.slug === 'christmas')!.days).toBe(55);
  expect(findDdayEvent('/d-day/new-year/')!.name).toBe('새해');
  expect(findDdayEvent('/d-day')).toBeUndefined();
});
