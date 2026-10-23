import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import ImageConverter from '@components/image/ImageConverter';
import SEOMetaTag from 'seo/SEOMetaTag';

const ImgToPng = () => {
  return (
    <div className="w-full">
      <SEOMetaTag
        title={'이미지 PNG 변환'}
        description={'이미지 형식을 PNG로 신속하게 무료로 변환하세요. PNG, GIF, TIFF 또는 RAW 형식을 손쉽게 PNG 파일로 변환할 수 있습니다.'}
        url={'https://webtool.everyday-365.com/img-png'}
        imgsrc={'/images/meta.png'}
      />
      <ToolHeader title="이미지 PNG 변환">이미지를 선택하면 바로 PNG로 변환됩니다. 투명 배경은 그대로 유지됩니다.</ToolHeader>
      <ImageConverter type="image/png" ext="png" />
      <SEOContent page="imgToPng" />
      <Comment pathname="imgToPng" />
    </div>
  );
};

export default ImgToPng;
