export type ToolLink = { path: string; title: string };

export type ToolCategory = { name: string; tools: ToolLink[] };

// 헤더(PC)와 모바일 메뉴가 함께 쓰는 툴 목록
export const toolCategories: ToolCategory[] = [
  {
    name: 'PDF',
    tools: [
      { path: '/', title: 'PDF 보기' },
      { path: '/pdf-img', title: 'PDF 이미지 변환' },
      { path: '/pdf-merge', title: 'PDF 합치기' },
      { path: '/pdf-split', title: 'PDF 나누기' },
    ],
  },
  {
    name: '이미지',
    tools: [
      { path: '/img-compress', title: '이미지 용량 줄이기' },
      { path: '/img-png', title: '이미지 PNG 변환' },
      { path: '/img-jpg', title: '이미지 JPG 변환' },
    ],
  },
  {
    name: '텍스트',
    tools: [
      { path: '/counter-char', title: '글자수 계산기' },
      { path: '/text-convert', title: '영어 대소문자 변환' },
      { path: '/html-remove', title: 'HTML 태그 제거기' },
      { path: '/encode-decode', title: 'URL 인코더 / 디코더' },
    ],
  },
  {
    name: '계산기',
    tools: [
      { path: '/age-calc', title: '만 나이 계산기' },
      { path: '/d-day', title: 'D-day 계산기' },
    ],
  },
  {
    name: '기타',
    tools: [
      { path: '/make-qr', title: 'QR코드 만들기' },
      { path: '/make-meta', title: '메타태그(SEO) 만들기' },
      { path: '/my-ip', title: '내 아이피 확인' },
      { path: '/lotto', title: '로또 당첨번호' },
      { path: '/invest-lucky', title: '오늘의 투자운세' },
    ],
  },
];
