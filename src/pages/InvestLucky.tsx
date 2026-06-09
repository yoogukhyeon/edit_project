import styled from 'styled-components';
import SEOMetaTag from 'seo/SEOMetaTag';
import SEOContent from '@components/common/SEOContent';

const InvestLucky = () => {
  return (
    <>
      <SEOMetaTag
        title={'오늘의 투자운세'}
        description={'띠별로 오늘의 투자운세를 확인하세요!'}
        url={'https://webtool.everyday-365.com/invest-lucky'}
        imgsrc={'/images/meta.png'}
      />
      <InvestLuckyWrap>
        <h1 className="mb-2 text-3xl font-medium text-gray-900 dark:text-white ">오늘의 투자 운세</h1>
        <iframe src="https://webtool.cusis.net/ex/today-lucky/tl.html" className="dark:bg-white dark:py-3 dark:rounded-sm" frameBorder="0"></iframe>
      </InvestLuckyWrap>
      <SEOContent page="investLucky" />
    </>
  );
};

const InvestLuckyWrap = styled.div`
  > iframe {
    margin-top: 20px;
    width: 100%;
    height: 1080px;
  }
`;

export default InvestLucky;
