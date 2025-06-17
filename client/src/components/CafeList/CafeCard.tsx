import { useFavorite } from '@/hooks/useFavorite';
import type { Cafe } from '@/types';
import { Link } from 'react-router';
import FavoriteButton from '@/components/commons/FavoriteButton';

interface CafeCardProps {
  cafe: Cafe;
}

export default function CafeCard({ cafe }: CafeCardProps) {
  const { isFavorite, toggleFavorite } = useFavorite();
  const favorite = isFavorite(cafe.id);

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFavorite(cafe);
  };

  return (
    <Link to={`/cafe/${cafe.id}`} className="flex flex-col">
      <div className="flex-col cursor-pointer group flex">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            src={cafe.photos[0].url}
            alt={cafe.name}
            loading="lazy"
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="font-semibold text-[15px] flex items-center justify-between">
          <span>{cafe.name}</span>
          <FavoriteButton
            favorite={favorite}
            onToggleFavorite={handleFavorite}
          />
        </div>
        <p className="font-light text-neutral-500 text-[14px]">
          {cafe.address}
        </p>
      </div>
    </Link>
  );
}
