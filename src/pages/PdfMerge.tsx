import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import React, { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import { downloadBlob, formatBytes } from 'utill/getByteSize';

const MAX_FILES = 20;

const PdfMerge = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const pdfs = Array.from(list).filter((file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));
    if (pdfs.length !== list.length) toast.error('PDF 파일만 추가할 수 있습니다.');
    if (files.length + pdfs.length > MAX_FILES) toast.error(`최대 ${MAX_FILES}개까지 합칠 수 있습니다.`);
    setFiles([...files, ...pdfs].slice(0, MAX_FILES));
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  const move = (index: number, offset: number) => {
    const target = index + offset;
    if (target < 0 || target >= files.length) return;
    const next = [...files];
    [next[index], next[target]] = [next[target], next[index]];
    setFiles(next);
  };

  const remove = (index: number) => setFiles(files.filter((_, i) => i !== index));

  const onMerge = async () => {
    if (files.length < 2) {
      toast.error('PDF 파일을 2개 이상 추가해주세요.');
      return;
    }
    setLoading(true);

    try {
      // pdf-lib는 용량이 커서 사용할 때만 불러온다.
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();
      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const src = await PDFDocument.load(await file.arrayBuffer());
          // eslint-disable-next-line no-await-in-loop
          const pages = await merged.copyPages(src, src.getPageIndices());
          pages.forEach((page) => merged.addPage(page));
        } catch (error) {
          throw new Error(file.name);
        }
      }
      const bytes = await merged.save();
      downloadBlob(new Blob([bytes], { type: 'application/pdf' }), 'merged.pdf');
      toast.success(`${merged.getPageCount()}페이지 PDF로 합쳤습니다.`);
    } catch (error: any) {
      toast.error(`${error.message} 파일을 읽을 수 없습니다. 암호가 걸린 PDF는 합칠 수 없습니다.`);
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <SEOMetaTag />
      <ToolHeader title="PDF 합치기">PDF 파일을 추가하고 순서를 정한 뒤 합치기를 누르세요. 파일은 브라우저 안에서만 처리됩니다.</ToolHeader>

      <label
        htmlFor="merge-input"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
      >
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">클릭 or 드래그로</span> PDF 파일을 추가해주세요.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">최대 {MAX_FILES}개 · 여러 개 선택 가능</p>
        <input id="merge-input" type="file" accept=".pdf,application/pdf" multiple className="hidden" onChange={onFileChange} />
      </label>

      {files.length > 0 && (
        <ol className="mt-5 space-y-2">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-md border border-gray-200 p-3 text-sm dark:border-gray-700">
              <span className="w-6 text-center font-semibold text-sky-600">{index + 1}</span>
              <span className="min-w-0 flex-1 truncate text-gray-900 dark:text-white">{file.name}</span>
              <span className="text-gray-500 dark:text-gray-400">{formatBytes(file.size)}</span>
              <button onClick={() => move(index, -1)} disabled={index === 0} className="px-2 disabled:opacity-30" aria-label="위로">
                ▲
              </button>
              <button onClick={() => move(index, 1)} disabled={index === files.length - 1} className="px-2 disabled:opacity-30" aria-label="아래로">
                ▼
              </button>
              <button onClick={() => remove(index)} className="px-2 text-red-500" aria-label="삭제">
                ✕
              </button>
            </li>
          ))}
        </ol>
      )}

      <div className="my-6 flex justify-center gap-3">
        <button
          onClick={onMerge}
          disabled={loading}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 disabled:opacity-50"
        >
          {loading ? '합치는 중...' : 'PDF 합치기'}
        </button>
        <button onClick={() => setFiles([])} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200">
          초기화
        </button>
      </div>

      <SEOContent page="pdfMerge" />
      <Comment pathname="pdfMerge" />
    </div>
  );
};

export default PdfMerge;
