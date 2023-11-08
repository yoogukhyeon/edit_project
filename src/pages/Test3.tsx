import React, { ChangeEvent, useState } from 'react';

const Test2 = () => {
  const [convertedImg, setConvertedImg] = useState<string | null>(null);

  const convertToPNG = (file: File) => {
    // FlieReader 객체를 이용하여 업로드된 파일을 읽을 수 있다.
    // 비동기적으로 데이터를 읽어 file or blob 객체를 이용해 파일의 내용을 읽고 파싱할 수있다.
    const reader = new FileReader();

    /**
     * load 이벤트의 핸들러. 이 이벤트는 읽기 동작이 성공적으로 완료되었을 때마다 발생한다.
        비동기이므로 원하는 동작을 위해 CALLBACK 함수를 이용하는 것이 좋다.
     * 
     */
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;

          // 캔버스에 이미지를 그린다.
          ctx.drawImage(img, 0, 0);

          const pngDataUrl = canvas.toDataURL('image/jpeg');

          setConvertedImg(pngDataUrl);
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      // 이미지만 업로드 가능
      if (file.type.startsWith('image/')) {
        convertToPNG(file);
      } else {
        alert('이미지 파일만 업로드 해주세요.');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        {!convertedImg ? (
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
        ) : (
          <div>
            <img className="h-auto max-w-full" src={convertedImg} alt="img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Test2;
