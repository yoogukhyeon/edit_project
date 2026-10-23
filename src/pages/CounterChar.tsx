import { smallButtonClass } from 'constants/ui';
import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import React, { useMemo, useState } from 'react';
import SEOMetaTag from 'seo/SEOMetaTag';
import { countText } from 'utill/textCount';

const CounterChar = () => {
  const [text, setText] = useState<string>('');
  const result = useMemo(() => countText(text), [text]);

  const details: [string, number, string][] = [
    ['단어', result.words, '개'],
    ['문장', result.sentences, '개'],
    ['줄', result.lines, '줄'],
    ['숫자', result.numbers, '개'],
    ['특수문자', result.symbols, '개'],
    ['바이트 (UTF-8)', result.bytesUtf8, 'byte'],
    ['바이트 (한글 2byte)', result.bytesKr, 'byte'],
  ];

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="글자수 문자수 계산기">문장을 입력하거나 붙여넣으면 공백 포함·제외 글자수와 바이트 수가 바로 계산됩니다.</ToolHeader>

      <div className="mb-2 flex items-center justify-between">
        <label htmlFor="original" className="text-sm font-medium text-gray-900 dark:text-white">
          문장 입력
        </label>
        <button type="button" onClick={() => setText('')} className={smallButtonClass}>
          초기화
        </button>
      </div>
      <textarea
        id="original"
        rows={10}
        className="outline-none block p-3 w-full text-sm leading-6 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="문장을 입력 or 붙여넣기 해주세요."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-sky-50 p-4 text-center dark:bg-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-300">공백 포함</p>
          <p className="mt-1 text-2xl font-bold text-sky-700 dark:text-sky-300">{result.withSpaces.toLocaleString()}자</p>
        </div>
        <div className="rounded-lg bg-sky-50 p-4 text-center dark:bg-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-300">공백 제외</p>
          <p className="mt-1 text-2xl font-bold text-sky-700 dark:text-sky-300">{result.withoutSpaces.toLocaleString()}자</p>
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
        {details.map(([label, value, unit]) => (
          <div key={label} className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-700/50">
            <dt className="text-xs text-gray-500 dark:text-gray-400">{label}</dt>
            <dd className="font-semibold text-gray-900 dark:text-white">
              {value.toLocaleString()}
              <span className="ml-0.5 text-xs font-normal text-gray-500">{unit}</span>
            </dd>
          </div>
        ))}
      </dl>

      <SEOContent page="counterChar" />
      <Comment pathname="counterChar" />
    </div>
  );
};

export default CounterChar;
