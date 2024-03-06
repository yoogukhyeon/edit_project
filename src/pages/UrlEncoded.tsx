import Alert from '@components/common/common/Alert';
import Button from '@components/common/common/Button';
import Comment from '@components/common/common/Comment';
import Infor from '@components/common/common/Infor';
import useAlert from '@hooks/useAlert';
import React, { ChangeEvent, useCallback, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { copyFnc } from 'utill/copy';

const UrlEncoded = () => {
  const [original, setOriginal] = useState<string>('');

  const [html, setHtml] = useAlert(false);
  const [incodedCopy, setIncodedCopy] = useAlert(false);
  const [decodedCopy, setDecodedCopy] = useAlert(false);

  const [incodedUrl, setIncodedUrl] = useState('');
  const [decodedUrl, setDecodedUrl] = useState('');

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(false);
    setOriginal(event.target.value);
  }, []);

  const onReset = useCallback(() => {
    setOriginal('');
    setIncodedUrl('');
    setDecodedUrl('');
    setIncodedCopy(false);
    setDecodedCopy(false);
  }, []);

  const urlConvert = () => {
    if (original === '') {
      setHtml(true);
      return;
    }
    const result = original.trim();

    setIncodedUrl(encodeURIComponent(result));
    setDecodedUrl(decodeURIComponent(result));
  };

  const onClickCopy = useCallback(
    async (text: string) => {
      if (text === 'incoded') {
        setIncodedCopy(true);
        setDecodedCopy(false);
      } else {
        setIncodedCopy(false);
        setDecodedCopy(true);
      }

      copyFnc(text === 'incoded' ? incodedUrl : decodedUrl, text === 'incoded' ? setIncodedCopy : setDecodedCopy);
    },
    [incodedUrl, decodedUrl],
  );

  return (
    <div>
      <SEOMetaTag
        title={'URL 인코더 / 디코더'}
        description={
          '웹 개발에 필수적인 URL 인코딩은 더 이상 어렵지 않습니다. 간단하게 텍스트를 입력하고 이 무료 온라인 URL 인코딩 유틸리티로 안전한 데이터 전송을 위한 인코딩된 문자열을 생성해보세요!'
        }
        url={'https://webtool.everyday-365.com/encode-decode'}
        imgsrc={'/images/meta.png'}
      />
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">인코딩이란?</p>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        사람이 인지할 수 있는 문자(언어)를 약속된 규칙에 따라 컴퓨터가 이해하는 언어 (0과 1)로 이루어진 코드로 바꾸는 것을 통틀어 일컫는다. 즉, 인코딩
        encoding이란 정해진 규칙에 따라 코드화, 암호화, 부호화하는 것을 말한다. 이렇게 인코딩을 하는 이유는 정보의 형태 표준화, 보안, 저장 공간 절약
        등을 위해서이다.
      </p>
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">디코딩이란?</p>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        디코딩, decoding 이란 인코딩의 반대되는 개념으로 복호화, 역코드화의 의미를 가지고 있다. 저장 공간 효율화, 보안 등의 이유로 인코딩을 한
        데이터를 다시 디코딩을 해서 사용할 수 있다. 위에서 설명한 여러 인코딩 방식들이 있었는데 어떠한 특정 인코딩 방식으로 인코딩이 된 데이터를
        동일한 방식으로 디코딩을 해주면 데이터를 읽어올 수 있다. 즉 사람이 읽을수 있는 형태로 변환 해준다.
      </p>
      <br />
      <div className="mb-5">
        <div className="flex justify-start items-center mb-3 gap-3">
          <label htmlFor="original" className="h-7 block text-sm font-medium text-gray-900 dark:text-white ">
            URL 인코딩 텍스트를 붙여 넣습니다
            <Button onReset={onReset} text="초기화" />
          </label>
        </div>
        {html && <Alert setValue={setHtml} text="URL 인코딩하고자하는 텍스트를 넣어주세요." />}
        <textarea
          id="original"
          rows={13}
          className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="URL를 입력해주세요."
          onChange={onChange}
          value={original}
        />
      </div>
      <div className="my-5 text-center">
        <button
          onClick={urlConvert}
          className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center"
        >
          URL 변환
        </button>
      </div>
      <div className="grid w-full gap-6 md:grid-cols-2">
        <div>
          <div className="flex justify-start items-center mb-3 gap-3">
            <label htmlFor="incoded" className="h-7 block text-sm font-medium text-gray-900 dark:text-white ">
              URL <span className="text-orange-600">인코딩된</span> 문자
              <Button onReset={() => onClickCopy('incoded')} text="복사" />
            </label>
          </div>
          {incodedCopy && <Infor setValue={setIncodedCopy} text="복사를 완료했습니다." />}
          <textarea
            id="incoded"
            rows={13}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="인코딩 문자"
            readOnly
            value={incodedUrl}
          />
        </div>
        <div>
          <div className="flex justify-start items-center mb-3 gap-3">
            <label htmlFor="decoded" className="h-7 block text-sm font-medium text-gray-900 dark:text-white">
              URL <span className="text-orange-600">디코딩된</span> 문자
              <Button onReset={() => onClickCopy('decoded')} text="복사" />
            </label>
          </div>
          {decodedCopy && <Infor setValue={setDecodedCopy} text="복사를 완료했습니다." />}
          <textarea
            id="decoded"
            rows={13}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="디코딩 문자"
            readOnly
            value={decodedUrl}
          />
        </div>
      </div>

      <Comment pathname="UrlEncoded" />
    </div>
  );
};

export default UrlEncoded;
