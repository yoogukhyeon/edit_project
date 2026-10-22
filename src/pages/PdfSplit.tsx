import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import JSZip from 'jszip';
import type { PDFDocument } from 'pdf-lib';
import React, { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import { downloadBlob, formatBytes } from 'utill/getByteSize';
import { parsePageRange } from 'utill/pageRange';

type Mode = 'range' | 'each' | 'chunk';

// pdf-lib는 용량이 커서 사용할 때만 불러온다.
const loadPdfLib = () => import('pdf-lib');

const extract = async (src: PDFDocument, indices: number[]) => {
  const { PDFDocument: PDFDoc } = await loadPdfLib();
  const doc = await PDFDoc.create();
  const pages = await doc.copyPages(src, indices);
  pages.forEach((page) => doc.addPage(page));
  return doc.save();
};

const PdfSplit = () => {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<PDFDocument | null>(null);
  const [mode, setMode] = useState<Mode>('range');
  const [range, setRange] = useState<string>('');
  const [chunk, setChunk] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);

  const loadFile = async (selected?: File) => {
    if (!selected) return;
    if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      toast.error('PDF 파일만 업로드 해주세요.');
      return;
    }
    try {
      const { PDFDocument: PDFDoc } = await loadPdfLib();
      const doc = await PDFDoc.load(await selected.arrayBuffer());
      setFile(selected);
      setSrc(doc);
      setRange(`1-${doc.getPageCount()}`);
    } catch (error) {
      toast.error('PDF를 읽을 수 없습니다. 암호가 걸린 PDF는 나눌 수 없습니다.');
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    loadFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    loadFile(e.dataTransfer.files[0]);
  };

  const baseName = file?.name.replace(/\.pdf$/i, '') || 'split';

  const onSplit = async () => {
    if (!src) {
      toast.error('PDF 파일을 먼저 선택해주세요.');
      return;
    }
    const pageCount = src.getPageCount();
    setLoading(true);

    try {
      if (mode === 'range') {
        const indices = parsePageRange(range, pageCount);
        if (!indices) {
          toast.error(`페이지 범위를 확인해주세요. (1 ~ ${pageCount}, 예: 1-3, 5)`);
          setLoading(false);
          return;
        }
        const bytes = await extract(src, indices);
        downloadBlob(new Blob([bytes], { type: 'application/pdf' }), `${baseName}_추출.pdf`);
      } else {
        const size = mode === 'each' ? 1 : Math.max(1, chunk);
        const zip = new JSZip();
        // eslint-disable-next-line no-plusplus
        for (let start = 0; start < pageCount; start += size) {
          const end = Math.min(start + size, pageCount);
          const indices = Array.from({ length: end - start }, (_, i) => start + i);
          // eslint-disable-next-line no-await-in-loop
          const bytes = await extract(src, indices);
          const label = size === 1 ? `${start + 1}` : `${start + 1}-${end}`;
          zip.file(`${baseName}_${label}.pdf`, bytes);
        }
        downloadBlob(await zip.generateAsync({ type: 'blob' }), `${baseName}_split.zip`);
      }
      toast.success('PDF를 나눴습니다.');
    } catch (error) {
      toast.error('PDF를 나누는 중 오류가 발생했습니다.');
    }

    setLoading(false);
  };

  const modeButton = (value: Mode, label: string) => (
    <button
      onClick={() => setMode(value)}
      className={`rounded-lg px-4 py-2 text-sm ${
        mode === value ? 'bg-sky-600 text-white' : 'bg-slate-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full">
      <SEOMetaTag
        title={'PDF 나누기 · 페이지 추출'}
        description={
          'PDF에서 원하는 페이지만 추출하거나, 한 페이지씩 또는 N페이지 단위로 나누는 무료 PDF 분할 도구입니다. 파일은 서버에 업로드되지 않습니다.'
        }
        url={'https://webtool.everyday-365.com/pdf-split'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white max-sm:text-xl">PDF 나누기 · 페이지 추출</h1>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        PDF 파일을 선택하고 나누는 방식을 고르세요. 파일은 브라우저 안에서만 처리됩니다.
      </p>

      <label
        htmlFor="split-input"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
      >
        {file && src ? (
          <p className="text-sm text-gray-700 dark:text-gray-200">
            <span className="font-semibold">{file.name}</span> · {src.getPageCount()}페이지 · {formatBytes(file.size)}
          </p>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">클릭 or 드래그로</span> PDF 파일을 선택해주세요.
          </p>
        )}
        <input id="split-input" type="file" accept=".pdf,application/pdf" className="hidden" onChange={onFileChange} />
      </label>

      <div className="mt-5 flex flex-wrap gap-2">
        {modeButton('range', '원하는 페이지 추출')}
        {modeButton('each', '한 페이지씩 나누기')}
        {modeButton('chunk', 'N페이지씩 나누기')}
      </div>

      <div className="mt-4">
        {mode === 'range' && (
          <>
            <label htmlFor="range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              추출할 페이지 (예: 1-3, 5, 8-)
            </label>
            <input
              id="range"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </>
        )}
        {mode === 'each' && <p className="text-sm text-gray-600 dark:text-gray-300">모든 페이지를 각각 PDF로 나눠 ZIP으로 내려받습니다.</p>}
        {mode === 'chunk' && (
          <>
            <label htmlFor="chunk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              몇 페이지씩 나눌까요?
            </label>
            <input
              id="chunk"
              type="number"
              min={1}
              value={chunk}
              onChange={(e) => setChunk(Number(e.target.value))}
              className="block w-40 p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </>
        )}
      </div>

      <div className="my-6 text-center">
        <button
          onClick={onSplit}
          disabled={loading}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 disabled:opacity-50"
        >
          {loading ? '나누는 중...' : 'PDF 나누기'}
        </button>
      </div>

      <SEOContent page="pdfSplit" />
      <Comment pathname="pdfSplit" />
    </div>
  );
};

export default PdfSplit;
