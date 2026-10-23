import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import ImageConverter from '@components/image/ImageConverter';
import SEOMetaTag from 'seo/SEOMetaTag';

const ImgToJpg = () => {
  return (
    <div className="w-full">
      <SEOMetaTag
        title={'이미지 JPG 변환'}
        description={'이미지 형식을 JPG로 신속하게 무료로 변환하세요. PNG, GIF, TIFF 또는 RAW 형식을 손쉽게 JPG 파일로 변환할 수 있습니다.'}
        url={'https://webtool.everyday-365.com/img-jpg'}
        imgsrc={'/images/meta.png'}
      />
      <ToolHeader title="이미지 JPG 변환">이미지를 선택하면 바로 JPG로 변환됩니다. 투명한 부분은 흰색 배경으로 바뀝니다.</ToolHeader>
      <ImageConverter type="image/jpeg" ext="jpg" />
      <SEOContent page="imgToJpg" />
      <Comment pathname="imgToJpg" />
    </div>
  );
};

export default ImgToJpg;
