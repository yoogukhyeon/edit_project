import SEOMetaTag from 'seo/SEOMetaTag';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import ToolIndex from '@components/common/ToolIndex';
import { h1Class, leadClass } from 'constants/ui';

const Main = () => {
  return (
    <div>
      <SEOMetaTag
        title={'EVERYDAY 웹툴 - PDF 합치기, 이미지 용량 줄이기, 글자수 계산 등 무료 웹툴 모음'}
        description={
          'PDF 보기·합치기·나누기, 이미지 용량 줄이기와 JPG/PNG 변환, 글자수 계산, 만 나이·D-day 계산, QR코드 만들기까지 설치 없이 브라우저에서 바로 쓰는 무료 웹툴 모음입니다.'
        }
        url={'https://webtool.everyday-365.com/'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className={h1Class}>EVERYDAY 웹툴 - 무료 온라인 도구 모음</h1>
      <p className={leadClass}>PDF, 이미지, 텍스트, 계산기 도구를 설치 없이 브라우저에서 바로 사용하세요. 파일은 서버로 전송되지 않습니다.</p>

      <ToolIndex />

      <SEOContent page="main" />
      <Comment pathname="main" />
    </div>
  );
};

export default Main;
