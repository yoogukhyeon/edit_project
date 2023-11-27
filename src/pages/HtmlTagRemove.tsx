import Alert from '@components/common/common/Alert';
import Button from '@components/common/common/Button';
import Infor from '@components/common/common/Infor';
import useAlert from '@hooks/useAlert';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { copyFnc } from 'utill/copy';

const HtmlTagRemove = () => {
  const [original, setOriginal] = useState<string>('');
  const [convertTag, setConvertTag] = useState<string>('');
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [html, setHtml] = useAlert(false);
  const [copy, setCopy] = useAlert(false);

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(false);
    setOriginal(event.target.value);
  }, []);

  const onChangeCheckbox = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === 'Y') {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, []);

  const onReset = useCallback(() => {
    setOriginal('');
    setConvertTag('');
    setCopy(false);
  }, []);

  const removeHtmlTag = () => {
    if (original === '') {
      setHtml(true);
      return;
    }
    let result = original.replace(/(<([^>]+)>)/gi, '').trim();
    if (isCheck) result = result.replace(/(\s*)/g, '');
    setConvertTag(result);
  };

  const onClickCopy = useCallback(async () => {
    copyFnc(original, setCopy);
  }, [convertTag]);

  return (
    <div>
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">HTML 태그 제거기</p>
      <p className="text-sm mb-5 text-gray-500 whitespace-pre-line dark:text-gray-400">
        웹페이지는 html로 이루어져 있습니다. 소스보기를 해서 내용을 가져오고 싶을때가 있습니다. 그럴때 html tag 때문에 골치가 아픈데요.
        html태그제거앱을 이용하면 간단합니다. html소스를 넣고 버튼만 누르면 됩니다. 그러면 html이 없는 순수한 텍스트만 받을수 있습니다.
      </p>
      <div className="grid w-full gap-6 md:grid-cols-2">
        <div>
          <div className="flex justify-start items-center mb-3 gap-3">
            <label htmlFor="original" className="h-7 block text-sm font-medium text-gray-900 dark:text-white ">
              HTML 소스
              <Button onReset={onReset} text="초기화" />
            </label>
            <div className="flex items-center justify-center">
              <input
                onChange={onChangeCheckbox}
                id="default-checkbox"
                type="checkbox"
                value={isCheck ? 'N' : 'Y'}
                defaultChecked={false}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="default-checkbox" className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                줄띄움 제거
              </label>
            </div>
          </div>
          {html && <Alert setValue={setHtml} text="HTML 소스를 넣어주세요." />}
          <textarea
            id="original"
            rows={11}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="HTML 소스를 넣어주세요."
            onChange={onChange}
            value={original}
          />
        </div>
        <div>
          <div className="flex justify-start items-center mb-3 gap-3">
            <label htmlFor="new" className="h-7 block text-sm font-medium text-gray-900 dark:text-white">
              HTML 제거 결과
              {convertTag !== '' && <Button onReset={onClickCopy} text="복사" isCopy={true} />}
            </label>
          </div>
          {copy && <Infor setValue={setCopy} text="복사를 완료했습니다." />}
          <textarea
            id="new"
            rows={11}
            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="태그제거 결과"
            readOnly
            value={convertTag}
          />
        </div>
      </div>
      <div className="my-5 text-center">
        <button
          onClick={removeHtmlTag}
          className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center"
        >
          태그 제거
        </button>
      </div>
    </div>
  );
};

export default HtmlTagRemove;
