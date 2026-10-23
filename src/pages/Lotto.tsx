import ToolHeader from '@components/common/ToolHeader';
import Loading from '@components/common/common/Loading';
import SEOContent from '@components/common/SEOContent';
import FirstLotto from '@components/lotto/FirstLotto';
import List from '@components/lotto/List';
import axios from 'axios';
import cheerio from 'cheerio';
import React, { useEffect, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { useFirstLottoStore } from 'store/FirstLotto';

export type TLotto = {
  bnusNo: string;
  drwNo1: string;
  drwNo2: string;
  drwNo3: string;
  drwNo4: string;
  drwNo5: string;
  drwNo6: string;
  drwNoDate: string;
  firstAccumamnt: string;
  firstPrzwnerCo: string;
  no: string;
};

const Lotto = () => {
  const [lottoList, setLottoList] = useState<TLotto[]>([]);
  const [failed, setFailed] = useState<boolean>(false);
  const { setLotto } = useFirstLottoStore();

  useEffect(() => {
    const url =
      window.location.hostname === 'localhost'
        ? 'http://localhost:3000/lottowinnumber/fo/lottowinnumberlist'
        : '/api/lottowinnumber/fo/lottowinnumberlist';

    async function fetchdata() {
      try {
        return await axios.get(url);
      } catch (error) {
        // 실패하면 undefined를 반환하고 아래에서 안내 문구를 띄운다
        return undefined;
      }
    }

    const parsing = async () => {
      const html: any = await fetchdata();
      // 데이터 출처 사이트가 응답하지 않으면 로딩 대신 안내 문구를 보여준다
      if (!html) {
        setFailed(true);
        return;
      }
      const $ = cheerio.load(html.data);
      const ulList = [];

      const bodyList = $('tbody tr');

      // eslint-disable-next-line array-callback-return
      bodyList.map((i, element) => {
        ulList[i] = {
          no: $(element).find('td:nth-child(1)').text().replace(/\s/g, ''),
          drwNo1: $(element).find('td:nth-child(2) > a div:nth-child(1)').text().replace(/\s/g, ''),
          drwNo2: $(element).find('td:nth-child(2) > a div:nth-child(2)').text().replace(/\s/g, ''),
          drwNo3: $(element).find('td:nth-child(2) > a div:nth-child(3)').text().replace(/\s/g, ''),
          drwNo4: $(element).find('td:nth-child(2) > a div:nth-child(4)').text().replace(/\s/g, ''),
          drwNo5: $(element).find('td:nth-child(2) > a div:nth-child(5)').text().replace(/\s/g, ''),
          drwNo6: $(element).find('td:nth-child(2) > a div:nth-child(6)').text().replace(/\s/g, ''),
          bnusNo: $(element).find('td:nth-child(2) > a div:nth-child(8)').text().replace(/\s/g, ''),
          firstPrzwnerCo: $(element).find('td:nth-child(3)').text().replace(/\s/g, ''),
          firstAccumamnt: $(element).find('td:nth-child(4)').text().replace(/\s/g, ''),
          drwNoDate: $(element).find('td:nth-child(5)').text().replace(/\s/g, ''),
        };
      });

      setLotto(ulList[0]);
      setLottoList(ulList);
    };

    parsing();
  }, []);

  return (
    <>
      <SEOMetaTag
        title={'로또회차별당첨번호'}
        description={
          '6개월 전부터 현재까지 모든 로또당첨번호, 일등당첨수, 일등 당첨금액, 발표일 등의 정보를 제공합니다. 로또당첨번호, 로또당첨번호조회를 확인할수 있습니다.'
        }
        url={'https://webtool.everyday-365.com/lotto'}
        imgsrc={'/images/meta.png'}
      />
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
