import React, { useEffect } from 'react';

interface IProps {
  text: string;
  onReset: (type?: any) => void;
  isCopy?: boolean;
  type?: string;
}

const Button = ({ onReset, text, isCopy, type }: IProps) => {
  return (
    <>
      {!isCopy && (
        <button
          onClick={onReset}
          className="ml-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span className="relative px-2 py-1 text-xs transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {text}
          </span>
        </button>
      )}

      {isCopy && (
        <button
          onClick={type ? () => onReset(type) : onReset}
          className="ml-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
        >
          <span className="relative px-2 py-1 text-xs transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {text}
          </span>
        </button>
      )}
    </>
  );
};

export default React.memo(Button);
