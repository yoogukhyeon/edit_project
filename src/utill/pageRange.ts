// "1-3, 5, 8-" 형식의 페이지 범위를 0부터 시작하는 페이지 인덱스 배열로 변환한다.
// 잘못된 입력이면 null을 반환한다.
export const parsePageRange = (input: string, pageCount: number): number[] | null => {
  const parts = input
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0) return null;

  const pages: number[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const part of parts) {
    const match = part.match(/^(\d+)?\s*(-)?\s*(\d+)?$/);
    if (!match || (!match[1] && !match[3])) return null;

    const start = match[1] ? Number(match[1]) : 1;
    let end = start;
    if (match[2]) end = match[3] ? Number(match[3]) : pageCount;
    if (start < 1 || end > pageCount || start > end) return null;

    // eslint-disable-next-line no-plusplus
    for (let page = start; page <= end; page++) {
      if (!pages.includes(page - 1)) pages.push(page - 1);
    }
  }

  return pages;
};
