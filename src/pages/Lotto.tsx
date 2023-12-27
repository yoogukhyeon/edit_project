import axios from 'axios';
import cheerio from 'cheerio';
import React, { useEffect } from 'react';

const Lotto = () => {
  useEffect(() => {
    // eslint-disable-next-line consistent-return
    async function fetchdata() {
      try {
        return await axios.get('/lottowinnumber/fo/lottowinnumberlist');
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

      console.log('ulList::', ulList);
    };

    parsing();
  }, []);

  return <div></div>;
};

export default Lotto;
