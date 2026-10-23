import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import OutputField from '@components/common/OutputField';
import SEOContent from '@components/common/SEOContent';
import { smallButtonClass, textareaClass } from 'constants/ui';
import { useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { safeDecodeURIComponent } from 'utill/textTransform';

const UrlEncoded = () => {
  const [original, setOriginal] = useState<string>('');
  const input = original.trim();
  const decoded = safeDecodeURIComponent(input);

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="URL 인코더 / 디코더">
        텍스트나 URL을 입력하면 인코딩·디코딩 결과가 바로 표시됩니다. 한글, 공백, 특수문자가 들어간 주소를 변환할 때 사용하세요.
      </ToolHeader>

      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="original" className="text-sm font-medium text-gray-900 dark:text-white">
          변환할 텍스트 / URL
        </label>
        <button type="button" onClick={() => setOriginal('')} className={smallButtonClass}>
          초기화
        </button>
      </div>
      <textarea
        id="original"
        rows={5}
        className={textareaClass}
        placeholder="예: 서울 맛집 또는 %EC%84%9C%EC%9A%B8"
        value={original}
        onChange={(e) => setOriginal(e.target.value)}
      />

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <OutputField id="encoded" label="인코딩 결과 (encodeURIComponent)" value={input ? encodeURIComponent(input) : ''} rows={6} />
        <div>
          <OutputField id="decoded" label="디코딩 결과 (decodeURIComponent)" value={decoded.value} rows={6} />
          {decoded.error && (
            <p className="mt-1 text-xs text-red-500">올바른 퍼센트 인코딩 형식이 아니라 디코딩할 수 없습니다. (예: % 뒤에는 16진수 2자리)</p>
          )}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">인코딩이란?</h2>
        <p className="text-sm mb-5 leading-6 text-gray-500 dark:text-gray-400">
          사람이 인지할 수 있는 문자(언어)를 약속된 규칙에 따라 컴퓨터가 이해하는 언어 (0과 1)로 이루어진 코드로 바꾸는 것을 통틀어 일컫는다. 즉,
          인코딩 encoding이란 정해진 규칙에 따라 코드화, 암호화, 부호화하는 것을 말한다. 이렇게 인코딩을 하는 이유는 정보의 형태 표준화, 보안, 저장
          공간 절약 등을 위해서이다.
        </p>
        <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">디코딩이란?</h2>
        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          디코딩, decoding 이란 인코딩의 반대되는 개념으로 복호화, 역코드화의 의미를 가지고 있다. 저장 공간 효율화, 보안 등의 이유로 인코딩을 한
          데이터를 다시 디코딩을 해서 사용할 수 있다. 어떠한 특정 인코딩 방식으로 인코딩이 된 데이터를 동일한 방식으로 디코딩을 해주면 데이터를 읽어올
          수 있다. 즉 사람이 읽을수 있는 형태로 변환 해준다.
        </p>
      </section>

      <SEOContent page="urlEncoded" />
      <Comment pathname="UrlEncoded" />
    </div>
  );
};

export default UrlEncoded;
