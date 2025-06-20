import FavoriteCafeList from '@/components/commons/FavoriteSidebar/FavoriteCafeList';
import SidebarToggleButton from '@/components/commons/Navbar/SidebarToggleButton';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useFavorite } from '@/hooks/useFavorite';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export const FavoriteSidebar = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorite();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SidebarToggleButton onClick={() => setOpen(true)} />
      <SheetContent side="right" className="w-80 h-full bg-[#F8E1C3] p-0">
        <div className="flex items-center justify-center h-32">
          <SheetTitle className="text-2xl font-semibold text-primary flex items-center gap-1">
            My <FaHeart className="text-primary" /> Likes List
          </SheetTitle>
        </div>

        <FavoriteCafeList
          favorites={favorites}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          setOpen={setOpen}
        />
      </SheetContent>
    </Sheet>
  );
};
