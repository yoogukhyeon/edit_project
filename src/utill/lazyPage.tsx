import { ComponentType, lazy, useState } from 'react';

type Loader = () => Promise<{ default: ComponentType }>;

export type LazyPage = ComponentType & { preload: () => Promise<void> };

// 페이지별 코드 분할용 lazy 컴포넌트.
// preload()로 미리 불러온 페이지는 바로 렌더링되므로 첫 화면에서 빈 화면이 보이지 않는다.
// 아직 불러오지 않은 페이지는 Layout의 Suspense에서 대기하는데, 페이지 이동이 transition으로
// 처리되므로(BrowserRouter v7_startTransition) 로딩 중에는 이전 페이지가 그대로 유지된다.
export const lazyPage = (loader: Loader): LazyPage => {
  let Loaded: ComponentType | null = null;
  const Lazy = lazy(loader);

  const preload = () =>
    loader().then((module) => {
      Loaded = module.default;
    });

  const Page = () => {
    // 마운트 시점에 한 번만 정한다. 렌더링 중간에 Lazy → Loaded로 바뀌면 페이지가 다시 마운트되어 입력값이 사라진다.
    const [Component] = useState<ComponentType>(() => Loaded ?? Lazy);
    return <Component />;
  };

  return Object.assign(Page, { preload });
};
