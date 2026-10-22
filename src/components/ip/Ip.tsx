import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    // react-snap 프리렌더 시 빌드 PC의 IP가 정적 HTML에 박히지 않도록 제외
    if (navigator.userAgent === 'ReactSnap') return;
    getData();
  }, []);

  return (
    <div className="mt-3 mb-5 rounded-md bg-slate-200 p-5 text-center dark:bg-slate-700">
      <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-300">내 IP 주소</p>
      <p className="mb-1 min-h-[2.25rem] text-3xl font-semibold text-gray-800 max-sm:text-xl dark:text-white">{ip?.ip}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">국가코드: {ip?.country_code}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">지역: {ip?.country_name?.ko}</p>
    </div>
  );
};

export default Ip;
