import React, { lazy, Suspense, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import ToolIndex from '@components/common/ToolIndex';
import { h1Class, leadClass } from 'constants/ui';
import { toast } from 'react-toastify';

const PdfViewer = lazy(() => import('@components/pdf/PdfViewer'));

const Main = () => {
  const [url, setUrl] = useState('');

  const openFile = (file?: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('PDF 파일만 열 수 있습니다.');
      return;
    }
    // 선택한 파일을 브라우저 URL(blob)로 만들어 뷰어에 넘긴다.
    setUrl(URL.createObjectURL(file));
  };

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

      <section className="mt-10">
        <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">PDF 보기</h2>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">PDF 파일을 선택하면 이 화면에서 바로 열어볼 수 있습니다.</p>
        <label
          htmlFor="file"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            openFile(e.dataTransfer.files[0]);
          }}
          className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <span className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold">클릭 or 드래그로</span> PDF 파일을 열어주세요.
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
          <div className="mt-3">
            <Suspense fallback={<div className="py-20 text-center text-sm text-gray-500">PDF 뷰어를 불러오는 중...</div>}>
              <PdfViewer url={url} />
            </Suspense>
          </div>
        )}
      </section>

      <SEOContent page="main" />
      <Comment pathname="main" />
    </div>
  );
};

export default Main;
