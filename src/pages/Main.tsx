import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

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
    <div>
      <input type="file" accept=".pdf" onChange={onChange} />
      <div style={{ height: '750px' }}>
        {url ? (
          <div
            className="rpv-core__viewer"
            style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
              <div style={{ height: '750px' }}>
                <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]} />
              </div>
            </Worker>
          </div>
        ) : (
          <div
            style={{
              alignItems: 'center',
              border: '2px dashed rgba(0, 0, 0, .3)',
              display: 'flex',
              fontSize: '2rem',
              height: '100%',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            Preview area
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
