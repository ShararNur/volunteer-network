import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col md:flex-row min-h-screen w-full bg-slate-50">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
};

export default Layout;
