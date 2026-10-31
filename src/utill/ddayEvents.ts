import { diffDays, YMD } from './dateCalc';

export type DdayEvent = { slug: string; name: string; month: number; day: number; pageKey: string };

// 날짜가 고정된 기념일만 다룬다 (음력 명절은 해마다 양력 날짜가 달라 제외)
export const DDAY_EVENTS: DdayEvent[] = [
  { slug: 'pepero-day', name: '빼빼로데이', month: 11, day: 11, pageKey: 'ddayPepero' },
  { slug: 'christmas', name: '크리스마스', month: 12, day: 25, pageKey: 'ddayChristmas' },
  { slug: 'new-year', name: '새해', month: 1, day: 1, pageKey: 'ddayNewYear' },
  { slug: 'valentines-day', name: '밸런타인데이', month: 2, day: 14, pageKey: 'ddayValentine' },
  { slug: 'white-day', name: '화이트데이', month: 3, day: 14, pageKey: 'ddayWhite' },
];

export const findDdayEvent = (pathname: string) => DDAY_EVENTS.find((e) => pathname.replace(/\/+$/, '') === `/d-day/${e.slug}`);

// 오늘 기준 다음 기념일 날짜 (오늘이 기념일이면 오늘)
export const nextOccurrence = (event: DdayEvent, today: YMD): YMD => {
  const thisYear = { year: today.year, month: event.month, day: event.day };
  return diffDays(today, thisYear) >= 0 ? thisYear : { ...thisYear, year: today.year + 1 };
};

// 남은 일수 순으로 정렬한 기념일 목록
export const upcomingEvents = (today: YMD) =>
  DDAY_EVENTS.map((event) => {
    const date = nextOccurrence(event, today);
    return { event, date, days: diffDays(today, date) };
  }).sort((a, b) => a.days - b.days);
