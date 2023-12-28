import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import { useFirstLottoStore } from 'store/FirstLotto';
import _ from 'lodash';

const FirstLotto = () => {
  const { lotto } = useFirstLottoStore();

  return (
    <>
      {_.size(lotto) > 0 && (
        <div className="mt-5 block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-700">
          <div className="max-sm:text-xl border-b-2 border-neutral-100 px-6 pb-0 pt-5 text-2xl  dark:border-neutral-600 dark:text-neutral-50">
            <span className="font-bold">{lotto.no}</span> 당첨결과
            <p className=" flex justify-center items-center mt-1">
              <FaCircleDollarToSlot color="#ffc107" />
            </p>
          </div>
          <div className="p-6">
            <h5 className="mb-2 max-sm:text-lg text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">1등 당첨 번호 & 당첨금</h5>
            <p className="mb-3 text-base dark:text-neutral-50">{lotto.firstAccumamnt}</p>
            <div className="mb-4  text-neutral-600 dark:text-neutral-200">
              <ul className="flex justify-center items-center gap-2">
                <li>
                  <span className="bg-emerald-600 rounded-full h-9 w-9 flex items-center justify-center text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
                    {lotto.drwNo1}
                  </span>
                </li>
                <li>
                  <span className="bg-yellow-400 rounded-full h-9 w-9 flex items-center justify-center text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
                    {lotto.drwNo2}
                  </span>
                </li>
                <li>
                  <span className="bg-green-700 rounded-full h-9 w-9 flex items-center justify-center  text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
                    {lotto.drwNo3}
                  </span>
                </li>
                <li>
                  <span className="bg-lime-800 rounded-full h-9 w-9 flex items-center justify-center  text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
                    {lotto.drwNo4}
                  </span>
                </li>
                <li>
                  <span className="bg-sky-500 rounded-full h-9 w-9 flex items-center justify-center  text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
                    {lotto.drwNo5}
                  </span>
                </li>
                <li>
                  <FaPlus className=" text-lg" />
                </li>
                <li>
                  <span className="bg-blue-700  rounded-full h-9 w-9 flex items-center justify-center  text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
                    {lotto.drwNo6}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-sm:text-base text-lg border-t-2 border-neutral-100 px-6 pb-5 dark:border-neutral-600 dark:text-neutral-50">
            {lotto.drwNoDate} 추첨
          </div>
        </div>
      )}
    </>
  );
};

export default FirstLotto;
