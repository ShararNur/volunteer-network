import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <HashLoader />
        </div>
      }
    >
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
