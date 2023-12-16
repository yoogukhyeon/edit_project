import Alert from '@components/common/common/Alert';
import Button from '@components/common/common/Button';
import Infor from '@components/common/common/Infor';
import useAlert from '@hooks/useAlert';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { copyFnc } from 'utill/copy';

const TextConvert = () => {
  const [text, setText] = useState<string>('');
  const [textUpper, setTextUpper] = useState<string>('');
  const [textLower, setTextLower] = useState<string>('');
  const [textFirstUpper, setTextFirstUpper] = useState<string>('');
  const [copyUpper, setCopyUpper] = useAlert(false);
  const [copyLower, setCopyLower] = useAlert(false);
  const [copyFirstUpper, setCopyFirstUpper] = useAlert(false);
  const [html, setHtml] = useAlert(false);

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(false);
    setText(event.target.value);
  }, []);

  const onReset = useCallback(() => {
    setText('');
    setCopyUpper(false);
    setCopyLower(false);
    setCopyFirstUpper(false);
    setTextUpper('');
    setTextLower('');
    setTextFirstUpper('');
  }, []);
  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const convertText = () => {
    if (text === '') {
      setHtml(true);
      return;
    }
    const upper = text.toUpperCase();
    const lower = text.toLocaleLowerCase();
    const firstUpper = capitalize(text);
    setTextUpper(upper);
    setTextLower(lower);
    setTextFirstUpper(firstUpper);
  };

  const onClickCopy = useCallback(
    async (type?: string) => {
      if (type === 'textLower') {
        copyFnc(textLower, setCopyLower);
        setCopyUpper(false);
        setCopyFirstUpper(false);
      }
      if (type === 'textUpper') {
        copyFnc(textUpper, setCopyUpper);
        setCopyLower(false);
        setCopyFirstUpper(false);
      }
      if (type === 'textFirstUpper') {
        copyFnc(textFirstUpper, setCopyFirstUpper);
        setCopyUpper(false);
        setCopyLower(false);
      }
    },
    [textUpper, textUpper, textFirstUpper],
  );

  return (
    <div>
      <SEOMetaTag
        title={'영어 대문자 소문자 변환'}
        description={'영어 대문자 소문자 변환 - webtool.everyday-365.com'}
        url={'https://webtool.everyday-365.com/text-convert'}
        imgsrc={'/images/logo.png'}
      />
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">영어 대문자 소문자 변환</p>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        영어 스펠링 철자를 전부 대문자, 전부 소문자 또는 첫글자만 대문자 등으로 변환합니다.
      </p>
      <div className="grid w-full gap-6 md:grid-cols-2">
        <div>
          <div className="flex justify-start items-center mb-3 gap-3">
            <label htmlFor="original" className="h-7 block text-sm font-medium text-gray-900 dark:text-white ">
              영어문장
              <Button onReset={onReset} text="초기화" />
            </label>
          </div>
          {html && <Alert setValue={setHtml} text="HTML 소스를 넣어주세요." />}
          <textarea
            id="original"
            rows={17}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="영어문장을 입력해주세요."
            onChange={onChange}
            value={text}
          />
          <div className="mt-5 text-center">
            <button
              onClick={convertText}
              className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              변환하기
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-start items-center gap-3">
            <label htmlFor="lower" className={`${textLower === '' && 'pb-2'} pt-2 block  text-sm font-medium text-gray-900 dark:text-white`}>
              소문자
              {textLower !== '' && <Button onReset={onClickCopy} type="textLower" text="복사" isCopy={true} />}
            </label>
          </div>
          {copyLower && <Infor setValue={setCopyLower} text="복사를 완료했습니다." />}
          <textarea
            id="lower"
            rows={5}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="태그제거 결과"
            readOnly
            value={textLower}
          />
          <div className="flex justify-start items-center gap-3">
            <label htmlFor="upper" className={`${textUpper === '' && 'pb-2'} pt-2 block  text-sm font-medium text-gray-900 dark:text-white`}>
              대문자
              {textUpper !== '' && <Button onReset={onClickCopy} type="textUpper" text="복사" isCopy={true} />}
            </label>
          </div>
          {copyUpper && <Infor setValue={setCopyUpper} text="복사를 완료했습니다." />}
          <textarea
            id="upper"
            rows={5}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="태그제거 결과"
            readOnly
            value={textUpper}
          />
          <div className="flex justify-start items-center gap-3">
            <label
              htmlFor="first_upper"
              className={`${textFirstUpper === '' && 'pb-2'} pt-2 block  text-sm font-medium text-gray-900 dark:text-white`}
            >
              첫글자 대문자
              {textFirstUpper !== '' && <Button onReset={onClickCopy} type="textFirstUpper" text="복사" isCopy={true} />}
            </label>
          </div>
          {copyFirstUpper && <Infor setValue={setCopyFirstUpper} text="복사를 완료했습니다." />}
          <textarea
            id="first_upper"
            rows={5}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="태그제거 결과"
            readOnly
            value={textFirstUpper}
          />
        </div>
      </div>
    </div>
  );
};

export default TextConvert;
