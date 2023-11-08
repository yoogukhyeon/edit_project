import React, { ChangeEvent, useState } from 'react';

const Test = () => {
  const [img, setImg] = useState<string>('');

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    // eslint-disable-next-line no-useless-return
    if (files.length === 0) return;

    const file = files[0];

    if (file.type !== 'application/pdf') {
      alert('PDF 파일만 업로드 해주세요.');
      return;
    }

    const pdfBlob = await file.arrayBuffer();
    const pdfjslib = await import('pdfjs-dist/build/pdf');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

    pdfjslib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    try {
      const pdf = await pdfjslib.getDocument({ data: pdfBlob }).promise;

      const page = await pdf.getPage(1);

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: 1.0 });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      // 데이터를 인코딩된 문자열로 변환 (base64)
      const imgDataUrl = canvas.toDataURL('image/jpeg');

      setImg(imgDataUrl);
    } catch (err) {
      console.error('오류 PDF', err);
    }
  };

  return (
    <div>
      <div className="mb-3 w-96">
        <label htmlFor="formFileLg" className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
          PDF 파일 업로드
        </label>
        <input
          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          id="formFileLg"
          type="file"
          onChange={onFileChange}
        />
      </div>
      <div>
        <img className="h-auto max-w-full" src={img} alt="img" />
      </div>
    </div>
  );
};

export default Test;
