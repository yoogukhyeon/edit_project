import ToolHeader from '@components/common/ToolHeader';
import Loading from '@components/common/common/Loading';
import SEOContent from '@components/common/SEOContent';
import FirstLotto from '@components/lotto/FirstLotto';
import List from '@components/lotto/List';
import React, { useEffect, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { useFirstLottoStore } from 'store/FirstLotto';
import { fetchRecentLotto, TLotto } from 'utill/lottoData';

export type { TLotto } from 'utill/lottoData';

const Lotto = () => {
  const [lottoList, setLottoList] = useState<TLotto[]>([]);
  const [failed, setFailed] = useState<boolean>(false);
  const { setLotto } = useFirstLottoStore();

  useEffect(() => {
    fetchRecentLotto().then((rows) => {
      // 데이터 출처 사이트가 응답하지 않으면 로딩 대신 안내 문구를 보여준다
      if (!rows) {
        setFailed(true);
        return;
      }
      setLotto(rows[0]);
      setLottoList(rows);
    });
  }, []);

  return (
    <>
      <SEOMetaTag />
      <ToolHeader title="로또 회차별 당첨번호">최근 회차의 당첨번호와 보너스 번호, 1등 당첨자 수와 당첨금을 한눈에 확인하세요.</ToolHeader>
      <FirstLotto />
      {lottoList?.length > 0 && (
        <div className="flex flex-col ">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center text-sm font-light">
                  <thead className="border-b bg-blue-300 font-medium text-white dark:border-neutral-500 ">
                    <tr>
                      <th scope="col" className=" px-6 py-4">
                        회차
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        당첨번호
                      </th>
                      <th scope="col" className=" px-6 py-4" style={{ wordBreak: 'keep-all' }}>
                        1등당첨수
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        일등 당첨금액
                      </th>
                      <th scope="col" className=" px-6 py-4">
                        발표일
                      </th>
                    </tr>
                  </thead>
                  <tbody>{lottoList?.map((val: any) => <List key={val.no} val={val} />)}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {lottoList?.length < 1 && !failed && <Loading />}
      {failed && (
        <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800 dark:bg-slate-700 dark:text-amber-300">
          당첨번호를 불러오지 못했습니다. 잠시 후 새로고침해주세요. 최신 결과는 동행복권 사이트에서도 확인할 수 있습니다.
        </p>
      )}
      <SEOContent page="lotto" />
    </>
  );
};

export default Lotto;
