import './polyfills'; // 반드시 최상단

import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { preloadPage } from './routes';

const app = (
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>
);

const rootElement = document.getElementById('root') as HTMLElement;

// 프리렌더된 HTML은 react-snap 직렬화 과정에서 인접 텍스트 노드가 합쳐져 hydrate가 항상 실패하고
// 결국 전체를 다시 그리게 된다. 그래서 hydrate 대신 바로 렌더링하되, 현재 페이지 청크를 먼저 받아
// 빈 화면(Suspense fallback)이 보이지 않도록 한다.
preloadPage(window.location.pathname).finally(() => {
  createRoot(rootElement).render(app);
});

reportWebVitals();
