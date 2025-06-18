// client/src/components/commons/Layout.tsx
import Footer from '@/components/commons/Footer';
import Navbar from '@/components/commons/Navbar';
import { FavoriteProvider } from '@/contexts/FavoriteProvider';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <FavoriteProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </FavoriteProvider>
  );
};

export default Layout;
