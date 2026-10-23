// 투자 계산기 공용 계산 로직. 비율 값은 모두 소수(0.015% → 0.00015)로 받는다.

export type Lot = { price: number; qty: number };

// 물타기·평단가: 여러 번 나눠 산 평균 단가 (매수 수수료 포함 시 평단에 반영)
export const averagePrice = (lots: Lot[], buyFeeRate = 0) => {
  const valid = lots.filter((lot) => lot.price > 0 && lot.qty > 0);
  const totalQty = valid.reduce((sum, lot) => sum + lot.qty, 0);
  const totalCost = valid.reduce((sum, lot) => sum + lot.price * lot.qty * (1 + buyFeeRate), 0);
  return { totalQty, totalCost, avg: totalQty > 0 ? totalCost / totalQty : 0 };
};

// 목표 평단가를 만들려면 buyPrice에 몇 주를 더 사야 하는지. 불가능하면 null.
// (현재 평단과 매수가 사이에 목표 평단이 있어야 한다)
export const qtyForTargetAverage = (avg: number, qty: number, buyPrice: number, target: number) => {
  if (avg <= 0 || qty <= 0 || buyPrice <= 0 || target <= 0) return null;
  const between = (buyPrice < target && target < avg) || (buyPrice > target && target > avg);
  if (!between) return null;
  return (qty * (avg - target)) / (target - buyPrice);
};

export type Costs = { buyFeeRate: number; sellFeeRate: number; sellTaxRate: number };

// 매수·매도 수수료와 매도 시 세금을 반영한 순손익
export const tradeProfit = (buyPrice: number, sellPrice: number, qty: number, costs: Costs) => {
  const buyAmount = buyPrice * qty;
  const sellAmount = sellPrice * qty;
  const buyFee = buyAmount * costs.buyFeeRate;
  const sellFee = sellAmount * costs.sellFeeRate;
  const tax = sellAmount * costs.sellTaxRate;
  const invested = buyAmount + buyFee;
  const net = sellAmount - sellFee - tax - invested;
  return { buyAmount, sellAmount, fees: buyFee + sellFee, tax, invested, net, rate: invested > 0 ? net / invested : 0 };
};

// 목표 수익률(소수)을 얻기 위한 매도가. targetRate=0이면 손익분기 매도가.
export const sellPriceForReturn = (buyPrice: number, targetRate: number, costs: Costs) => {
  const keep = 1 - costs.sellFeeRate - costs.sellTaxRate;
  if (buyPrice <= 0 || keep <= 0) return 0;
  return (buyPrice * (1 + costs.buyFeeRate) * (1 + targetRate)) / keep;
};

export type SplitRow = {
  round: number;
  price: number;
  amount: number;
  qty: number;
  totalQty: number;
  totalAmount: number;
  avg: number;
  dropFromFirst: number;
};

// 분할매수 계획: 예산을 비중대로 나누고, 회차마다 dropRate만큼 낮은 가격에 산다.
// decimals: 수량 소수 자릿수 (주식 0, 코인 8 등). 수량은 내림 처리한다.
export const splitBuyPlan = (budget: number, firstPrice: number, weights: number[], dropRate: number, decimals = 0): SplitRow[] => {
  const ws = weights.filter((w) => w > 0);
  const weightSum = ws.reduce((sum, w) => sum + w, 0);
  if (budget <= 0 || firstPrice <= 0 || weightSum <= 0) return [];
  const unit = 10 ** decimals;

  let totalQty = 0;
  let totalAmount = 0;
  return ws.map((w, i) => {
    // 부동소수점 오차(8100.000000000001 등)를 없애기 위해 유효숫자 10자리로 정리
    const price = Number((firstPrice * (1 - dropRate) ** i).toPrecision(10));
    const qty = Math.floor(((budget * w) / weightSum / price) * unit) / unit;
    const amount = qty * price;
    totalQty += qty;
    totalAmount += amount;
    return {
      round: i + 1,
      price,
      amount,
      qty,
      totalQty,
      totalAmount,
      avg: totalQty > 0 ? totalAmount / totalQty : 0,
      dropFromFirst: price / firstPrice - 1,
    };
  });
};

// "1,1,2" 같은 비중 문자열을 숫자 배열로
export const parseWeights = (text: string) =>
  text
    .split(/[,\s:]+/)
    .map((v) => Number(v))
    .filter((v) => Number.isFinite(v) && v > 0);

// 손절·익절 가격과 손익비
export const stopTakeProfit = (entry: number, stopRate: number, takeRate: number, qty = 0) => {
  const stopPrice = entry * (1 - stopRate);
  const takePrice = entry * (1 + takeRate);
  return {
    stopPrice,
    takePrice,
    lossAmount: (entry - stopPrice) * qty,
    profitAmount: (takePrice - entry) * qty,
    riskReward: stopRate > 0 ? takeRate / stopRate : 0,
  };
};

// 감당할 최대 손실금액으로 살 수 있는 수량 (손절 시 손실이 maxLoss를 넘지 않게)
export const positionSizeForRisk = (entry: number, stopRate: number, maxLoss: number) => {
  const lossPerUnit = entry * stopRate;
  return lossPerUnit > 0 ? maxLoss / lossPerUnit : 0;
};

export type CompoundRow = { year: number; contributed: number; value: number; profit: number };

// 복리·적립식: 연 수익률을 12로 나눠 매월 복리, 적립금은 매월 말에 넣는다.
export const compoundGrowth = (initial: number, monthly: number, annualRate: number, years: number): CompoundRow[] => {
  const r = annualRate / 12;
  const rows: CompoundRow[] = [];
  let value = initial;
  let contributed = initial;
  // eslint-disable-next-line no-plusplus
  for (let month = 1; month <= Math.round(years * 12); month++) {
    value = value * (1 + r) + monthly;
    contributed += monthly;
    if (month % 12 === 0 || month === Math.round(years * 12)) {
      rows.push({ year: Math.ceil(month / 12), contributed, value, profit: value - contributed });
    }
  }
  return rows;
};

// 입력 문자열을 숫자로 (쉼표 허용). 가격·수량·비율은 음수가 될 수 없으므로 잘못된 값과 음수는 0으로 본다.
export const toNumber = (text: string) => {
  const n = Number(String(text).replace(/,/g, '').trim());
  return Number.isFinite(n) && n > 0 ? n : 0;
};
