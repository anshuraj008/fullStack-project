import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/ui/Footer';

const FooterLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default FooterLayout;
