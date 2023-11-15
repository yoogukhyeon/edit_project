import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const Test = () => {
  const [img, setImg] = useState<string>('');
  const [oriFile, setOriFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const { files } = e.target;

    // eslint-disable-next-line no-useless-return
    if (files.length === 0) return;

    const file = files[0];
    setOriFile(file);

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
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error('오류 PDF', err);
    }
  };

  // eslint-disable-next-line consistent-return
  const getByteSize = (size: any) => {
    const byteUnits = ['KB', 'MB', 'GB', 'TB'];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteUnits.length; i++) {
      // eslint-disable-next-line no-param-reassign
      size = Math.floor(size / 1024);

      if (size < 1024) return size + byteUnits[i];
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="text-center">
          <button
            disabled
            type="button"
            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-10 h-10 me-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>
        </div>
      ) : (
        <>
          <div className="mb-3 w-full">
            <div className="flex flex-row items-center ">
              <input onChange={onFileChange} type="file" id="custom-input" hidden />
              <label
                htmlFor="custom-input"
                className="flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
              >
                파일을 선택해주세요.
              </label>
            </div>
          </div>
          {img ? (
            <>
              <div className="flex justify-center items-center">
                <img className="h-auto max-w-full" src={img} alt="img" />
              </div>

              <ul className="grid w-full gap-6 md:grid-cols-2">
                <li>
                  <div className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                      <div className="w-full text-lg font-semibold">{oriFile?.name}</div>
                      <div className="w-full pt-1">{getByteSize(oriFile?.size)}</div>
                      <div className="w-full pt-1">{oriFile?.type}</div>
                    </div>

                    <svg
                      className="w-7 h-7 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </div>
                </li>
                <li className="flex items-center justify-center">
                  <Link
                    className="flex items-center justify-center w-full h-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center "
                    to={img}
                    download="Example-PDF-document"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button>변환된 이미지 다운로드</button>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={onFileChange} />
                </label>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Test;
