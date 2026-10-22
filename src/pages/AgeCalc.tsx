import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import React, { useEffect, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { diffDays, formatDday, formatYMD, getInternationalAge, getNextBirthday, getWeekday, getZodiac, parseYMD, toYMDString } from 'utill/dateCalc';

const inputClass =
  'block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white';

const AgeCalc = () => {
  const [birth, setBirth] = useState<string>('');
  const [base, setBase] = useState<string>('');

  // 프리렌더된 HTML에 빌드 날짜가 박히지 않도록 오늘 날짜는 브라우저에서 채운다.
  useEffect(() => {
    if (navigator.userAgent === 'ReactSnap') return;
    setBase(toYMDString(new Date()));
  }, []);

  const birthDate = parseYMD(birth);
  const baseDate = parseYMD(base);
  const valid = birthDate && baseDate && diffDays(birthDate, baseDate) >= 0;

  const age = valid ? getInternationalAge(birthDate, baseDate) : 0;
  const yearAge = valid ? baseDate.year - birthDate.year : 0;
  const nextBirthday = valid ? getNextBirthday(birthDate, baseDate) : null;

  return (
    <div className="w-full">
      <SEOMetaTag
        title={'만 나이 계산기'}
        description={
          '생년월일을 입력하면 만 나이, 연 나이, 세는 나이와 다음 생일까지 남은 날, 태어난 지 며칠인지 바로 계산해주는 무료 만 나이 계산기입니다.'
        }
        url={'https://webtool.everyday-365.com/age-calc'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">만 나이 계산기</h1>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        2023년 6월 28일부터 법적·사회적 나이는 만 나이로 통일되었습니다. 생년월일을 입력하면 바로 계산됩니다.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            생년월일
          </label>
          <input id="birth" type="date" value={birth} max={base || undefined} onChange={(e) => setBirth(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="base" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            기준일 (기본: 오늘)
          </label>
          <input id="base" type="date" value={base} onChange={(e) => setBase(e.target.value)} className={inputClass} />
        </div>
      </div>

      {birthDate && baseDate && !valid && <p className="mt-4 text-sm text-red-500">생년월일은 기준일보다 이전이어야 합니다.</p>}

      {valid && nextBirthday && (
        <div className="mt-6">
          <div className="rounded-md bg-slate-100 p-6 text-center dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">만 나이</p>
            <p className="mt-1 text-4xl font-bold text-gray-900 dark:text-white">{age}세</p>
          </div>
          <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
            {[
              ['연 나이 (올해 - 출생연도)', `${yearAge}세`],
              ['세는 나이 (한국식)', `${yearAge + 1}세`],
              ['다음 생일', `${formatYMD(nextBirthday)} · ${formatDday(diffDays(baseDate, nextBirthday))}`],
              ['태어난 지', `${(diffDays(birthDate, baseDate) + 1).toLocaleString()}일째`],
              ['띠 (양력 연도 기준)', `${getZodiac(birthDate.year)}띠`],
              ['태어난 요일', `${getWeekday(birthDate)}요일`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between rounded-md border border-gray-200 p-3 dark:border-gray-700">
                <dt className="text-gray-500 dark:text-gray-400">{label}</dt>
                <dd className="font-medium text-gray-900 dark:text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <SEOContent page="ageCalc" />
      <Comment pathname="ageCalc" />
    </div>
  );
};

export default AgeCalc;
