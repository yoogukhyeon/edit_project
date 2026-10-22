import { safeDecodeURIComponent, stripHtml, toSentenceCase, toTitleCase } from './textTransform';

test('Title Case / Sentence case', () => {
  expect(toTitleCase('hello WORLD, nice-to meet "you"')).toBe('Hello World, Nice-To Meet "You"');
  expect(toSentenceCase('HELLO world. how ARE you? fine!')).toBe('Hello world. How are you? Fine!');
});

test('HTML 태그 제거', () => {
  expect(stripHtml('<p>Hello <b>world</b></p><p>a &amp; b<br>c</p><script>x()</script>')).toBe('Hello world\na & b\nc');
  expect(stripHtml('<div>가 나</div> <span>다</span>', true)).toBe('가나다');
});

test('잘못된 URL 디코딩은 error', () => {
  expect(safeDecodeURIComponent('%ED%95%9C%EA%B8%80')).toEqual({ value: '한글', error: false });
  expect(safeDecodeURIComponent('100%')).toEqual({ value: '', error: true });
});
