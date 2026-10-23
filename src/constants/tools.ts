import { IconType } from 'react-icons';
import {
  TbCake,
  TbCalendarEvent,
  TbChartArrowsVertical,
  TbClover,
  TbCode,
  TbCut,
  TbFilePlus,
  TbFileTypeJpg,
  TbFileTypePdf,
  TbFileTypePng,
  TbLetterCase,
  TbLink,
  TbPhotoDown,
  TbPigMoney,
  TbQrcode,
  TbResize,
  TbShieldCheck,
  TbSparkles,
  TbStairsDown,
  TbTags,
  TbTextSize,
  TbTrendingUp,
  TbWorld,
} from 'react-icons/tb';

export type ToolLink = { path: string; title: string; desc: string; icon: IconType };

export type CategoryStyle = {
  text: string; // 카테고리 제목 글자색
  chip: string; // 카테고리 배지
  icon: string; // 아이콘 타일 배경
};

export type ToolCategory = { name: string; style: CategoryStyle; tools: ToolLink[] };

// Tailwind가 클래스를 찾을 수 있도록 색상 클래스는 문자열 그대로 둔다.
const STYLES: Record<string, CategoryStyle> = {
  rose: { text: 'text-rose-600 dark:text-rose-300', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300', icon: 'bg-rose-500' },
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-300',
    chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    icon: 'bg-emerald-500',
  },
  sky: { text: 'text-sky-600 dark:text-sky-300', chip: 'bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300', icon: 'bg-sky-500' },
  amber: {
    text: 'text-amber-600 dark:text-amber-300',
    chip: 'bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    icon: 'bg-amber-500',
  },
  indigo: {
    text: 'text-indigo-600 dark:text-indigo-300',
    chip: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    icon: 'bg-indigo-500',
  },
  violet: {
    text: 'text-violet-600 dark:text-violet-300',
    chip: 'bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    icon: 'bg-violet-500',
  },
};

// 헤더(PC)·모바일 메뉴·홈·페이지 헤더가 함께 쓰는 툴 목록
export const toolCategories: ToolCategory[] = [
  {
    name: 'PDF',
    style: STYLES.rose,
    tools: [
      { path: '/pdf-view', title: 'PDF 보기', desc: 'PDF 파일을 설치 없이 브라우저에서 열어보기', icon: TbFileTypePdf },
      { path: '/pdf-img', title: 'PDF 이미지 변환', desc: 'PDF 페이지를 고화질 JPG·PNG로 저장', icon: TbPhotoDown },
      { path: '/pdf-merge', title: 'PDF 합치기', desc: '여러 PDF를 원하는 순서로 하나로 병합', icon: TbFilePlus },
      { path: '/pdf-split', title: 'PDF 나누기', desc: '원하는 페이지만 추출하거나 분할', icon: TbCut },
    ],
  },
  {
    name: '이미지',
    style: STYLES.emerald,
    tools: [
      { path: '/img-compress', title: '이미지 용량 줄이기', desc: '사진 용량·크기를 줄여 여러 장 한 번에 압축', icon: TbResize },
      { path: '/img-png', title: '이미지 PNG 변환', desc: 'JPG, GIF 등을 PNG로 변환', icon: TbFileTypePng },
      { path: '/img-jpg', title: '이미지 JPG 변환', desc: 'PNG, GIF 등을 JPG로 변환', icon: TbFileTypeJpg },
    ],
  },
  {
    name: '텍스트',
    style: STYLES.sky,
    tools: [
      { path: '/counter-char', title: '글자수 계산기', desc: '공백 포함·제외 글자수와 바이트 계산', icon: TbTextSize },
      { path: '/text-convert', title: '대소문자 변환', desc: '대문자, 소문자, 첫 글자 대문자로 변환', icon: TbLetterCase },
      { path: '/html-remove', title: 'HTML 태그 제거기', desc: 'HTML 소스에서 텍스트만 추출', icon: TbCode },
      { path: '/encode-decode', title: 'URL 인코딩', desc: '한글·특수문자 URL 인코딩과 디코딩', icon: TbLink },
    ],
  },
  {
    name: '계산기',
    style: STYLES.amber,
    tools: [
      { path: '/age-calc', title: '만 나이 계산기', desc: '만 나이, 연 나이, 다음 생일까지 남은 날', icon: TbCake },
      { path: '/d-day', title: 'D-day 계산기', desc: 'D-day, 100일 기념일, N일 후 날짜', icon: TbCalendarEvent },
    ],
  },
  {
    name: '투자',
    style: STYLES.indigo,
    tools: [
      { path: '/avg-price', title: '물타기 계산기', desc: '평단가 계산, 목표 평단 만들 수량 역산', icon: TbStairsDown },
      { path: '/stock-profit', title: '수익률 계산기', desc: '수수료·세금 뺀 실제 손익과 손익분기 매도가', icon: TbTrendingUp },
      { path: '/split-buy', title: '분할매수 계산기', desc: '회차별 매수가·수량·평단가 계획표', icon: TbChartArrowsVertical },
      { path: '/stop-loss', title: '손절·익절 계산기', desc: '손절·익절가, 손익비, 적정 매수 수량', icon: TbShieldCheck },
      { path: '/compound', title: '복리 계산기', desc: '매월 적립 복리 투자의 연도별 자산', icon: TbPigMoney },
      { path: '/invest-lucky', title: '오늘의 투자운세', desc: '오늘의 재물·투자운 무료 확인', icon: TbSparkles },
    ],
  },
  {
    name: '기타',
    style: STYLES.violet,
    tools: [
      { path: '/make-qr', title: 'QR코드 만들기', desc: 'URL·텍스트·와이파이 QR코드 생성', icon: TbQrcode },
      { path: '/make-meta', title: '메타태그 만들기', desc: 'title, description, OG 태그 생성', icon: TbTags },
      { path: '/my-ip', title: '내 아이피 확인', desc: '내 공인 IP와 브라우저 정보 확인', icon: TbWorld },
      { path: '/lotto', title: '로또 당첨번호', desc: '회차별 로또 당첨번호와 1등 당첨금', icon: TbClover },
    ],
  },
];

// 경로로 툴과 카테고리를 찾는다 (끝 슬래시 무시)
export const findTool = (pathname: string) => {
  const path = pathname.replace(/\/+$/, '') || '/';
  // eslint-disable-next-line no-restricted-syntax
  for (const category of toolCategories) {
    const tool = category.tools.find((t) => t.path === path);
    if (tool) return { tool, category };
  }
  return null;
};
