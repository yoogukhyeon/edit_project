import { countText } from './textCount';

test('한글과 영문이 섞인 문장', () => {
  const result = countText('안녕하세요. 저는 홍길동입니다!\nHello world 123.');
  expect(result.withSpaces).toBe(34);
  expect(result.withoutSpaces).toBe(29);
  expect(result.words).toBe(6);
  expect(result.sentences).toBe(3);
  expect(result.lines).toBe(2);
  expect(result.numbers).toBe(3);
  expect(result.symbols).toBe(3);
  expect(result.bytesUtf8).toBe(3 * 13 + 21);
  expect(result.bytesKr).toBe(13 * 2 + 20 + 2);
});

test('빈 문자열과 공백만 있는 경우', () => {
  expect(countText('')).toMatchObject({ withSpaces: 0, words: 0, sentences: 0, lines: 0 });
  expect(countText('   ')).toMatchObject({ withSpaces: 3, withoutSpaces: 0, words: 0, sentences: 0 });
});

test('이모지는 1자로 센다', () => {
  expect(countText('좋아요👍').withSpaces).toBe(4);
});

test('마침표 없는 마지막 문장과 연속 부호', () => {
  expect(countText('정말요?! 네 맞아요').sentences).toBe(2);
  expect(countText('버전 1.5를 씁니다.').sentences).toBe(1);
});
