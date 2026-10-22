import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import JSZip from 'jszip';
import React, { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import { downloadBlob, formatBytes } from 'utill/getByteSize';

type OutputType = 'image/jpeg' | 'image/webp' | 'image/png';

type Result = {
  name: string;
  originalSize: number;
  blob: Blob;
  url: string;
  width: number;
  height: number;
};

const EXT: Record<OutputType, string> = {
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/png': 'png',
};

const MAX_FILES = 20;
const MAX_SIZE = 1024 ** 2 * 20; // 20mb

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });

const compress = async (file: File, type: OutputType, quality: number, maxWidth: number) => {
  const img = await loadImage(file);
  const ratio = maxWidth > 0 && img.width > maxWidth ? maxWidth / img.width : 1;
  const width = Math.round(img.width * ratio);
  const height = Math.round(img.height * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas');

  // JPG는 투명도를 지원하지 않으므로 흰 배경을 깔아준다.
  if (type === 'image/jpeg') {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
  if (!blob) throw new Error('blob');

  return { blob, width, height };
};

const ImgCompress = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [type, setType] = useState<OutputType>('image/jpeg');
  const [quality, setQuality] = useState<number>(70);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [loading, setLoading] = useState<boolean>(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const images = Array.from(list).filter((file) => file.type.startsWith('image/'));
    if (images.length !== list.length) toast.error('이미지 파일만 추가할 수 있습니다.');

    const valid = images.filter((file) => file.size <= MAX_SIZE);
    if (valid.length !== images.length) toast.error('20MB를 초과한 파일은 제외되었습니다.');

    const next = [...files, ...valid].slice(0, MAX_FILES);
    if (files.length + valid.length > MAX_FILES) toast.error(`한 번에 최대 ${MAX_FILES}장까지 변환할 수 있습니다.`);

    setFiles(next);
    setResults([]);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  const onReset = () => {
    results.forEach((result) => URL.revokeObjectURL(result.url));
    setFiles([]);
    setResults([]);
  };

  const onCompress = async () => {
    if (files.length === 0) {
      toast.error('이미지를 먼저 선택해주세요.');
      return;
    }
    setLoading(true);
    results.forEach((result) => URL.revokeObjectURL(result.url));

    const next: Result[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const { blob, width, height } = await compress(file, type, quality / 100, maxWidth);
        const baseName = file.name.replace(/\.[^.]+$/, '');
        next.push({
          name: `${baseName}.${EXT[type]}`,
          originalSize: file.size,
          blob,
          url: URL.createObjectURL(blob),
          width,
          height,
        });
      } catch (error) {
        toast.error(`${file.name} 변환에 실패했습니다.`);
      }
    }

    setResults(next);
    setLoading(false);
  };

  const onDownloadAll = async () => {
    const zip = new JSZip();
    results.forEach((result) => zip.file(result.name, result.blob));
    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, 'compressed-images.zip');
  };

  const totalBefore = results.reduce((sum, result) => sum + result.originalSize, 0);
  const totalAfter = results.reduce((sum, result) => sum + result.blob.size, 0);

  return (
    <div className="w-full">
      <SEOMetaTag
        title={'이미지 용량 줄이기 · 크기 조절'}
        description={
          'JPG, PNG, WebP 이미지 용량을 브라우저에서 바로 줄이세요. 화질과 최대 가로 크기를 조절하고 여러 장을 한 번에 압축해 ZIP으로 내려받을 수 있습니다.'
        }
        url={'https://webtool.everyday-365.com/img-compress'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">이미지 용량 줄이기 · 크기 조절</h1>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        이미지는 서버로 전송되지 않고 브라우저 안에서만 처리됩니다. 한 번에 최대 {MAX_FILES}장, 장당 20MB까지 가능합니다.
      </p>

      <label
        htmlFor="compress-input"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
      >
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">클릭 or 드래그로</span> 이미지를 추가해주세요.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, WebP, GIF (여러 장 선택 가능)</p>
        <input id="compress-input" type="file" accept="image/*" multiple className="hidden" onChange={onFileChange} />
      </label>

      {files.length > 0 && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          선택한 이미지 {files.length}장 · 총 {formatBytes(files.reduce((sum, file) => sum + file.size, 0))}
        </p>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="output-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            저장 형식
          </label>
          <select
            id="output-type"
            value={type}
            onChange={(e) => setType(e.target.value as OutputType)}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="image/jpeg">JPG (용량 작음)</option>
            <option value="image/webp">WebP (용량 가장 작음)</option>
            <option value="image/png">PNG (투명 배경 유지, 화질 설정 없음)</option>
          </select>
        </div>
        <div>
          <label htmlFor="quality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            화질 {type === 'image/png' ? '(PNG는 적용 안 됨)' : `${quality}%`}
          </label>
          <input
            id="quality"
            type="range"
            min={10}
            max={100}
            step={5}
            value={quality}
            disabled={type === 'image/png'}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full mt-3"
          />
        </div>
        <div>
          <label htmlFor="max-width" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            최대 가로 크기(px)
          </label>
          <select
            id="max-width"
            value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value={0}>원본 크기 유지</option>
            <option value={3840}>3840 (4K)</option>
            <option value={1920}>1920 (FHD)</option>
            <option value={1280}>1280</option>
            <option value={800}>800</option>
            <option value={500}>500</option>
          </select>
        </div>
      </div>

      <div className="my-6 flex justify-center gap-3">
        <button
          onClick={onCompress}
          disabled={loading}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 disabled:opacity-50"
        >
          {loading ? '변환 중...' : '용량 줄이기'}
        </button>
        <button onClick={onReset} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200">
          초기화
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md bg-slate-100 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              {formatBytes(totalBefore)} → <span className="font-semibold">{formatBytes(totalAfter)}</span>
              {totalBefore > 0 && ` (${Math.round((1 - totalAfter / totalBefore) * 100)}% 감소)`}
            </p>
            <button onClick={onDownloadAll} className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">
              전체 ZIP 다운로드
            </button>
          </div>
          <ul className="space-y-3">
            {results.map((result) => {
              const diff = Math.round((1 - result.blob.size / result.originalSize) * 100);

              return (
                <li key={result.url} className="flex items-center gap-4 rounded-md border border-gray-200 p-3 dark:border-gray-700">
                  <img src={result.url} alt={result.name} className="h-16 w-16 rounded object-cover" />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="truncate font-medium text-gray-900 dark:text-white">{result.name}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {formatBytes(result.originalSize)} → {formatBytes(result.blob.size)}{' '}
                      <span className={diff > 0 ? 'text-sky-600' : 'text-red-500'}>({diff > 0 ? `${diff}% 감소` : `${-diff}% 증가`})</span> ·{' '}
                      {result.width}×{result.height}
                    </p>
                  </div>
                  <button
                    onClick={() => downloadBlob(result.blob, result.name)}
                    className="rounded-lg border border-sky-600 px-3 py-1.5 text-sm text-sky-600 hover:bg-sky-50"
                  >
                    다운로드
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <SEOContent page="imgCompress" />
      <Comment pathname="imgCompress" />
    </div>
  );
};

export default ImgCompress;
