import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import JSZip from 'jszip';
import { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import { downloadBlob, formatBytes } from 'utill/getByteSize';

type Format = 'image/jpeg' | 'image/png';
type Result = { name: string; originalSize: number; blob: Blob; url: string };

const MAX_FILES = 30;
const MAX_SIZE = 1024 ** 2 * 30; // 30mb

const isHeic = (file: File) => /\.(heic|heif)$/i.test(file.name) || /image\/hei[cf]/.test(file.type);

const HeicToJpg = () => {
  const [format, setFormat] = useState<Format>('image/jpeg');
  const [results, setResults] = useState<Result[]>([]);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const ext = format === 'image/png' ? 'png' : 'jpg';

  const convert = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const files = Array.from(list).filter(isHeic);
    if (files.length !== list.length) toast.error('HEIC·HEIF 파일만 변환할 수 있습니다. 일반 이미지는 이미지 JPG 변환을 이용하세요.');
    const valid = files.filter((file) => file.size <= MAX_SIZE).slice(0, MAX_FILES);
    if (valid.length < files.length) toast.error(`장당 30MB 이하, 한 번에 최대 ${MAX_FILES}장까지 변환합니다.`);
    if (valid.length === 0) return;

    results.forEach((result) => URL.revokeObjectURL(result.url));
    setResults([]);
    setProgress({ done: 0, total: valid.length });

    // HEIC 디코더(약 1MB)는 변환할 때만 불러온다.
    const { default: heic2any } = await import('heic2any');
    const next: Result[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < valid.length; i++) {
      const file = valid[i];
      try {
        // eslint-disable-next-line no-await-in-loop
        const output = await heic2any({ blob: file, toType: format, quality: 0.92 });
        // 연속 촬영 등 여러 장이 들어있는 HEIC는 첫 장만 저장한다.
        const blob = Array.isArray(output) ? output[0] : output;
        next.push({ name: `${file.name.replace(/\.(heic|heif)$/i, '')}.${ext}`, originalSize: file.size, blob, url: URL.createObjectURL(blob) });
      } catch (error) {
        toast.error(`${file.name} 변환에 실패했습니다. 손상된 파일인지 확인해주세요.`);
      }
      setProgress({ done: i + 1, total: valid.length });
    }
    setResults(next);
    setProgress(null);
    if (next.length > 0) toast.success(`${next.length}장을 ${ext.toUpperCase()}로 변환했습니다.`);
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
    downloadBlob(await zip.generateAsync({ type: 'blob' }), `heic-to-${ext}.zip`);
  };

  const optionClass = (active: boolean) =>
    `min-h-[40px] rounded-lg px-4 py-2 text-sm font-medium ${
      active ? 'bg-sky-600 text-white' : 'bg-slate-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200'
    }`;

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="HEIC JPG 변환 · 아이폰 사진 변환">
        아이폰으로 찍은 HEIC 사진을 JPG·PNG로 바꿔드립니다. 여러 장을 한 번에 변환할 수 있고 사진은 서버로 전송되지 않습니다.
      </ToolHeader>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-900 dark:text-white">저장 형식</span>
        <button type="button" onClick={() => setFormat('image/jpeg')} className={optionClass(format === 'image/jpeg')}>
          JPG (용량 작음, 호환성 최고)
        </button>
        <button type="button" onClick={() => setFormat('image/png')} className={optionClass(format === 'image/png')}>
          PNG (무손실)
        </button>
      </div>

      <label
        htmlFor="heic-input"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 text-center hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {progress ? (
          <>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              변환 중... {progress.done} / {progress.total}장
            </p>
            <div className="mt-3 h-2 w-2/3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
              <div className="h-full bg-sky-500 transition-all" style={{ width: `${(progress.done / progress.total) * 100}%` }} />
            </div>
          </>
        ) : (
          <>
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">클릭 or 드래그로</span> HEIC 사진을 선택해주세요.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">.heic · .heif · 여러 장 선택 가능 · 장당 30MB, 최대 {MAX_FILES}장</p>
          </>
        )}
        <input
          id="heic-input"
          type="file"
          accept=".heic,.heif,image/heic,image/heif"
          multiple
          className="hidden"
          disabled={!!progress}
          onChange={onFileChange}
        />
      </label>

      {results.length > 0 && (
        <div className="mt-5">
          {results.length > 1 && (
            <div className="mb-3 text-right">
              <button
                onClick={onDownloadAll}
                className="min-h-[40px] rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
              >
                전체 ZIP 다운로드
              </button>
            </div>
          )}
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {results.map((result) => (
              <li key={result.url} className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-600 dark:bg-slate-700/50">
                <img src={result.url} alt={result.name} className="aspect-square w-full rounded bg-white object-cover" loading="lazy" />
                <p className="mt-2 truncate text-xs font-medium text-gray-900 dark:text-white">{result.name}</p>
                <div className="mt-1 flex items-center justify-between gap-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatBytes(result.originalSize)} → {formatBytes(result.blob.size)}
                  </span>
                  <button
                    onClick={() => downloadBlob(result.blob, result.name)}
                    className="min-h-[32px] rounded-md border border-sky-600 px-2 text-xs text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-700"
                  >
                    저장
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <SEOContent page="heicToJpg" />
      <Comment pathname="heicToJpg" />
    </div>
  );
};

export default HeicToJpg;
