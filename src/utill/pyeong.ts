// 1평 = 400/121㎡ (사방 6자, 1자 = 10/33m) ≈ 3.305785㎡
export const SQM_PER_PYEONG = 400 / 121;

export const sqmToPyeong = (sqm: number) => sqm / SQM_PER_PYEONG;
export const pyeongToSqm = (pyeong: number) => pyeong * SQM_PER_PYEONG;

// 화면 표시용 반올림 (기본 소수 둘째 자리)
export const round = (n: number, digits = 2) => {
  const p = 10 ** digits;
  return Math.round(n * p) / p;
};

// 가격과 면적(㎡)으로 평당가·㎡당 가격
export const unitPrices = (price: number, sqm: number) =>
  sqm > 0 ? { perPyeong: price / sqmToPyeong(sqm), perSqm: price / sqm } : { perPyeong: 0, perSqm: 0 };
