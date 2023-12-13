import Alert from '@components/common/common/Alert';
import Loading from '@components/common/common/Loading';
import useAlert from '@hooks/useAlert';
import React, { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import { convertToPNG } from 'utill/convertToImg';
import { getByteSize } from 'utill/getByteSize';

const ImgToJpg = () => {
  const [convertedImg, setConvertedImg] = useState<string | null>(null);
  const [oriFile, setOriFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileSize, setFileSize] = useAlert(false);
  const [fileType, setFileType] = useAlert(false);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files.length === 0) return;
    setLoading(true);

    if (files && files.length > 0) {
      const file = files[0];

      // 이미지만 업로드 가능
      if (file.type.startsWith('image/')) {
        // max
        const size = 1024 ** 2 * 5; // 5mb
        // 5mb 이하로 용량 체크
        if (files[0].size > size) {
          setFileSize(true);
          return;
        }
        setOriFile(file);
        convertToPNG(file, setConvertedImg, 'image/jpeg');
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        toast.error('이미지 파일만 업로드 해주세요.');
      }
    }
  };

  return (
    <div className="w-full">
      <SEOMetaTag title={'이미지 JPG 변환'} />
      {loading ? (
        <Loading />
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
            {fileSize && <Alert text="해당 파일은 제한된 용량을 초과하였습니다." setValue={setFileSize} />}
            {fileType && <Alert text="PDF 파일만 업로드 해주세요." setValue={setFileType} />}
          </div>
          {convertedImg ? (
            <>
              <div className="flex justify-center items-center">
                <img className="h-auto max-w-full" src={convertedImg} alt="img" />
              </div>

              <ul className="grid w-full gap-6 md:grid-cols-2 mt-6">
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
                    to={convertedImg}
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
                  style={{ height: '500px' }}
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
                      <span className="font-semibold">클릭 or 드래그로</span> 파일을 업로드 해주세요.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF </p>
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

export default ImgToJpg;
