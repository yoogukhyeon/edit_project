import React, { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import SEOMetaTag from 'seo/SEOMetaTag';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import ToolIndex from '@components/common/ToolIndex';

const PdfViewer = lazy(() => import('@components/pdf/PdfViewer'));

const Main = () => {
  const [url, setUrl] = useState('');

  // Handle the `onChange` event of the `file` input
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    // 이진 데이터를 나타내며, 텍스트, 이미지, 오디오, 비디오 등 다양한 형식을 지원합니다
    // blob 이진데이터를 브라우저 url로 사용하기 위해서 createObjectURL로 변환
    // Base64는 바이너리 데이터를 문자열로 표현하는 인코딩 방식
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  return (
    <MainWrap>
      <SEOMetaTag
        title={'EVERYDAY 웹툴 - PDF 합치기, 이미지 용량 줄이기, 글자수 계산 등 무료 웹툴 모음'}
        description={
          'PDF 보기·합치기·나누기, 이미지 용량 줄이기와 JPG/PNG 변환, 글자수 계산, 만 나이·D-day 계산, QR코드 만들기까지 설치 없이 브라우저에서 바로 쓰는 무료 웹툴 모음입니다.'
        }
        url={'https://webtool.everyday-365.com/'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">EVERYDAY 웹툴 - 무료 온라인 도구 모음</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        PDF, 이미지, 텍스트, 계산기 도구를 설치 없이 브라우저에서 바로 사용하세요. 파일은 서버로 전송되지 않습니다.
      </p>
      <h2 className="mb-3 text-lg font-medium text-gray-900 dark:text-white">PDF 보기</h2>
      <label htmlFor="file">
        <input id="file" type="file" accept=".pdf" onChange={onChange} />
      </label>
      <div>
        {url ? (
          <div className="mt-3">
            <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">PDF 뷰어를 불러오는 중...</div>}>
              <PdfViewer url={url} />
            </Suspense>
          </div>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              fontSize: '2rem',
              minHeight: '500px',
              justifyContent: 'center',
              width: '100%',
            }}
            className="mt-2.5 border-dashed border-2 border-slate-500 dark:border-slate-200 "
          >
            PDF PREVIEW
          </div>
        )}
      </div>
      <ToolIndex />
      <SEOContent page="main" />
      <Comment pathname="main" />
    </MainWrap>
  );
};

const MainWrap = styled.div`
  input[type='file']::file-selector-button {
    width: 150px;
    height: 35px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: skyblue;
      color: #fff;
    }
  }

  input[type='file'] {
    font-size: 14px;
  }
`;

export default Main;
