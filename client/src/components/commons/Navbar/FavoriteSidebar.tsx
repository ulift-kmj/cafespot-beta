import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useFavorite } from '@/hooks/useFavorite';
import type { Cafe } from '@/types/cafe';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router';
import SidebarToggleButton from '@/components/commons/Navbar/SidebarToggleButton';
import FavoriteButton from '../FavoriteButton';

export const FavoriteSidebar = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorite();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SidebarToggleButton onClick={() => setOpen(true)} />
      <SheetContent side="right" className="w-80 h-full bg-[#F8E1C3] p-0">
        <div className="flex items-center justify-center h-32">
          <SheetTitle className="text-2xl font-semibold text-[#B37E2E] flex items-center gap-1">
            My <FaHeart className="text-primary" /> Likes List
          </SheetTitle>
        </div>

        <ul className="flex-1 overflow-y-auto bg-white p-5">
          {favorites.length > 0 ? (
            favorites.map((favorite: Cafe) => (
              <li
                key={favorite.id}
                className="flex items-center justify-between mb-5"
              >
                <Link
                  to={`/cafe/${favorite.id}`}
                  className="text-gray-900 font-bold text-lg"
                  onClick={() => setOpen(false)}
                >
                  {favorite.name}
                </Link>
                <FavoriteButton
                  favorite={isFavorite(favorite.id)}
                  onToggleFavorite={() => toggleFavorite(favorite)}
                />
              </li>
            ))
          ) : (
            <li className="text-gray-600">찜한 카페가 없습니다.</li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
