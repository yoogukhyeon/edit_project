import { ComponentType, lazy, Suspense } from 'react';

type Loader = () => Promise<{ default: ComponentType }>;

export type LazyPage = ComponentType & { preload: () => Promise<void> };

// 페이지별 코드 분할용 lazy 컴포넌트.
// preload()로 미리 불러온 페이지는 Suspense 없이 바로 렌더링되므로,
// 프리렌더된 HTML을 hydrate할 때 fallback 깜빡임이나 hydration 불일치가 생기지 않는다.
export const lazyPage = (loader: Loader): LazyPage => {
  let Loaded: ComponentType | null = null;
  const Lazy = lazy(loader);

  const preload = () =>
    loader().then((module) => {
      Loaded = module.default;
    });

  const Page = () => {
    if (Loaded) return <Loaded />;
    return (
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    );
  };

  return Object.assign(Page, { preload });
};
