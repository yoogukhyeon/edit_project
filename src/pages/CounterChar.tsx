import Alert from '@components/common/common/Alert';
import useAlert from '@hooks/useAlert';
import React, { ChangeEvent, useCallback, useState } from 'react';

const CounterChar = () => {
  const [text, setText] = useState<string>('');
  const [html, setHtml] = useAlert(false);
  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(false);
    setText(event.target.value);
  }, []);

  return (
    <div>
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">글자수 문자수 계산기</p>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        붙여넣으신 문장 or 작성하신 문장에 글자수 문자수 숫자수 특수문자를 계산합니다.
      </p>
      <div className="grid w-full md:grid-cols-1">
        <div>
          <div className="flex justify-start items-center mb-3 gap-3">
            <label htmlFor="original" className="h-7 block text-sm font-medium text-gray-900 dark:text-white ">
              문장을 넣어 주세요
            </label>
          </div>
          {html && <Alert setValue={setHtml} text="HTML 소스를 넣어주세요." />}
          <textarea
            id="original"
            rows={10}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="문장을 입력 or 붙여넣기 해주세요."
            onChange={onChange}
            value={text}
          />
          <div className="mt-5 text-center">
            <button
              onClick={() => alert('123')}
              className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              변환하기
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-center items-start gap-3 max-sm:flex-col">
          <div className="max-sm:w-full">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              문자수
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="max-sm:w-full">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              단어수
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="max-sm:w-full">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              숫자수
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="max-sm:w-full">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              글자수
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
            />
          </div>
          <div className="max-sm:w-full">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              특수문자수
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterChar;
