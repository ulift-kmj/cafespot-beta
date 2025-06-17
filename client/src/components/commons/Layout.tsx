// client/src/components/commons/Layout.tsx
import Navbar from '@/components/commons/Navbar';
import { FavoriteProvider } from '@/contexts/FavoriteProvider';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <FavoriteProvider>
      <div className="w-full h-screen">
        <Navbar />
        <Outlet />
      </div>
    </FavoriteProvider>
  );
};

export default Layout;
