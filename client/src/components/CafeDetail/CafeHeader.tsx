import AddressLink from '@/components/CafeDetail/AddressLink';
import { useFavorite } from '@/hooks/useFavorite';
import type { Cafe } from '@/types/cafe';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoCopyOutline } from 'react-icons/io5';

interface CafeHeaderProps {
  cafe: Cafe;
}

function CafeHeader({ cafe }: CafeHeaderProps) {
  const { isFavorite, toggleFavorite } = useFavorite();

  console.log(cafe);

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/cafes/${cafe.id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      })
      .catch(() => {
        alert('링크 복사에 실패했습니다.');
      });
  };

  return (
    <div className="flex flex-col justify-between mt-7">
      <h2 className="text-3xl font-semibold text-darkBrown">{cafe.name}</h2>
      <div className="flex justify-between items-center mt-4">
        <AddressLink className="flex items-center text-darkBrown">
          {cafe.address}
        </AddressLink>
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleFavorite(cafe)}
            className="flex items-center gap-1 text-darkBrown hover:text-darkBrown transition cursor-pointer"
            title={
              isFavorite(cafe.id) ? 'Remove from Favorites' : 'Add to Favorites'
            }
          >
            {isFavorite(cafe.id) ? (
              <FaHeart size={22} className="text-darkBrown" />
            ) : (
              <FaRegHeart size={22} className="text-darkBrown" />
            )}
          </button>
          <button
            onClick={copyLinkToClipboard}
            className="flex items-center gap-1 text-darkBrown hover:text-darkBrown transition cursor-pointer"
            title="Copy Link"
          >
            <IoCopyOutline size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CafeHeader;
