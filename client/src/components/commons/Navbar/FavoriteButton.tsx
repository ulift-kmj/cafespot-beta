import { FaChevronDown, FaHeart } from 'react-icons/fa';

interface FavoriteButtonProps {
  onClick: () => void;
}

export const FavoriteButton = ({ onClick }: FavoriteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="font-medium bg-secondary text-primary flex items-center gap-1 px-4 py-3 rounded-lg"
    >
      My <FaHeart className="text-primary" />s List{' '}
      <FaChevronDown className="text-primary" />
    </button>
  );
};
