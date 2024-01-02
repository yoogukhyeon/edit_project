import Alert from '@components/common/common/Alert';
import Button from '@components/common/common/Button';
import useAlert from '@hooks/useAlert';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { count } from 'letter-count';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import Comment from '@components/common/common/Comment';

const CounterChar = () => {
  const [text, setText] = useState<string>('');
  const [charVal, setCharVal] = useState<any>({});
  const [html, setHtml] = useAlert(false);
  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setText(value);
  }, []);

  const onReset = useCallback(() => {
    setText('');
  }, []);

  const calculateText = () => {
    if (text === '') {
      setHtml(true);
      return;
    }

    const result = count(text);
    toast.info('문장 계산을 완료했습니다.');
    setCharVal(result);
    setHtml(false);
  };

  return (
    <div>
      <SEOMetaTag
        title={'글자수 문자수 계산기'}
        description={
          '블로그 포스팅, SEO 최적화 글자수, 이력서, 자기소개서, 에세이 작성을 잘 하기 위해서 필요한 글자수세기, 문장수세시, 숫자수세기, 라인수세기, 특수문자수세기'
        }
        url={'https://webtool.everyday-365.com/counter-char'}
        imgsrc={'/images/meta.png'}
      />
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">글자수 문자수 계산기</p>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        붙여넣으신 문장 or 작성하신 문장에 글자수 문자수 숫자수 특수문자를 계산합니다.
      </p>
      <div className="grid w-full md:grid-cols-1">
        <div>
          <div className="flex justify-start items-center mb-3 gap-3">
            <label htmlFor="original" className="h-7 block text-sm font-medium text-gray-900 dark:text-white ">
              문장을 넣어 주세요
              <Button onReset={onReset} text="초기화" />
            </label>
          </div>
          {html && <Alert setValue={setHtml} text="문장을 넣어주세요." />}
          <textarea
            id="original"
            rows={10}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="문장을 입력 or 붙여넣기 해주세요."
            onChange={onChange}
            value={text}
          />
          <div className="my-5 text-center">
            <button
              onClick={calculateText}
              className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              계산하기
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-start items-start gap-3 max-sm:flex-col">
          <div className="max-sm:w-full">
            <label htmlFor="chars" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              문자수(공백포함)
            </label>
            <input
              type="text"
              id="chars"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              value={charVal?.chars || 0}
            />
          </div>
          <div className="max-sm:w-full">
            <label htmlFor="letters" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              글자수(공백제외)
            </label>
            <input
              type="text"
              id="letters"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              value={charVal?.letters || 0}
            />
          </div>
          <div className="max-sm:w-full">
            <label htmlFor="spaces" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              문장수
            </label>
            <input
              type="text"
              id="spaces"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              value={charVal?.spaces || 0}
            />
          </div>
          <div className="max-sm:w-full">
            <label htmlFor="words" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              단어수
            </label>
            <input
              type="text"
              id="words"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              value={charVal?.words || 0}
            />
          </div>
        </div>
        <div className="flex justify-start items-start gap-3 max-sm:flex-col mt-5">
          <div className="max-sm:w-full">
            <label htmlFor="lines" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              라인수
            </label>
            <input
              type="text"
              id="lines"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              value={charVal?.lines || 0}
            />
          </div>
          <div className="max-sm:w-full">
            <label htmlFor="numbers" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              숫자수
            </label>
            <input
              type="text"
              id="numbers"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              value={charVal?.numbers || 0}
            />
          </div>

          <div className="max-sm:w-full">
            <label htmlFor="wordsings" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              특수문자수
            </label>
            <input
              type="text"
              id="wordsings"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              value={charVal?.wordsigns || 0}
            />
          </div>
        </div>
      </div>
      <Comment pathname="counterChar" />
    </div>
  );
};

export default CounterChar;
