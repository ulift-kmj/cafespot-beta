// client/src/components/commons/Layout.tsx
import Navbar from '@/components/commons/Navbar';
import { FavoriteProvider } from '@/contexts/FavoriteProvider';
import { Outlet, useLocation } from 'react-router';

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <FavoriteProvider>
      <div className="w-full h-screen">
        {!isAdminRoute && <Navbar />}
        <Outlet />
      </div>
    </FavoriteProvider>
  );
};

export default Layout;
