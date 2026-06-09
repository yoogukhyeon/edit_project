const SITE_URL = 'https://webtool.everyday-365.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/meta.png`;

const routes = [
  {
    path: '/',
    source: 'src/pages/Main.tsx',
    title: 'PDF 보기 | EVERYDAY 웹툴',
    description:
      '브라우저에서 PDF 파일을 바로 미리보기할 수 있는 무료 웹툴입니다. 설치 없이 PDF 문서를 열고 페이지 너비에 맞춰 확인하세요.',
    keywords: ['PDF 보기', 'PDF 미리보기', 'PDF 뷰어', '무료 PDF 도구'],
  },
  {
    path: '/pdf-img',
    source: 'src/pages/PdfToimg.tsx',
    title: 'PDF 이미지 변환 | EVERYDAY 웹툴',
    description: 'PDF 파일을 이미지로 변환하고 ZIP으로 내려받을 수 있는 무료 웹툴입니다. 설치 없이 브라우저에서 바로 변환하세요.',
    keywords: ['PDF 이미지 변환', 'PDF JPG 변환', 'PDF PNG 변환', 'PDF 이미지 추출'],
  },
  {
    path: '/img-png',
    source: 'src/pages/ImgToPng.tsx',
    title: '이미지 PNG 변환 | EVERYDAY 웹툴',
    description: 'JPG, GIF, SVG 등 이미지 파일을 PNG 형식으로 변환하는 무료 웹툴입니다. 파일을 선택하면 브라우저에서 바로 변환합니다.',
    keywords: ['이미지 PNG 변환', 'JPG PNG 변환', 'PNG 변환기', '무료 이미지 변환'],
  },
  {
    path: '/img-jpg',
    source: 'src/pages/ImgToJpg.tsx',
    title: '이미지 JPG 변환 | EVERYDAY 웹툴',
    description: 'PNG, GIF, SVG 등 이미지 파일을 JPG 형식으로 변환하는 무료 웹툴입니다. 설치 없이 빠르게 JPG 파일을 만들 수 있습니다.',
    keywords: ['이미지 JPG 변환', 'PNG JPG 변환', 'JPG 변환기', '무료 이미지 변환'],
  },
  {
    path: '/html-remove',
    source: 'src/pages/HtmlTagRemove.tsx',
    title: 'HTML 태그 제거기 | EVERYDAY 웹툴',
    description: 'HTML 문자열에서 태그를 제거하고 순수 텍스트만 추출하는 무료 웹툴입니다. 붙여넣기만 하면 바로 변환됩니다.',
    keywords: ['HTML 태그 제거', 'HTML 제거기', '태그 삭제', '텍스트 추출'],
  },
  {
    path: '/text-convert',
    source: 'src/pages/TextConvert.tsx',
    title: '영어 대문자 소문자 변환 | EVERYDAY 웹툴',
    description: '영어 문장을 대문자, 소문자, 첫 글자 대문자 형태로 변환하는 무료 온라인 텍스트 변환기입니다.',
    keywords: ['영어 대문자 변환', '소문자 변환', '대소문자 변환', '텍스트 변환'],
  },
  {
    path: '/counter-char',
    source: 'src/pages/CounterChar.tsx',
    title: '글자수 문자수 계산기 | EVERYDAY 웹툴',
    description: '입력한 글의 글자 수, 공백 포함 문자 수, 바이트 수를 빠르게 계산하는 무료 글자수 계산기입니다.',
    keywords: ['글자수 계산기', '문자수 계산', '바이트 계산', '텍스트 카운터'],
  },
  {
    path: '/make-qr',
    source: 'src/pages/MakeQr.tsx',
    title: 'QR코드 만들기 | EVERYDAY 웹툴',
    description: 'URL이나 텍스트를 입력해 나만의 QR코드를 생성하는 무료 웹툴입니다. 브라우저에서 바로 QR코드를 확인하세요.',
    keywords: ['QR코드 만들기', 'QR 생성기', '무료 QR코드', 'URL QR'],
  },
  {
    path: '/make-meta',
    source: 'src/pages/MetaTag.tsx',
    title: '메타태그 SEO 만들기 | EVERYDAY 웹툴',
    description: 'title, description, Open Graph, robots, canonical 정보를 입력해 SEO 메타태그를 생성하는 무료 웹툴입니다.',
    keywords: ['메타태그 만들기', 'SEO 태그', 'Open Graph 생성', '메타태그 생성기'],
  },
  {
    path: '/my-ip',
    source: 'src/pages/MyIp.tsx',
    title: '내 아이피 확인 | EVERYDAY 웹툴',
    description: '현재 접속한 기기의 IP 주소와 브라우저 User Agent 정보를 확인하는 무료 웹툴입니다.',
    keywords: ['내 아이피 확인', 'IP 주소 확인', '아이피 조회', 'User Agent 확인'],
  },
  {
    path: '/lotto',
    source: 'src/pages/Lotto.tsx',
    title: '로또 회차별 당첨번호 | EVERYDAY 웹툴',
    description: '최근 로또 회차별 당첨번호, 보너스 번호, 1등 당첨자 수, 1등 당첨금액, 발표일을 한눈에 확인하세요.',
    keywords: ['로또 당첨번호', '로또 회차별 당첨번호', '로또 번호 조회', '로또 1등'],
  },
  {
    path: '/invest-lucky',
    source: 'src/pages/InvestLucky.tsx',
    title: '오늘의 투자운세 | EVERYDAY 웹툴',
    description: '띠별 오늘의 투자운세를 가볍게 확인할 수 있는 무료 웹툴입니다.',
    keywords: ['오늘의 투자운세', '띠별 운세', '투자 운세'],
  },
  {
    path: '/encode-decode',
    source: 'src/pages/UrlEncoded.tsx',
    title: 'URL 인코더 디코더 | EVERYDAY 웹툴',
    description: 'URL 문자열을 인코딩하거나 디코딩하는 무료 웹툴입니다. 한글, 특수문자, 쿼리 문자열을 빠르게 변환하세요.',
    keywords: ['URL 인코딩', 'URL 디코딩', 'URL 인코더', '문자열 인코딩'],
  },
];

module.exports = {
  SITE_URL,
  DEFAULT_IMAGE,
  routes,
};
