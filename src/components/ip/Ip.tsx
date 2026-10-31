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
  const [failed, setFailed] = useState<boolean>(false);

  const getData = async () => {
    try {
      const res = await axios.get('https://api.ip.pe.kr/json/');
      setIP(res.data);
    } catch (error) {
      // 광고 차단기·네트워크 문제로 조회 서비스에 연결하지 못한 경우
      setFailed(true);
    }
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
      {failed && (
        <p className="mb-1 text-sm text-amber-700 dark:text-amber-300">
          IP 조회 서비스에 연결하지 못했습니다. 광고 차단 확장 프로그램을 끄거나 잠시 후 새로고침해주세요.
        </p>
      )}
      <p className="text-sm text-gray-600 dark:text-gray-300">국가코드: {ip?.country_code}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">지역: {ip?.country_name?.ko}</p>
    </div>
  );
};

export default Ip;
