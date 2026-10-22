export type TextCount = {
  withSpaces: number;
  withoutSpaces: number;
  words: number;
  sentences: number;
  lines: number;
  numbers: number;
  symbols: number;
  bytesUtf8: number;
  bytesKr: number;
};

// 한글을 포함한 문장의 글자 수를 센다. 이모지·한글 등은 코드 포인트 단위로 1자로 센다.
export const countText = (text: string): TextCount => {
  const chars = Array.from(text);
  const trimmed = text.trim();

  return {
    withSpaces: chars.length,
    withoutSpaces: chars.filter((c) => !/\s/.test(c)).length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    // 마침표·물음표·느낌표(연속 포함)로 끝나는 단위를 한 문장으로 보고, 마지막 문장은 부호가 없어도 센다.
    sentences: trimmed ? trimmed.split(/[.!?。]+(?:\s+|$)/).filter((s) => s.trim()).length : 0,
    lines: text ? text.split(/\r\n|\r|\n/).length : 0,
    numbers: chars.filter((c) => /[0-9]/.test(c)).length,
    symbols: chars.filter((c) => /[^\p{L}\p{N}\s]/u.test(c)).length,
    bytesUtf8: chars.reduce((sum, c) => {
      const code = c.codePointAt(0) as number;
      if (code < 0x80) return sum + 1;
      if (code < 0x800) return sum + 2;
      return sum + (code < 0x10000 ? 3 : 4);
    }, 0),
    // 자기소개서 사이트 등에서 쓰는 방식: 한글·전각 문자는 2바이트, 영문·숫자·공백은 1바이트, 줄바꿈은 2바이트(CRLF)
    bytesKr: chars.reduce((sum, c) => {
      if (c === '\n') return sum + 2;
      return sum + ((c.codePointAt(0) as number) > 127 ? 2 : 1);
    }, 0),
  };
};
