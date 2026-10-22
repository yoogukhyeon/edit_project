import { LazyPage, lazyPage } from 'utill/lazyPage';

// 경로별 페이지. 각 페이지는 별도 청크로 분리되어 해당 페이지에 들어갈 때만 내려받는다.
export const pageRoutes: Record<string, LazyPage> = {
  '/': lazyPage(() => import('pages/Main')),
  '/pdf-view': lazyPage(() => import('pages/PdfView')),
  '/pdf-img': lazyPage(() => import('pages/PdfToimg')),
  '/img-png': lazyPage(() => import('pages/ImgToPng')),
  '/img-jpg': lazyPage(() => import('pages/ImgToJpg')),
  '/html-remove': lazyPage(() => import('pages/HtmlTagRemove')),
  '/text-convert': lazyPage(() => import('pages/TextConvert')),
  '/counter-char': lazyPage(() => import('pages/CounterChar')),
  '/make-qr': lazyPage(() => import('pages/MakeQr')),
  '/make-meta': lazyPage(() => import('pages/MetaTag')),
  '/my-ip': lazyPage(() => import('pages/MyIp')),
  '/lotto': lazyPage(() => import('pages/Lotto')),
  '/invest-lucky': lazyPage(() => import('pages/InvestLucky')),
  '/encode-decode': lazyPage(() => import('pages/UrlEncoded')),
  '/img-compress': lazyPage(() => import('pages/ImgCompress')),
  '/pdf-merge': lazyPage(() => import('pages/PdfMerge')),
  '/pdf-split': lazyPage(() => import('pages/PdfSplit')),
  '/age-calc': lazyPage(() => import('pages/AgeCalc')),
  '/d-day': lazyPage(() => import('pages/Dday')),
};

// 현재 경로의 페이지 코드를 미리 불러온다 (hydrate 전에 호출).
export const preloadPage = (pathname: string) => pageRoutes[pathname.replace(/\/+$/, '') || '/']?.preload() ?? Promise.resolve();
