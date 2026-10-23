import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import React, { useEffect, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { addDays, diffDays, formatDday, formatYMD, getAnniversary, parseYMD, toYMDString } from 'utill/dateCalc';

const inputClass =
  'block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white';
const labelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
const cardClass = 'rounded-md border border-gray-200 p-5 dark:border-gray-700';

const MILESTONES = [100, 200, 300, 365, 500, 1000];

const Dday = () => {
  const [today, setToday] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [days, setDays] = useState<number>(100);

  // 프리렌더된 HTML에 빌드 날짜가 박히지 않도록 오늘 날짜는 브라우저에서 채운다.
  useEffect(() => {
    if (navigator.userAgent === 'ReactSnap') return;
    const value = toYMDString(new Date());
    setToday(value);
    setBase(value);
  }, []);

  const todayDate = parseYMD(today);
  const targetDate = parseYMD(target);
  const startDate = parseYMD(start);
  const baseDate = parseYMD(base);

  return (
    <div className="w-full">
      <SEOMetaTag
        title={'D-day 계산기 · 날짜 계산기'}
        description={
          '목표일까지 남은 날짜(D-day), 시작일부터 며칠째인지, 100일·1000일 기념일, 특정 날짜에서 N일 후 날짜를 계산하는 무료 날짜 계산기입니다.'
        }
        url={'https://webtool.everyday-365.com/d-day'}
        imgsrc={'/images/meta.png'}
      />
      <ToolHeader title="D-day 계산기 · 날짜 계산기">시험, 전역, 출산 예정일까지 남은 날이나 연애·결혼 기념일, N일 후 날짜를 계산합니다.</ToolHeader>

      <section className={cardClass}>
        <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">목표일까지 남은 날 (D-day)</h2>
        <label htmlFor="target" className={labelClass}>
          목표 날짜
        </label>
        <input id="target" type="date" value={target} onChange={(e) => setTarget(e.target.value)} className={inputClass} />
        {todayDate && targetDate && (
          <p className="mt-4 text-center">
            <span className="text-3xl font-bold text-sky-600">{formatDday(diffDays(todayDate, targetDate))}</span>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">{formatYMD(targetDate)}</span>
          </p>
        )}
      </section>

      <section className={`${cardClass} mt-5`}>
        <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">시작일부터 며칠째 · 기념일 계산</h2>
        <label htmlFor="start" className={labelClass}>
          시작일 (사귄 날, 입사일 등 · 시작일을 1일로 계산)
        </label>
        <input id="start" type="date" value={start} onChange={(e) => setStart(e.target.value)} className={inputClass} />
        {todayDate && startDate && (
          <>
            <p className="mt-4 text-center text-3xl font-bold text-sky-600">
              {diffDays(startDate, todayDate) >= 0 ? `${(diffDays(startDate, todayDate) + 1).toLocaleString()}일째` : '아직 시작 전입니다'}
            </p>
            <ul className="mt-4 grid gap-2 text-sm md:grid-cols-2">
              {MILESTONES.map((milestone) => {
                const date = getAnniversary(startDate, milestone);
                return (
                  <li key={milestone} className="flex justify-between rounded-md bg-slate-100 px-3 py-2 dark:bg-gray-800">
                    <span className="font-medium text-gray-900 dark:text-white">{milestone === 365 ? '1주년' : `${milestone}일`}</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {formatYMD(date)} · {formatDday(diffDays(todayDate, date))}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      <section className={`${cardClass} mt-5`}>
        <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">N일 후 / 전 날짜 계산</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="base" className={labelClass}>
              기준일
            </label>
            <input id="base" type="date" value={base} onChange={(e) => setBase(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="days" className={labelClass}>
              더할 일수 (빼려면 음수 입력)
            </label>
            <input id="days" type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} className={inputClass} />
          </div>
        </div>
        {baseDate && Number.isFinite(days) && (
          <p className="mt-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
            {Math.abs(days)}일 {days >= 0 ? '후' : '전'}: <span className="text-sky-600">{formatYMD(addDays(baseDate, days))}</span>
          </p>
        )}
      </section>

      <SEOContent page="dday" />
      <Comment pathname="dday" />
    </div>
  );
};

export default Dday;
