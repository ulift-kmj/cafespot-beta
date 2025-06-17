import type { Cafe } from '@/types';
import { Link } from 'react-router';
import FavoriteButton from '@/components/commons/FavoriteButton';

interface FavoriteCafeListProps {
  favorites: Cafe[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (cafe: Cafe) => void;
  setOpen: (open: boolean) => void;
}

export default function FavoriteCafeList({
  favorites,
  isFavorite,
  toggleFavorite,
  setOpen,
}: FavoriteCafeListProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white p-5">
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite: Cafe) => (
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
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">찜한 카페가 없습니다.</p>
      )}
    </div>
  );
}
