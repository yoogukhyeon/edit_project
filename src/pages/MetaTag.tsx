import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import MetaInfo from '@components/common/common/MetaInfo';
import useAlert from '@hooks/useAlert';
import { script } from 'constants/metaTag';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';
import { useMetaStore } from 'store/metaStore';
import { copyFnc } from 'utill/copy';

export type CheckInfo = {
  key: string;
  isFocus: boolean;
};

export type Inputs = {
  title: string;
  desc: string;
  keyword: string;
  url: string;
  writer: string;
  curl: string;
};

const MetaTag = () => {
  const inputRef = useRef<any>(null);
  const [isCheckInfo, setIsCheckInfo] = useState<CheckInfo>({
    key: '',
    isFocus: false,
  });

  const { inputs, setInputs } = useMetaStore();

  const [rememberChk, setRememberChk] = useState<string>('Y');
  const [seoScript, setSeoScript] = useState<string>('');
  const [_, setCopySeo] = useAlert(false);

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs],
  );

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

  const onChangeCheckbox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      if (checked) {
        setRememberChk('Y');
      } else {
        setRememberChk('N');
      }
    },
    [rememberChk],
  );

  const onClickMakeTag = () => {
    const result = script(inputs, rememberChk);
    setSeoScript(result);
  };

  const onCopyMeta = () => {
    copyFnc(seoScript, setCopySeo);
    toast.info('SEO 메타태그를 복사했습니다.');
  };

  return (
    <div>
      <SEOMetaTag
        title={'메타태그(SEO) 만들기'}
        description={'EVERYDAY웹툴에서 SEO 메타 태그 생성기는 한 번의 클릭으로 웹 페이지에 대한 메타 태그를 생성하는 무료 SEO 도구입니다.'}
        url={'https://webtool.everyday-365.com/make-meta'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">메타태그(SEO) 만들기</h1>
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">meta tag 란?</p>
      <p className="mb-5 text-sm text-gray-500 whitespace-pre-line dark:text-gray-400">
        하이퍼텍스트(Hyper text) 생성 언어 HTML 문서의 맨 위쪽에 위치하는 태그(tag)로 HEAD 태그 사이 또는 뒤에 있어도 되지만 반드시 BODY 태그 앞쪽에
        위치해야 한다. 브라우저와 검색 엔진을 사용할 수 있도록 웹 문서의 정보를 포함하고 있다. 메타태그(meta tag)는 웹페이지(Web page)의 요약이므로
        상당히 중요하다고 할 수 있다.
      </p>
      <div className="grid w-full md:grid-cols-1">
        <div className={`mb-6 relative ${isCheckInfo?.key === 'title' ? 'overflow-visible' : 'overflow-hidden'}`}>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ⌨️ 제목
            <span className="ml-1 text-xs text-gray-500 whitespace-pre-line dark:text-gray-400">
              ★ 웹사이트 제목은 75자 미만이 SEO 최적화 글자 수 입니다.
            </span>
          </label>
          <input
            onChange={onChange}
            value={inputs.title}
            name="title"
            onFocus={(event) => onFocus(event)}
            onBlur={(event) => focusOut(event)}
            ref={inputRef}
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="사이트 제목을 입력해주세요. ex: SEO 태그 만들기"
            maxLength={70}
            required
            autoComplete="off"
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
              ⌨️ 설명
              <span className="ml-1 text-xs text-gray-500 whitespace-pre-line dark:text-gray-400">
                ★ 웹사이트 설명은 160자 미만이 SEO 최적화 글자 수 입니다.
              </span>
            </label>
            <textarea
              onChange={onChange}
              value={inputs.desc}
              onFocus={(event) => onFocus(event)}
              onBlur={(event) => focusOut(event)}
              name="desc"
              rows={3}
              id="desc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="사이트에 대해서 설명을 입력해주세요. ex: 다양한 스포츠 관련 소식을 공유하는....."
              maxLength={160}
              required
              autoComplete="off"
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
              ⌨️ 키워드 / 해시태그
              <span className="ml-1 text-xs text-gray-500 whitespace-pre-line dark:text-gray-400">
                ★ 키워드는 160자 미만이 SEO 최적화 글자 수 입니다.
              </span>
            </label>
            <textarea
              onChange={onChange}
              value={inputs.keyword}
              onFocus={(event) => onFocus(event)}
              onBlur={(event) => focusOut(event)}
              name="keyword"
              rows={3}
              id="keyword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="사이트 키워드를 입력해주세요. 예: 전자기기, 냉장고, 중고냉장고"
              maxLength={160}
              autoComplete="off"
            />
            <MetaInfo
              isCheckInfo={isCheckInfo}
              type={'keyword'}
              text={'키워드는 대부분의 검색 엔진에 영향을 미치지 않지만 해시 태그를 생성하는 데 사용합니다. ex: 옷, 겨울옷, 여름옷'}
            />
          </div>
        </div>
        <div className={`mb-6 relative ${isCheckInfo?.key === 'url' ? 'overflow-visible' : 'overflow-hidden'}`}>
          <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            🔗 URL
          </label>
          <input
            onChange={onChange}
            value={inputs.url}
            onFocus={(event) => onFocus(event)}
            onBlur={(event) => focusOut(event)}
            name="url"
            type="url"
            id="url"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="URL을 입력해주세요. ex: https://naver.com"
            required
            autoComplete="off"
          />
          <MetaInfo isCheckInfo={isCheckInfo} type={'url'} text={'서비스 사이트 URL입니다.'} />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className={`mb-6 relative ${isCheckInfo?.key === 'writer' ? 'overflow-visible' : 'overflow-hidden'}`}>
            <label htmlFor="writer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              👤 작성자
            </label>
            <input
              onChange={onChange}
              value={inputs.writer}
              onFocus={(event) => onFocus(event)}
              onBlur={(event) => focusOut(event)}
              name="writer"
              type="text"
              id="writer"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="운영자이름을 입력해주세요. ex: 홍길동"
              required
              autoComplete="off"
            />
            <MetaInfo isCheckInfo={isCheckInfo} type={'writer'} text={'사이트 운영자 이름을 입력해주세요.'} />
          </div>
          <div className={`mb-6 relative ${isCheckInfo?.key === 'curl' ? 'overflow-visible' : 'overflow-hidden'}`}>
            <label htmlFor="curl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              🔗 canonical URL
            </label>
            <input
              onChange={onChange}
              value={inputs.curl}
              onFocus={(event) => onFocus(event)}
              onBlur={(event) => focusOut(event)}
              name="curl"
              type="url"
              id="curl"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="canonical URL을 입력해주세요. ex: https://naver.com"
              required
              autoComplete="off"
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
              value={rememberChk}
              onChange={onChangeCheckbox}
              className="w-7 h-7 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              defaultChecked
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <span className="text-blue-600  dark:text-blue-500">검색 로봇 크롤링 허용</span>
          </label>
        </div>
      </div>
      <div className="mt-5 text-center space-x-4">
        <button
          onClick={onClickMakeTag}
          className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          🤖 메타 태그 생성
        </button>
        {seoScript !== '' && (
          <button
            onClick={onCopyMeta}
            className="inline-block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            🔗 메타 태그 복사
          </button>
        )}
      </div>
      <div className="flex p-4 my-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">{`${`HTML <meta> 태그 정의 및 특징`}`}:</span>
          <ul className="mt-1.5 space-y-1 list-disc list-inside max-sm:text-xs">
            <li>{`${`<meta> 태그는 해당 문서에 대한 정보인 메타데이터(metadata)를 정의할 때 사용합니다.`}`} </li>
            <li>{`${`이러한 <meta> 요소는 언제나 <head> 요소 내부에 위치해야 합니다.`}`}</li>
            <li>{`${`<meta> 요소는 <base>, <link>, <script>, <style>, <title> 요소와 같은 다른 메타데이터 관련 요소들이 나타낼 수 없는 다양한 종류의 메타데이터를 제공할 때 사용되며, 이렇게 제공된 정보는 브라우저나 검색 엔진, 다른 웹 서비스에서 사용하게 됩니다.`}`}</li>
          </ul>
        </div>
      </div>
      <div className="grid w-full md:grid-cols-1 mt-6">
        <label htmlFor="metatag" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
          📦 메타태그 출력
        </label>
        <textarea
          readOnly
          id="metatag"
          rows={23}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue={seoScript}
        />
      </div>
      <SEOContent page="metaTag" />
      <Comment pathname="metaTag" />
    </div>
  );
};

export default MetaTag;
