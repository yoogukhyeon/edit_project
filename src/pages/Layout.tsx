import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div style={{ padding: '0 20px' }} className="max-w-4xl w-full mx-auto">
        <Header />
        <div style={{ margin: '20px 0 50px' }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
