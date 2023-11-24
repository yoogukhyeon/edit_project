import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div style={{ padding: '0 20px' }} className="max-w-4xl w-full mx-auto">
        <div role="status" className="space-y-8 animate-pulse w-full mt-10">
          <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700  mb-2.5 mx-auto"></div>
          <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700  mb-2.5 mx-auto"></div>
          <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700  mb-2.5 mx-auto"></div>
          <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700  mb-2.5 mx-auto"></div>
          <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-700  mb-2.5 mx-auto"></div>
          <div className="flex items-center w-full">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
            <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full max-w-[480px]">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div role="status" className="flex items-center justify-center h-56 w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
          </div>
          <div className="flex items-center w-full max-w-[400px]">
            <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
            <div className="h-5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>

        {/* <Header />
        <div style={{ margin: '20px 0 50px' }}>
          <Outlet />
        </div>
        <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
