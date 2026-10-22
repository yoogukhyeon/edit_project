import JSZip from 'jszip';
import React, { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { downloadBlob, formatBytes } from 'utill/getByteSize';
import { compress, OutputType } from 'utill/imageCompress';

type Result = { name: string; originalSize: number; blob: Blob; url: string };

const MAX_FILES = 20;
const MAX_SIZE = 1024 ** 2 * 20; // 20mb

// 이미지 PNG/JPG 변환 페이지가 함께 쓰는 변환기. 선택하는 즉시 변환한다.
const ImageConverter = ({ type, ext }: { type: OutputType; ext: string }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const convert = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const images = Array.from(list).filter((file) => file.type.startsWith('image/'));
    if (images.length !== list.length) toast.error('이미지 파일만 변환할 수 있습니다.');
    const valid = images.filter((file) => file.size <= MAX_SIZE).slice(0, MAX_FILES);
    if (valid.length < images.length) toast.error(`20MB 이하 이미지만, 한 번에 최대 ${MAX_FILES}장까지 변환합니다.`);
    if (valid.length === 0) return;

    setLoading(true);
    const next: Result[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of valid) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const { blob } = await compress(file, type, 0.92, 0);
        next.push({ name: `${file.name.replace(/\.[^.]+$/, '')}.${ext}`, originalSize: file.size, blob, url: URL.createObjectURL(blob) });
      } catch (error) {
        toast.error(`${file.name} 변환에 실패했습니다.`);
      }
    }
    results.forEach((result) => URL.revokeObjectURL(result.url));
    setResults(next);
    setLoading(false);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    convert(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    convert(e.dataTransfer.files);
  };

  const onDownloadAll = async () => {
    const zip = new JSZip();
    results.forEach((result) => zip.file(result.name, result.blob));
    downloadBlob(await zip.generateAsync({ type: 'blob' }), `${ext}-images.zip`);
  };

  return (
    <div>
      <label
        htmlFor="convert-input"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">{loading ? '변환 중...' : '클릭 or 드래그로'}</span> {!loading && '이미지를 선택해주세요.'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, WebP, GIF, SVG · 여러 장 선택 가능 · 장당 20MB</p>
        <input id="convert-input" type="file" accept="image/*" multiple className="hidden" onChange={onFileChange} />
      </label>

      {results.length > 0 && (
        <div className="mt-5">
          {results.length > 1 && (
            <div className="mb-3 text-right">
              <button onClick={onDownloadAll} className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">
                전체 ZIP 다운로드
              </button>
            </div>
          )}
          <ul className="space-y-3">
            {results.map((result) => (
              <li
                key={result.url}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-600 dark:bg-slate-700/50"
              >
                <img
                  src={result.url}
                  alt={result.name}
                  className="h-16 w-16 rounded object-contain bg-[repeating-conic-gradient(#eee_0_25%,#fff_0_50%)] bg-[length:12px_12px]"
                />
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate font-medium text-gray-900 dark:text-white">{result.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {formatBytes(result.originalSize)} → {formatBytes(result.blob.size)}
                  </p>
                </div>
                <button
                  onClick={() => downloadBlob(result.blob, result.name)}
                  className="rounded-lg border border-sky-600 px-3 py-1.5 text-sm text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-700"
                >
                  다운로드
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
