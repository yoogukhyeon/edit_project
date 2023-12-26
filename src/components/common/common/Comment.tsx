import { useEffect, useRef } from 'react';

interface IProps {
  pathname: string;
}

export default function Comment({ pathname }: IProps) {
  const commentsEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptEl = document.createElement('script');
    scriptEl.async = true;
    scriptEl.src = 'https://utteranc.es/client.js';
    scriptEl.setAttribute('repo', 'yoogukhyeon/edit_project');
    scriptEl.setAttribute('issue-term', pathname);
    scriptEl.setAttribute('theme', 'github-light');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    commentsEl.current?.appendChild(scriptEl);
  }, []);

  return (
    <div className="mt-5">
      <div ref={commentsEl} />
    </div>
  );
}
