import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import React, { lazy, Suspense, useState } from 'react';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';

const PdfViewer = lazy(() => import('@components/pdf/PdfViewer'));

const PdfView = () => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const openFile = (file?: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('PDF 파일만 열 수 있습니다.');
      return;
    }
    // 선택한 파일을 브라우저 URL(blob)로 만들어 뷰어에 넘긴다.
    if (url) URL.revokeObjectURL(url);
    setUrl(URL.createObjectURL(file));
    setName(file.name);
  };

  return (
    <div>
      <SEOMetaTag
        title={'PDF 보기'}
        description={'PDF 파일을 프로그램 설치 없이 브라우저에서 바로 열어보는 무료 PDF 뷰어입니다. 파일은 서버로 전송되지 않습니다.'}
        url={'https://webtool.everyday-365.com/pdf-view'}
        imgsrc={'/images/meta.png'}
      />
      <ToolHeader title="PDF 보기">PDF 파일을 선택하면 이 화면에서 바로 열어볼 수 있습니다. 파일은 서버로 전송되지 않습니다.</ToolHeader>

      <label
        htmlFor="file"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          openFile(e.dataTransfer.files[0]);
        }}
        className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 ${
          url ? 'h-16' : 'h-48'
        }`}
      >
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {url ? (
            <>
              <span className="font-semibold">{name}</span> · 다른 파일을 열려면 클릭 or 드래그
            </>
          ) : (
            <>
              <span className="font-semibold">클릭 or 드래그로</span> PDF 파일을 열어주세요.
            </>
          )}
        </span>
        <input
          id="file"
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            openFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </label>
      {url && (
        <div className="mt-3 h-[80vh]">
          <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">PDF 뷰어를 불러오는 중...</div>}>
            <PdfViewer url={url} />
          </Suspense>
        </div>
      )}

      <SEOContent page="pdfView" />
      <Comment pathname="pdfView" />
    </div>
  );
};

export default PdfView;
