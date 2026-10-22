// 단어마다 첫 글자를 대문자로 (나머지는 소문자)
export const toTitleCase = (text: string) => text.toLowerCase().replace(/(^|[\s\-_(["'])(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase());

// 문장마다 첫 글자를 대문자로 (나머지는 소문자)
export const toSentenceCase = (text: string) => text.toLowerCase().replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_, sep, ch) => sep + ch.toUpperCase());

// HTML 태그를 지우고 텍스트만 남긴다. 줄바꿈 태그는 줄바꿈으로 바꾸고 &amp; 같은 엔티티는 풀어준다.
export const stripHtml = (html: string, removeAllSpaces = false) => {
  const withBreaks = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n');
  const doc = new DOMParser().parseFromString(withBreaks, 'text/html');
  const text = (doc.body.textContent || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line, i, lines) => line || (i > 0 && lines[i - 1]))
    .join('\n')
    .trim();
  return removeAllSpaces ? text.replace(/\s+/g, '') : text;
};

// 잘못된 퍼센트 인코딩이 있어도 예외 없이 결과를 돌려준다.
export const safeDecodeURIComponent = (text: string): { value: string; error: boolean } => {
  try {
    return { value: decodeURIComponent(text), error: false };
  } catch (e) {
    return { value: '', error: true };
  }
};
