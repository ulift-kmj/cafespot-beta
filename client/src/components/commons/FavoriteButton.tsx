import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface FavoriteButtonProps {
  favorite: boolean;
  onToggleFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FavoriteButton = ({
  favorite,
  onToggleFavorite,
}: FavoriteButtonProps) => {
  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    onToggleFavorite(e);
  };

  return (
    <button
      className="p-1"
      aria-label={favorite ? '찜하기 해제' : '찜하기'}
      onClick={handleToggleFavorite}
    >
      {favorite ? (
        <AiFillHeart
          size={24}
          className="fill-primary transition-transform duration-200 hover:scale-110 cursor-pointer"
        />
      ) : (
        <AiOutlineHeart
          size={24}
          className="fill-neutral-500/70 transition-transform duration-200 hover:scale-110 cursor-pointer"
        />
      )}
    </button>
  );
};

export default FavoriteButton;
