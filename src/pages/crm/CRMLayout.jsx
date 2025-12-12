import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/crm/Sidebar';
import { Toaster } from '../../components/ui/sonner';

const CRMLayout = () => {
  return (
    <div className="flex h-screen bg-[rgb(17,17,19)]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
};

export default CRMLayout;