import MetaInfo from '@components/common/common/MetaInfo';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type CheckInfo = {
  key: string;
  isFocus: boolean;
};

const MetaTag = () => {
  const inputRef = useRef<any>(null);
  const [isCheckInfo, setIsCheckInfo] = useState<CheckInfo>({
    key: '',
    isFocus: false,
  });

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, []);

  const onFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLTextAreaElement, Element>) => {
      const { name } = event.target;

      setIsCheckInfo((prev) => ({
        ...prev,
        key: name,
        isFocus: true,
      }));
    },
    [isCheckInfo],
  );

  const focusOut = (event: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLTextAreaElement, Element>) => {
    setIsCheckInfo({ key: '', isFocus: false });
  };

  console.log(isCheckInfo);
  return (
    <div>
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">meta tag 란?</p>
      <p className="mb-5 text-sm text-gray-500 whitespace-pre-line dark:text-gray-400">
        하이퍼텍스트(Hyper text) 생성 언어 HTML 문서의 맨 위쪽에 위치하는 태그(tag)로 HEAD 태그 사이 또는 뒤에 있어도 되지만 반드시 BODY 태그 앞쪽에
        위치해야 한다. 브라우저와 검색 엔진을 사용할 수 있도록 웹 문서의 정보를 포함하고 있다. 메타태그(meta tag)는 웹페이지(Web page)의 요약이므로
        상당히 중요하다고 할 수 있다.
      </p>
      <div className="grid w-full md:grid-cols-1">
        <div className={`mb-6 relative ${isCheckInfo?.key === 'title' ? 'overflow-visible' : 'overflow-hidden'}`}>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            제목
          </label>
          <input
            name="title"
            onFocus={(event) => onFocus(event)}
            onBlur={(event) => focusOut(event)}
            ref={inputRef}
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe"
            required
          />
          <MetaInfo
            isCheckInfo={isCheckInfo}
            type={'title'}
            text={
              '연구에 따르면 제목이 50~60자이면 제목의 90%가 검색 엔진 결과에 제대로 표시될 수 있는 것으로 나타났습니다. 또한 브라우저 탭과 소셜 미디어 게시물의 제목 가시성을 고려하십시오. '
            }
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className={`relative ${isCheckInfo?.key === 'desc' ? 'overflow-visible' : 'overflow-hidden'}`}>
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              설명
            </label>
            <textarea
              onFocus={(event) => onFocus(event)}
              onBlur={(event) => focusOut(event)}
              name="desc"
              rows={3}
              id="desc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="설명을 입력해주세요."
              required
            />

            <MetaInfo
              isCheckInfo={isCheckInfo}
              type={'desc'}
              text={
                'SEO에는 영향을 미치지 않지만 소셜 미디어 게시물의 제목 아래에 사용됩니다. 최적의 길이: 50~160자. 이것이 광고 카피라고 상상하고 제목에 단어를 중복하지 마십시오. '
              }
            />
          </div>
          <div className={`relative ${isCheckInfo?.key === 'keyword' ? 'overflow-visible' : 'overflow-hidden'}`}>
            <label htmlFor="keyword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              키워드 / 해시태그
            </label>
            <textarea
              onFocus={(event) => onFocus(event)}
              onBlur={(event) => focusOut(event)}
              name="keyword"
              rows={3}
              id="keyword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123-45-678"
            />
            <MetaInfo
              isCheckInfo={isCheckInfo}
              type={'keyword'}
              text={'이는 대부분의 검색 엔진에 영향을 미치지 않지만 해시 태그를 생성하는 데 사용합니다. ex: 옷, 겨울옷, 여름옷'}
            />
          </div>
        </div>
        <div className={`mb-6 relative ${isCheckInfo?.key === 'url' ? 'overflow-visible' : 'overflow-hidden'}`}>
          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            URL
          </label>
          <input
            onFocus={(event) => onFocus(event)}
            onBlur={(event) => focusOut(event)}
            name="url"
            type="url"
            id="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="flowbite.com"
            required
          />
          <MetaInfo isCheckInfo={isCheckInfo} type={'url'} text={'서비스 사이트 URL입니다.'} />
        </div>
        <div className="grid gap-6  md:grid-cols-2">
          <div className={`mb-6 relative ${isCheckInfo?.key === 'writer' ? 'overflow-visible' : 'overflow-hidden'}`}>
            <label htmlFor="writer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              작성자
            </label>
            <input
              onFocus={(event) => onFocus(event)}
              onBlur={(event) => focusOut(event)}
              name="writer"
              type="text"
              id="writer"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="이름을 입력해주세요."
              required
            />
            <MetaInfo isCheckInfo={isCheckInfo} type={'writer'} text={'사이트 운영자 이름을 입력해주세요.'} />
          </div>
          <div className={`mb-6 relative ${isCheckInfo?.key === 'curl' ? 'overflow-visible' : 'overflow-hidden'}`}>
            <label htmlFor="curl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              canonical URL
            </label>
            <input
              onFocus={(event) => onFocus(event)}
              onBlur={(event) => focusOut(event)}
              name="curl"
              type="url"
              id="curl"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="canonical URL을 입력해주세요."
              required
            />
            <MetaInfo
              isCheckInfo={isCheckInfo}
              type={'curl'}
              text={'캐노니컬 태그란 사이트 내 대표가 되는 URL 주소를 알려주는 역할을 하는 태그입니다.'}
            />
          </div>
        </div>
        <div className="flex items-center mb-6 ">
          <div className="flex items-center ">
            <input
              id="remember"
              type="checkbox"
              value="Y"
              className="w-7 h-7 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
              defaultChecked
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <a href="#" className="text-blue-600  dark:text-blue-500">
              검색 로봇 크롤링 허용
            </a>
          </label>
        </div>
      </div>
      <div className="mt-5 text-center">
        <button
          onClick={() => alert('2133')}
          className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center"
        >
          메타 태그 생성
        </button>
      </div>
      <div className="grid w-full md:grid-cols-1 mt-6">
        <label htmlFor="metatag" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
          메타태그 출력
        </label>
        <textarea
          id="metatag"
          rows={20}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default MetaTag;
