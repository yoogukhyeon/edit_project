import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div style={{ padding: '0 20px' }} className="max-w-4xl w-full mx-auto mt-24 max-sm:mt-0">
        <Header />
        <main style={{ margin: '20px 0 20px' }}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
