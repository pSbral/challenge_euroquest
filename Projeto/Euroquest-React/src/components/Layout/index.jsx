import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarUser from '../SidebarUser';

const Layout = () => {
  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
    <div className="w-1/5">
      <SidebarUser />
    </div>
    <div className="flex-1 p-6">
      <Outlet />
    </div>
  </div>
  );
};

export default Layout;
