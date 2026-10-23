import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import ImageConverter from '@components/image/ImageConverter';
import SEOMetaTag from 'seo/SEOMetaTag';

const ImgToPng = () => {
  return (
    <div className="w-full">
      <SEOMetaTag />
      <ToolHeader title="이미지 PNG 변환">이미지를 선택하면 바로 PNG로 변환됩니다. 투명 배경은 그대로 유지됩니다.</ToolHeader>
      <ImageConverter type="image/png" ext="png" />
      <SEOContent page="imgToPng" />
      <Comment pathname="imgToPng" />
    </div>
  );
};

export default ImgToPng;
