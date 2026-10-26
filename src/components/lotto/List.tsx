import React from 'react';
import { TLotto, winningNumbers } from 'utill/lottoData';
import LottoBall from './LottoBall';

// 회차별 당첨번호 카드 (모바일에서도 6개 번호·보너스·1등 정보가 한 화면에 보이도록)
const List = ({ val }: { val: TLotto }) => (
  <li className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-600 dark:bg-slate-800">
    <div className="mb-2 flex items-baseline justify-between">
      <span className="text-base font-bold text-gray-900 dark:text-white">{val.no}회</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{val.drwNoDate}</span>
    </div>
    <div className="flex flex-wrap items-center gap-1.5">
      {winningNumbers(val).map((n) => (
        <LottoBall key={n} n={n} />
      ))}
      <span className="mx-0.5 text-lg font-bold text-gray-400" aria-label="보너스">
        +
      </span>
      <LottoBall n={val.bnusNo} />
    </div>
    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
      1등 {val.firstPrzwnerCo}명 · 당첨금 <span className="font-semibold">{val.firstAccumamnt}</span>
    </p>
  </li>
);

export default React.memo(List);
