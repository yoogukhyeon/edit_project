import Loading from '@components/common/common/Loading';
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
  const { setLotto } = useFirstLottoStore();

  useEffect(() => {
    const url =
      window.location.hostname === 'localhost'
        ? 'http://localhost:3000/lottowinnumber/fo/lottowinnumberlist'
        : '/api/lottowinnumber/fo/lottowinnumberlist';

    // eslint-disable-next-line consistent-return
    async function fetchdata() {
      try {
        return await axios.get(url);
      } catch (error) {
        console.error(error);
      }
    }

    const parsing = async () => {
      const html: any = await fetchdata();
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
        imgsrc={'/images/logo.png'}
      />
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
      {lottoList?.length < 1 && <Loading />}
    </>
  );
};

export default Lotto;
