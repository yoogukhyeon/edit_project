import { pyeongToSqm, round, sqmToPyeong, unitPrices } from './pyeong';

test('평 ↔ ㎡ 환산', () => {
  expect(round(pyeongToSqm(1), 4)).toBe(3.3058);
  expect(round(sqmToPyeong(84))).toBe(25.41);
  expect(round(sqmToPyeong(59))).toBe(17.85);
  expect(round(sqmToPyeong(pyeongToSqm(32)), 6)).toBe(32);
});

test('평당가', () => {
  const r = unitPrices(1000000000, 84);
  expect(Math.round(r.perPyeong)).toBe(39354585);
  expect(Math.round(r.perSqm)).toBe(11904762);
  expect(unitPrices(1, 0).perPyeong).toBe(0);
});
