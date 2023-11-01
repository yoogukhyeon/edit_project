import Footer from '@components/common/Footer';
import Header from '@components/common/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
