import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import TopBanner from '../layout/TopBanner';
import CartDrawer from '../cart/CartDrawer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default MainLayout;
