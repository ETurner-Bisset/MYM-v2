'use client';

import { SessionProvider } from 'next-auth/react';

import Dashboard from './Dashboard/Dashboard';
import Footer from './Footer';
import { PopupContextProvider } from '@/context/PopupContext';

const Layout = ({ children }) => {
  return (
    <SessionProvider>
      <PopupContextProvider>
        <Dashboard />
        {children}
        <Footer />
      </PopupContextProvider>
    </SessionProvider>
  );
};

export default Layout;
