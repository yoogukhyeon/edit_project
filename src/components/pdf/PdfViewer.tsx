import { CharacterMap, LocalizationMap, SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import ko_KR from '@react-pdf-viewer/locales/lib/ko_KR.json';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const characterMap: CharacterMap = {
  isCompressed: true,
  url: 'https://unpkg.com/pdfjs-dist@2.6.347/cmaps/',
};

// PDF 뷰어 라이브러리는 용량이 커서 파일을 선택했을 때만 불러온다 (Main에서 lazy import).
const PdfViewer = ({ url }: { url: string }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const toolbarPluginInstance = toolbarPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
      <Viewer
        characterMap={characterMap}
        localization={ko_KR as unknown as LocalizationMap}
        fileUrl={url}
        plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]}
        defaultScale={SpecialZoomLevel.PageWidth}
      />
    </Worker>
  );
};

export default PdfViewer;
