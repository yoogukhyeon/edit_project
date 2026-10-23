import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import ImageConverter from '@components/image/ImageConverter';
import SEOMetaTag from 'seo/SEOMetaTag';

const ImgToJpg = () => {
  return (
    <div className="w-full">
      <SEOMetaTag />
      <ToolHeader title="이미지 JPG 변환">이미지를 선택하면 바로 JPG로 변환됩니다. 투명한 부분은 흰색 배경으로 바뀝니다.</ToolHeader>
      <ImageConverter type="image/jpeg" ext="jpg" />
      <SEOContent page="imgToJpg" />
      <Comment pathname="imgToJpg" />
    </div>
  );
};

export default ImgToJpg;
