import { parsePageRange } from './pageRange';

test('범위, 단일, 열린 범위를 입력 순서대로 파싱한다', () => {
  expect(parsePageRange('1-3, 5, 8-', 10)).toEqual([0, 1, 2, 4, 7, 8, 9]);
  expect(parsePageRange('5, 1-2', 5)).toEqual([4, 0, 1]);
  expect(parsePageRange('2,2,1-2', 3)).toEqual([1, 0]);
});

test('잘못된 범위는 null', () => {
  expect(parsePageRange('', 5)).toBeNull();
  expect(parsePageRange('0', 5)).toBeNull();
  expect(parsePageRange('3-1', 5)).toBeNull();
  expect(parsePageRange('1-6', 5)).toBeNull();
  expect(parsePageRange('a', 5)).toBeNull();
});
