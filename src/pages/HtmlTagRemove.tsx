import Comment from '@components/common/common/Comment';
import OutputField from '@components/common/OutputField';
import SEOContent from '@components/common/SEOContent';
import { h1Class, leadClass, smallButtonClass, textareaClass } from 'constants/ui';
import React, { useMemo, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { stripHtml } from 'utill/textTransform';

const HtmlTagRemove = () => {
  const [original, setOriginal] = useState<string>('');
  const [removeSpaces, setRemoveSpaces] = useState<boolean>(false);
  const result = useMemo(() => stripHtml(original, removeSpaces), [original, removeSpaces]);

  return (
    <div>
      <SEOMetaTag
        title={'HTML 태그 제거기'}
        description={
          '웹페이지는 html로 이루어져 있어서 개발자모드에서 html 소스를 가져오고 싶을때가 있다. 그런 경우에 html tag를 지우고 정보만 필요한 경우 html태그제거앱을 이용하면 간단합니다. html 태그제거기를 활용해서 순수한 텍스트만 추출해서 사용할 수 있습니다.'
        }
        url={'https://webtool.everyday-365.com/html-remove'}
        imgsrc={'/images/meta.png'}
      />
      <h1 className={h1Class}>HTML 태그 제거기</h1>
      <p className={leadClass}>HTML 소스를 붙여넣으면 태그를 지우고 텍스트만 바로 추출합니다. 줄바꿈과 &amp;nbsp; 같은 특수문자도 정리됩니다.</p>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="original" className="text-sm font-medium text-gray-900 dark:text-white">
              HTML 소스
            </label>
            <button type="button" onClick={() => setOriginal('')} className={smallButtonClass}>
              초기화
            </button>
          </div>
          <textarea
            id="original"
            rows={14}
            className={textareaClass}
            placeholder="<p>HTML 소스를 붙여넣어 주세요.</p>"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
          />
        </div>
        <OutputField id="result" label="태그 제거 결과" value={result} rows={14} />
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
        <input type="checkbox" checked={removeSpaces} onChange={(e) => setRemoveSpaces(e.target.checked)} className="rounded" />
        공백과 줄바꿈까지 모두 제거
      </label>

      <SEOContent page="htmlTagRemove" />
      {/* 기존 댓글 스레드 유지를 위해 원래 키(오타 포함)를 그대로 사용 */}
      <Comment pathname="htemlTagRemove" />
    </div>
  );
};

export default HtmlTagRemove;
