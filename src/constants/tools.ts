export type ToolLink = { path: string; title: string; desc: string };

export type ToolCategory = { name: string; tools: ToolLink[] };

// 헤더(PC)와 모바일 메뉴가 함께 쓰는 툴 목록
export const toolCategories: ToolCategory[] = [
  {
    name: 'PDF',
    tools: [
      { path: '/', title: 'PDF 보기', desc: 'PDF 파일을 설치 없이 브라우저에서 열어보기' },
      { path: '/pdf-img', title: 'PDF 이미지 변환', desc: 'PDF 페이지를 이미지로 바꿔 ZIP으로 저장' },
      { path: '/pdf-merge', title: 'PDF 합치기', desc: '여러 PDF를 원하는 순서로 하나로 병합' },
      { path: '/pdf-split', title: 'PDF 나누기', desc: '원하는 페이지만 추출하거나 분할' },
    ],
  },
  {
    name: '이미지',
    tools: [
      { path: '/img-compress', title: '이미지 용량 줄이기', desc: '사진 용량·크기를 줄여 여러 장 한 번에 압축' },
      { path: '/img-png', title: '이미지 PNG 변환', desc: 'JPG, GIF 등을 PNG로 변환' },
      { path: '/img-jpg', title: '이미지 JPG 변환', desc: 'PNG, GIF 등을 JPG로 변환' },
    ],
  },
  {
    name: '텍스트',
    tools: [
      { path: '/counter-char', title: '글자수 계산기', desc: '공백 포함·제외 글자수와 바이트 계산' },
      { path: '/text-convert', title: '영어 대소문자 변환', desc: '대문자, 소문자, 첫 글자 대문자로 변환' },
      { path: '/html-remove', title: 'HTML 태그 제거기', desc: 'HTML 소스에서 텍스트만 추출' },
      { path: '/encode-decode', title: 'URL 인코더 / 디코더', desc: '한글·특수문자 URL 인코딩과 디코딩' },
    ],
  },
  {
    name: '계산기',
    tools: [
      { path: '/age-calc', title: '만 나이 계산기', desc: '만 나이, 연 나이, 다음 생일까지 남은 날' },
      { path: '/d-day', title: 'D-day 계산기', desc: 'D-day, 100일 기념일, N일 후 날짜' },
    ],
  },
  {
    name: '기타',
    tools: [
      { path: '/make-qr', title: 'QR코드 만들기', desc: 'URL이나 텍스트로 QR코드 생성' },
      { path: '/make-meta', title: '메타태그(SEO) 만들기', desc: 'title, description, OG 태그 생성' },
      { path: '/my-ip', title: '내 아이피 확인', desc: '내 공인 IP와 브라우저 정보 확인' },
      { path: '/lotto', title: '로또 당첨번호', desc: '회차별 로또 당첨번호와 1등 당첨금' },
      { path: '/invest-lucky', title: '오늘의 투자운세', desc: '띠별 오늘의 투자운세' },
    ],
  },
];
