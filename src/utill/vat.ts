export const VAT_RATE = 0.1;

// 공급가액에서 부가세(10%, 원 미만 절사)와 합계
export const vatFromSupply = (supply: number) => {
  const vat = Math.floor(supply * VAT_RATE);
  return { supply, vat, total: supply + vat };
};

// 부가세 포함 합계에서 역산: 부가세 = 합계 × 1/11 (원 미만 절사), 공급가액 = 합계 − 부가세
export const vatFromTotal = (total: number) => {
  const vat = Math.floor(total / 11);
  return { supply: total - vat, vat, total };
};
