import {
  averagePrice,
  compoundGrowth,
  parseWeights,
  positionSizeForRisk,
  qtyForTargetAverage,
  sellPriceForReturn,
  splitBuyPlan,
  stopTakeProfit,
  toNumber,
  tradeProfit,
} from './invest';

const close = (a: number, b: number, digits = 6) => expect(a).toBeCloseTo(b, digits);

test('평단가', () => {
  const r = averagePrice([
    { price: 10000, qty: 10 },
    { price: 8000, qty: 10 },
    { price: 0, qty: 5 },
  ]);
  expect(r.totalQty).toBe(20);
  expect(r.avg).toBe(9000);
  close(averagePrice([{ price: 10000, qty: 1 }], 0.001).avg, 10010);
});

test('목표 평단 역산', () => {
  // 평단 10,000원 10주, 8,000원에 사서 평단 9,000원 만들기 → 10주
  close(qtyForTargetAverage(10000, 10, 8000, 9000) as number, 10);
  // 불타기: 평단 10,000원 10주, 14,000원에 사서 평단 12,000원 → 10주
  close(qtyForTargetAverage(10000, 10, 14000, 12000) as number, 10);
  expect(qtyForTargetAverage(10000, 10, 8000, 7000)).toBeNull();
  expect(qtyForTargetAverage(10000, 10, 8000, 10000)).toBeNull();
});

test('수익률과 손익분기', () => {
  const costs = { buyFeeRate: 0.001, sellFeeRate: 0.001, sellTaxRate: 0.002 };
  const r = tradeProfit(10000, 11000, 10, costs);
  close(r.fees, 100 + 110);
  close(r.tax, 220);
  close(r.net, 110000 - 110 - 220 - 100100);
  close(r.rate, r.net / 100100);
  const be = sellPriceForReturn(10000, 0, costs);
  close(tradeProfit(10000, be, 10, costs).net, 0, 4);
  const t = sellPriceForReturn(10000, 0.1, costs);
  close(tradeProfit(10000, t, 10, costs).rate, 0.1);
});

test('분할매수 계획', () => {
  const rows = splitBuyPlan(1000000, 10000, [1, 1, 2], 0.1, 0);
  expect(rows.map((r) => r.price)).toEqual([10000, 9000, 8100]);
  expect(rows.map((r) => r.qty)).toEqual([25, 27, 61]);
  close(rows[2].avg, rows[2].totalAmount / rows[2].totalQty);
  close(rows[2].dropFromFirst, -0.19);
  expect(splitBuyPlan(1000, 300, [1], 0, 2)[0].qty).toBe(3.33);
  expect(parseWeights('1, 1:2 x -1')).toEqual([1, 1, 2]);
});

test('손절·익절과 포지션 크기', () => {
  const r = stopTakeProfit(10000, 0.05, 0.15, 10);
  close(r.stopPrice, 9500);
  close(r.takePrice, 11500);
  close(r.lossAmount, 5000);
  close(r.riskReward, 3);
  close(positionSizeForRisk(10000, 0.05, 100000), 200);
});

test('복리 적립', () => {
  const rows = compoundGrowth(1000000, 100000, 0, 2);
  expect(rows).toHaveLength(2);
  expect(rows[1].value).toBe(3400000);
  const grow = compoundGrowth(1000000, 0, 0.12, 1);
  close(grow[0].value, 1000000 * 1.01 ** 12, 2);
  expect(toNumber('1,234.5')).toBe(1234.5);
  expect(toNumber('abc')).toBe(0);
  expect(toNumber('-5')).toBe(0);
});
