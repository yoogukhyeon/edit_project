// SEO 콘텐츠(seoContent.ts)에 적힌 계산 예시가 실제 계산 결과와 맞는지 확인
import { compoundGrowth, positionSizeForRisk, splitBuyPlan } from './invest';

test('분할매수 예시: 1,000만원, 5만원, 균등 5회, 5% 간격', () => {
  const rows = splitBuyPlan(10000000, 50000, [1, 1, 1, 1, 1], 0.05, 0);
  expect(Math.round(rows[4].price)).toBe(40725);
  expect(Math.round(rows[4].avg)).toBe(45014); // 최종 평단가 약 45,000원대
});

test('복리 예시: 1,000만원 + 월 50만원, 연 7%, 10년', () => {
  const last = compoundGrowth(10000000, 500000, 0.07, 10).pop()!;
  expect(last.contributed).toBe(70000000);
  expect(Math.round(last.value / 10000)).toBe(10664); // 약 1억 664만원
});

test('손실 한도 예시: 10만원, 5만원, 5% → 40주', () => {
  expect(positionSizeForRisk(50000, 0.05, 100000)).toBeCloseTo(40);
});
