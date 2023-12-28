import { TLotto } from 'pages/Lotto';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface IProps {
  val: TLotto;
}

const List = ({ val }: IProps) => {
  return (
    <tr className="border-b dark:border-neutral-500 " style={{ borderBottom: '1px solid #eee' }}>
      <td className="whitespace-nowrap  px-6 py-4 ">{val.no}</td>
      <td className="whitespace-nowrap  px-6 py-4">
        <ul className="flex justify-center items-center gap-2">
          <li>
            <span className="bg-yellow-400 rounded-full h-9 w-9 flex items-center justify-center text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
              {val.drwNo1}
            </span>
          </li>
          <li>
            <span className="bg-lime-800 rounded-full h-9 w-9 flex items-center justify-center text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
              {val.drwNo2}
            </span>
          </li>
          <li>
            <span className="bg-green-700 rounded-full h-9 w-9 flex items-center justify-center  text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
              {val.drwNo3}
            </span>
          </li>
          <li>
            <span className="bg-emerald-600 rounded-full h-9 w-9 flex items-center justify-center  text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
              {val.drwNo4}
            </span>
          </li>
          <li>
            <span className="bg-blue-700 rounded-full h-9 w-9 flex items-center justify-center  text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
              {val.drwNo5}
            </span>
          </li>
          <li>
            <FaPlus className=" text-lg" />
          </li>
          <li>
            <span className="bg-sky-500 rounded-full h-9 w-9 flex items-center justify-center  text-white max-sm:text-xs max-sm:h-7 max-sm:w-7">
              {val.bnusNo}
            </span>
          </li>
        </ul>
      </td>
      <td className="whitespace-nowrap  px-6 py-4">{val.firstPrzwnerCo}</td>
      <td className="whitespace-nowrap  px-6 py-4">{val.firstAccumamnt}</td>
      <td className="whitespace-nowrap  px-6 py-4">{val.drwNoDate}</td>
    </tr>
  );
};

export default React.memo(List);
