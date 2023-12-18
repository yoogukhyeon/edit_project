import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

interface IpData {
  country_code: string;
  country_name: any;
  ip: string;
  result: boolean;
}

const Ip = () => {
  const [ip, setIP] = useState<IpData>();

  const getData = async () => {
    const res = await axios.get('https://api.ip.pe.kr/json/');
    setIP(res.data);
  };

  useMemo(() => getData(), []);

  return (
    <div className="mt-5 mb-7 text-center bg-slate-200 p-5 rounded-md">
      <p className="mb-3 text-gray-500 first-line:uppercase first-line:tracking-widest first-letter:text-3xl first-letter:font-bold first-letter:text-gray-900 first-letter:me-1 first-letter:float-start">
        My IP 주소
      </p>
      <p className="text-gray-500  text-xl max-sm:text-base">{ip?.ip}</p>
      <p className="text-gray-500  text-sm ">국가코드: {ip?.country_code}</p>
      <p className="text-gray-500  text-sm ">지역: {ip?.country_name?.ko}</p>
    </div>
  );
};

export default Ip;
