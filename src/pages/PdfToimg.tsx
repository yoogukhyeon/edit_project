import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import JSZip from 'jszip';
import { ChangeEvent, DragEvent, useState } from 'react';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import { downloadBlob, formatBytes } from 'utill/getByteSize';

type Format = 'image/jpeg' | 'image/png';
type PageImage = { name: string; blob: Blob; url: string };

const MAX_SIZE = 1024 ** 2 * 50; // 50mb
const SCALES = [
  { value: 1.5, label: '보통 (빠름)' },
  { value: 2, label: '고화질' },
  { value: 3, label: '최고화질 (느림)' },
];

const toBlob = (canvas: HTMLCanvasElement, type: Format) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('blob'))), type, 0.92);
  });

const PdfToimg = () => {
  const [format, setFormat] = useState<Format>('image/jpeg');
  const [scale, setScale] = useState<number>(2);
  const [images, setImages] = useState<PageImage[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const ext = format === 'image/png' ? 'png' : 'jpg';

  const convert = async (file?: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('PDF 파일만 변환할 수 있습니다.');
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error('50MB 이하 PDF만 변환할 수 있습니다.');
      return;
    }

    images.forEach((image) => URL.revokeObjectURL(image.url));
    setImages([]);
    setFileName(file.name);
    const base = file.name.replace(/\.pdf$/i, '');

    try {
      // pdf.js는 용량이 커서 변환할 때만 불러온다.
      const pdfjslib = await import('pdfjs-dist/build/pdf');
      const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
      pdfjslib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      const pdf = await pdfjslib.getDocument({ data: await file.arrayBuffer() }).promise;

      const result: PageImage[] = [];
      setProgress({ done: 0, total: pdf.numPages });
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= pdf.numPages; i++) {
        // eslint-disable-next-line no-await-in-loop
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        // JPG는 투명 배경이 검게 나오므로 흰 배경을 먼저 칠한다.
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        // eslint-disable-next-line no-await-in-loop
        await page.render({ canvasContext: context, viewport }).promise;
        // eslint-disable-next-line no-await-in-loop
        const blob = await toBlob(canvas, format);
        result.push({ name: `${base}_${String(i).padStart(3, '0')}.${ext}`, blob, url: URL.createObjectURL(blob) });
        setProgress({ done: i, total: pdf.numPages });
      }
      setImages(result);
      toast.success(`${result.length}페이지를 이미지로 변환했습니다.`);
    } catch (error) {
      toast.error('PDF를 읽을 수 없습니다. 암호가 걸렸거나 손상된 파일인지 확인해주세요.');
    } finally {
      setProgress(null);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    convert(e.target.files?.[0]);
    e.target.value = '';
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    convert(e.dataTransfer.files[0]);
  };

  const onDownloadAll = async () => {
    const zip = new JSZip();
    images.forEach((image) => zip.file(image.name, image.blob));
    downloadBlob(await zip.generateAsync({ type: 'blob' }), `${fileName.replace(/\.pdf$/i, '') || 'pdf'}_images.zip`);
  };

  const optionClass = (active: boolean) =>
    `min-h-[36px] rounded-lg px-3 py-1.5 text-sm ${
      active ? 'bg-sky-600 text-white' : 'bg-slate-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200'
    }`;

  return (
    <div className="w-full">
      <SEOMetaTag />
      <ToolHeader title="PDF 이미지 변환">
        PDF를 선택하면 모든 페이지를 이미지로 바꿔 미리 보여드립니다. 파일은 서버로 전송되지 않고 브라우저에서만 처리됩니다.
      </ToolHeader>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-900 dark:text-white">형식</span>
        {(['image/jpeg', 'image/png'] as Format[]).map((value) => (
          <button key={value} type="button" onClick={() => setFormat(value)} className={optionClass(format === value)}>
            {value === 'image/png' ? 'PNG' : 'JPG'}
          </button>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">화질</span>
        {SCALES.map((option) => (
          <button key={option.value} type="button" onClick={() => setScale(option.value)} className={optionClass(scale === option.value)}>
            {option.label}
          </button>
        ))}
      </div>

      <label
        htmlFor="pdf-input"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 text-center hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {progress ? (
          <>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              변환 중... {progress.done} / {progress.total} 페이지
            </p>
            <div className="mt-3 h-2 w-2/3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
              <div
                className="h-full bg-sky-500 transition-all"
                style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">클릭 or 드래그로</span> PDF 파일을 선택해주세요.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">최대 50MB · 형식과 화질은 위에서 먼저 고르세요</p>
          </>
        )}
        <input id="pdf-input" type="file" accept=".pdf,application/pdf" className="hidden" disabled={!!progress} onChange={onFileChange} />
      </label>

      {images.length > 0 && (
        <div className="mt-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              <span className="font-semibold">{fileName}</span> · {images.length}페이지 · 총{' '}
              {formatBytes(images.reduce((sum, image) => sum + image.blob.size, 0))}
            </p>
            <button onClick={onDownloadAll} className="min-h-[36px] rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">
              전체 ZIP 다운로드
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {images.map((image, i) => (
              <li key={image.url} className="rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-600 dark:bg-slate-700/50">
                <img src={image.url} alt={`${i + 1}페이지`} className="aspect-[3/4] w-full rounded bg-white object-contain" loading="lazy" />
                <div className="mt-2 flex items-center justify-between gap-1">
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {i + 1}p · {formatBytes(image.blob.size)}
                  </span>
                  <button
                    onClick={() => downloadBlob(image.blob, image.name)}
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

      <SEOContent page="pdfToImg" />
      <Comment pathname="pdfToImg" />
    </div>
  );
};

export default PdfToimg;
