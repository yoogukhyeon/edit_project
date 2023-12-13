import { CheckInfo } from 'pages/MetaTag';
import React from 'react';

interface IProps {
  text: string;
  type: string;
  isCheckInfo: CheckInfo;
}

const MetaInfo = ({ text, type, isCheckInfo }) => {
  return (
    <div
      className={`${
        isCheckInfo?.key === type ? 'h-16 p-3' : 'h-0 p-0'
      } z-10 w-full absolute left-0 bottom--5 flex items-center text-xs text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400`}
      role="alert"
      style={{
        overflow: 'hidden',
        transition: 'all 0.5s ease',
      }}
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>{text}</div>
    </div>
  );
};

export default React.memo(MetaInfo);
