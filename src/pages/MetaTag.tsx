import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import OutputField from '@components/common/OutputField';
import SEOContent from '@components/common/SEOContent';
import { smallButtonClass, textareaClass } from 'constants/ui';
import { useToolState } from 'hooks/useToolState';
import SEOMetaTag from 'seo/SEOMetaTag';
import { buildMetaTags } from 'utill/metaTag';

const DEFAULTS = { title: '', desc: '', keyword: '', url: '', image: '', writer: '', index: 'Y' };

const inputClass =
  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white';

// 글자 수 안내 (권장 범위 안이면 초록, 넘으면 주황)
const Counter = ({ length, min, max }: { length: number; min: number; max: number }) => {
  let tone = 'text-gray-400';
  if (length > max) tone = 'text-orange-600';
  else if (length >= min) tone = 'text-emerald-600';
  return (
    <span className={`text-xs ${tone}`}>
      {length}자 · 권장 {min}~{max}자
    </span>
  );
};

type FieldProps = { id: keyof typeof DEFAULTS; label: string; hint?: string; placeholder: string; multiline?: boolean; range?: [number, number] };

const MetaTag = () => {
  const { state, set, reset } = useToolState('tool:make-meta', DEFAULTS);
  const output = buildMetaTags(state);

  const field = ({ id, label, hint, placeholder, multiline, range }: FieldProps) => (
    <div key={id}>
      <div className="mb-1 flex items-end justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        {range && <Counter length={state[id].trim().length} min={range[0]} max={range[1]} />}
      </div>
      {multiline ? (
        <textarea id={id} rows={3} value={state[id]} onChange={(e) => set(id)(e.target.value)} placeholder={placeholder} className={textareaClass} />
      ) : (
        <input id={id} value={state[id]} onChange={(e) => set(id)(e.target.value)} placeholder={placeholder} className={inputClass} />
      )}
      {hint && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    </div>
  );

  return (
    <div>
      <SEOMetaTag
        title={'메타태그(SEO) 만들기'}
        description={
          '제목, 설명, 대표 URL, 공유 이미지를 입력하면 title·description·canonical·Open Graph·Twitter 메타태그를 바로 만들어주는 무료 SEO 메타태그 생성기입니다.'
        }
        url={'https://webtool.everyday-365.com/make-meta'}
        imgsrc={'/images/meta.png'}
      />
      <ToolHeader title="메타태그(SEO) 만들기">
        값을 입력하면 아래에 메타태그가 바로 만들어집니다. 복사해서 HTML의 &lt;head&gt; 안에 붙여넣으세요.
      </ToolHeader>

      <div className="space-y-4">
        {field({
          id: 'title',
          label: '페이지 제목',
          placeholder: '예: 글자수 세기 - 무료 글자수 계산기',
          range: [15, 60],
          hint: '검색 결과에 표시되는 제목입니다. 핵심 키워드를 앞쪽에 넣으세요.',
        })}
        {field({
          id: 'desc',
          label: '페이지 설명',
          placeholder: '예: 공백 포함·제외 글자수와 바이트를 바로 계산하는 무료 도구입니다.',
          multiline: true,
          range: [50, 160],
          hint: '검색 결과 제목 아래 표시되는 요약입니다.',
        })}
        {field({
          id: 'keyword',
          label: '키워드 (선택)',
          placeholder: '예: 글자수 세기, 글자수 계산기, 바이트 계산',
          hint: '쉼표로 구분합니다. 구글은 keywords 태그를 순위에 반영하지 않습니다.',
        })}
        <div className="grid gap-4 md:grid-cols-2">
          {field({ id: 'url', label: '대표 URL (canonical)', placeholder: 'https://example.com/page' })}
          {field({
            id: 'image',
            label: '공유 이미지 URL (og:image)',
            placeholder: 'https://example.com/og.png',
            hint: '카카오톡·SNS 공유 시 보이는 이미지 (1200×630 권장)',
          })}
        </div>
        {field({ id: 'writer', label: '작성자 (선택)', placeholder: '예: 홍길동' })}
        <label className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200">
          <input
            type="checkbox"
            checked={state.index === 'Y'}
            onChange={(e) => set('index')(e.target.checked ? 'Y' : 'N')}
            className="h-5 w-5 rounded"
          />
          검색엔진 노출 허용 (index, follow)
        </label>
      </div>

      <div className="mt-6">
        <OutputField id="meta-output" label="만들어진 메타태그" value={output} rows={14} />
        <div className="mt-2 text-right">
          <button type="button" onClick={reset} className={smallButtonClass}>
            입력값 초기화
          </button>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">메타태그(meta tag)란?</h2>
        <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
          메타태그는 HTML 문서의 &lt;head&gt; 안에 넣는 정보로, 화면에는 보이지 않지만 검색엔진과 SNS가 페이지 제목, 설명, 대표 이미지를 파악하는 데
          사용합니다. title과 description은 검색 결과의 제목·요약으로, Open Graph 태그는 카카오톡·페이스북 공유 미리보기로 쓰입니다.
        </p>
      </section>

      <SEOContent page="metaTag" />
      <Comment pathname="metaTag" />
    </div>
  );
};

export default MetaTag;
