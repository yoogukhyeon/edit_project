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
        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">회차별 당첨번호</h2>
          <ul className="grid gap-2.5 md:grid-cols-2">
            {lottoList.map((val) => (
              <List key={val.no} val={val} />
            ))}
          </ul>
        </section>
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
