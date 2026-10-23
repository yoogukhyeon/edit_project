import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import OutputField from '@components/common/OutputField';
import SEOContent from '@components/common/SEOContent';
import { smallButtonClass, textareaClass } from 'constants/ui';
import React, { useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { toSentenceCase, toTitleCase } from 'utill/textTransform';

const TextConvert = () => {
  const [text, setText] = useState<string>('');

  return (
    <div>
      <SEOMetaTag
        title={'영어 대문자 소문자 변환'}
        description={'영어 대문자에서 소문자로, 소문자에서 대문자로 변경할 수 있는 무료 온라인 대/소문자 변환기.'}
        url={'https://webtool.everyday-365.com/text-convert'}
        imgsrc={'/images/meta.png'}
      />
      <ToolHeader title="영어 대문자 소문자 변환">영어 문장을 입력하면 대문자, 소문자, 단어·문장 첫 글자 대문자로 바로 변환됩니다.</ToolHeader>

      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="original" className="text-sm font-medium text-gray-900 dark:text-white">
          영어 문장
        </label>
        <button type="button" onClick={() => setText('')} className={smallButtonClass}>
          초기화
        </button>
      </div>
      <textarea
        id="original"
        rows={6}
        className={textareaClass}
        placeholder="영어 문장을 입력 or 붙여넣기 해주세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <OutputField id="upper" label="대문자 (UPPER CASE)" value={text.toUpperCase()} />
        <OutputField id="lower" label="소문자 (lower case)" value={text.toLowerCase()} />
        <OutputField id="title" label="단어 첫 글자 대문자 (Title Case)" value={toTitleCase(text)} />
        <OutputField id="sentence" label="문장 첫 글자 대문자 (Sentence case)" value={toSentenceCase(text)} />
      </div>

      <SEOContent page="textConvert" />
      <Comment pathname="textConvert" />
    </div>
  );
};

export default TextConvert;
