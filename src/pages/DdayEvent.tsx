import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import { SEOPageKey } from 'constants/seoContent';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEOMetaTag from 'seo/SEOMetaTag';
import { diffDays, formatYMD, YMD } from 'utill/dateCalc';
import { DDAY_EVENTS, findDdayEvent, nextOccurrence, upcomingEvents } from 'utill/ddayEvents';

const toYMD = (date: Date): YMD => ({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });

// 남은 시간을 일·시·분·초로 (기념일 0시 기준)
const remaining = (target: YMD, now: Date) => {
  const ms = Math.max(new Date(target.year, target.month - 1, target.day).getTime() - now.getTime(), 0);
  const s = Math.floor(ms / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
};

// 아직 브라우저에서 계산 전이면(프리렌더) 숫자 대신 D-?
const ddayLabel = (now: Date | null, days: number) => {
  if (!now) return 'D-?';
  return days === 0 ? 'D-DAY' : `D-${days}`;
};

const DdayEvent = () => {
  const event = findDdayEvent(useLocation().pathname) ?? DDAY_EVENTS[0];
  // 실시간 값은 브라우저에서만 계산한다 (프리렌더 HTML에 빌드 시점 숫자가 남지 않도록)
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (navigator.userAgent === 'ReactSnap') return undefined;
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = toYMD(now ?? new Date());
  const target = nextOccurrence(event, today);
  const days = diffDays(today, target);
  const left = now ? remaining(target, now) : null;
  const others = upcomingEvents(today).filter((item) => item.event.slug !== event.slug);

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title={`${event.name} 디데이`}>
        {event.name}({event.month}월 {event.day}일)까지 남은 날짜를 실시간으로 알려드립니다. 지금 이 순간 기준으로 자동 계산됩니다.
      </ToolHeader>

      <section className="rounded-2xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500 p-6 text-center text-white shadow-lg max-sm:px-4">
        <p className="text-sm font-medium text-white/85">{formatYMD(target)}</p>
        <p className="mt-2 text-6xl font-extrabold tracking-tight max-sm:text-5xl">{ddayLabel(now, days)}</p>
        <p className="mt-2 text-base font-semibold">{days === 0 && now ? `오늘은 ${event.name}입니다!` : `${event.name}까지`}</p>
        {left && days > 0 && (
          <div className="mx-auto mt-5 grid max-w-sm grid-cols-4 gap-2">
            {(
              [
                [left.days, '일'],
                [left.hours, '시간'],
                [left.minutes, '분'],
                [left.seconds, '초'],
              ] as [number, string][]
            ).map(([value, unit]) => (
              <div key={unit} className="rounded-xl bg-white/20 py-2">
                <p className="text-2xl font-bold tabular-nums">{String(value).padStart(2, '0')}</p>
                <p className="text-xs text-white/85">{unit}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">다른 기념일까지 남은 날</h2>
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {others.map(({ event: other, date, days: d }) => (
            <li key={other.slug}>
              <Link
                to={`/d-day/${other.slug}`}
                className="block rounded-xl border border-slate-200 bg-slate-50 p-3 hover:border-sky-300 dark:border-slate-600 dark:bg-slate-700/50"
              >
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">{other.name}</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {date.month}월 {date.day}일 · {now ? `D-${d}` : '계산 중'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/d-day" className="mt-3 inline-block text-sm font-medium !text-sky-600 underline">
          원하는 날짜로 D-day 계산하기 →
        </Link>
      </section>

      <SEOContent page={event.pageKey as SEOPageKey} />
      <Comment pathname={`dday-${event.slug}`} />
    </div>
  );
};

export default DdayEvent;
