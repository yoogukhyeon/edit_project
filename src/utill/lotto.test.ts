import { parseLottoHtml, winningNumbers } from './lottoData';
import { ballClass, countFrequency, generateGames, parseNumbers, validateOptions } from './lottoGen';

// 결정적인 난수 (테스트용)
const seeded = (seed: number) => () => {
  // eslint-disable-next-line no-param-reassign
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test('당첨번호 HTML 파싱', () => {
  const html = `<table><tbody>
    <tr><td> 1150 </td><td><a><div>3</div><div>8</div><div>15</div><div>22</div><div>31</div><div>44</div><div>+</div><div>9</div></a></td><td>12</td><td>2,000,000,000</td><td>2026.10.24</td></tr>
  </tbody></table>`;
  const rows = parseLottoHtml(html);
  expect(rows).toHaveLength(1);
  expect(rows[0].no).toBe('1150');
  expect(rows[0].bnusNo).toBe('9');
  expect(winningNumbers(rows[0])).toEqual([3, 8, 15, 22, 31, 44]);
});

test('생성 번호는 6개, 1~45, 중복 없음, 고정수 포함, 제외수 미포함', () => {
  const rand = seeded(42);
  const games = generateGames({ count: 200, fixed: [7, 14], exclude: [1, 2, 3], mode: 'random' }, rand);
  games.forEach((g) => {
    expect(g).toHaveLength(6);
    expect(new Set(g).size).toBe(6);
    expect(g.every((n) => n >= 1 && n <= 45)).toBe(true);
    expect(g).toEqual([...g].sort((a, b) => a - b));
    expect(g).toEqual(expect.arrayContaining([7, 14]));
    expect(g.some((n) => [1, 2, 3].includes(n))).toBe(false);
  });
});

test('많이 나온 번호 모드는 출현 빈도가 높은 번호를 더 자주 뽑는다', () => {
  const freq = countFrequency(Array.from({ length: 20 }, () => [1, 2, 3, 4, 5, 6]));
  const rand = seeded(7);
  const hits = (mode: 'hot' | 'cold') =>
    generateGames({ count: 300, fixed: [], exclude: [], mode, frequency: freq }, rand)
      .flat()
      .filter((n) => n <= 6).length;
  expect(hits('hot')).toBeGreaterThan(hits('cold') * 3);
});

test('옵션 검증, 입력 파싱, 공 색상', () => {
  expect(validateOptions({ fixed: [1, 2, 3, 4, 5, 6], exclude: [] })).toMatch('최대 5개');
  expect(validateOptions({ fixed: [5], exclude: [5] })).toMatch('동시에');
  expect(validateOptions({ fixed: [], exclude: Array.from({ length: 40 }, (_, i) => i + 1) })).toMatch('너무 많아');
  expect(validateOptions({ fixed: [1], exclude: [2] })).toBeNull();
  expect(parseNumbers('3, 7 15,,46 0 7')).toEqual([3, 7, 15]);
  expect(ballClass(10)).toContain('yellow');
  expect(ballClass(45)).toContain('green');
});
