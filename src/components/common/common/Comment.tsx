import { createRef, useEffect, useRef } from 'react';

interface IProps {
  pathname: string;
}

export default function Comment({ pathname }: IProps) {
  const element = createRef<HTMLDivElement>();

  useEffect(() => {
    if (element.current === null) return;

    const utterances: HTMLScriptElement = document.createElement('script');

    const attributes: any = {
      src: 'https://utteranc.es/client.js',
      repo: 'yoogukhyeon/edit_project',
      'issue-term': pathname,
      label: 'Comment',
      theme: `github-light`,
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]: any) => {
      utterances.setAttribute(key, value);
    });

    element.current.appendChild(utterances);
  }, []);

  return (
    <div className="mt-5">
      <div ref={element} />
    </div>
  );
}
