// 퍼센트·할인율 계산. 계산할 수 없는 경우(0으로 나누기 등)는 null을 돌려준다.
const ok = (n: number) => (Number.isFinite(n) ? n : null);

// A의 B%
export const percentOf = (a: number, b: number) => ok((a * b) / 100);
// A는 B의 몇 %
export const whatPercent = (a: number, b: number) => (b === 0 ? null : ok((a / b) * 100));
// A → B로 바뀌면 몇 % 증가(+)·감소(-)
export const changeRate = (from: number, to: number) => (from === 0 ? null : ok(((to - from) / Math.abs(from)) * 100));
// A를 B% 올리거나(+) 내린(-) 값
export const applyRate = (a: number, rate: number) => ok(a * (1 + rate / 100));
// 정가와 판매가로 할인율
export const discountRate = (original: number, sale: number) => (original === 0 ? null : ok((1 - sale / original) * 100));
// 정가와 할인율로 판매가
export const salePrice = (original: number, rate: number) => ok(original * (1 - rate / 100));

// 퍼센트 계산기 입력: 쉼표 허용, 음수·소수 허용, 빈칸·잘못된 값은 null
export const parseValue = (text: string) => {
  const trimmed = String(text).replace(/,/g, '').trim();
  if (trimmed === '' || trimmed === '-') return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
};
