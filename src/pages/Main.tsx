import React, { useState } from 'react';
import { LocalizationMap, Viewer, Worker, CharacterMap, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import ko_KR from '@react-pdf-viewer/locales/lib/ko_KR.json';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import styled from 'styled-components';
import SEOMetaTag from 'seo/SEOMetaTag';
import Comment from '@components/common/common/Comment';

const characterMap: CharacterMap = {
  isCompressed: true,
  url: 'https://unpkg.com/pdfjs-dist@2.6.347/cmaps/',
};

const Main = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

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
        title={'PDF 보기'}
        description={
          '웹에서 바로 사용할 수 있는 다양한 웹툴을 제공합니다. PDF 미리보기, 이미지 변환, HTML 태그 제거기, 영어 대문자 소문자 변환, 글자수 문자수 계산기, 나만의 QR코드 만들기, 메타태그(SEO) 만들기, UserAgent확인, ip, 아이피, 내 아이피 쉽게 확인할수 있습니다.'
        }
        url={'https://webtool.everyday-365.com'}
        imgsrc={'/images/meta.png'}
      />
      <label htmlFor="file">
        <input id="file" type="file" accept=".pdf" onChange={onChange} />
      </label>
      <div>
        {url ? (
          <div className="mt-3">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
              <Viewer
                characterMap={characterMap}
                localization={ko_KR as unknown as LocalizationMap}
                fileUrl={url}
                plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]}
                defaultScale={SpecialZoomLevel.PageWidth}
              />
            </Worker>
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
