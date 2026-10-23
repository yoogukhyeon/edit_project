import { useEffect, useState } from 'react';

type Fields = Record<string, string>;

// 계산기 입력값 상태. 공유 링크(URL 쿼리)에 값이 있으면 그 값으로, 없으면 지난번 입력값(localStorage)으로 시작한다.
export const useToolState = <T extends Fields>(storageKey: string, defaults: T) => {
  const [state, setState] = useState<T>(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = Object.keys(defaults).filter((key) => params.has(key));
    if (keys.length > 0) return { ...defaults, ...Object.fromEntries(keys.map((key) => [key, params.get(key) as string])) };
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return { ...defaults, ...JSON.parse(saved) };
    } catch (e) {
      // 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)이면 기본값 사용
    }
    return defaults;
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
      // 저장 실패는 무시
    }
  }, [storageKey, state]);

  const set = (key: keyof T) => (value: string) => setState((prev) => ({ ...prev, [key]: value }));
  const reset = () => setState(defaults);
  const shareUrl = () => `${window.location.origin}${window.location.pathname}?${new URLSearchParams(state).toString()}`;

  return { state, set, setState, reset, shareUrl };
};
