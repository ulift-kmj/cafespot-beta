import AddressLink from '@/components/CafeDetail/AddressLink';
import { useFavorite } from '@/hooks/useFavorite';
import type { Cafe } from '@/types/cafe';
import { IoCopyOutline } from 'react-icons/io5';
import FavoriteButton from '@/components/commons/FavoriteButton';

interface CafeHeaderProps {
  cafe: Cafe;
}

function CafeHeader({ cafe }: CafeHeaderProps) {
  const { isFavorite, toggleFavorite } = useFavorite();

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
          <FavoriteButton
            favorite={isFavorite(cafe.id)}
            onToggleFavorite={() => toggleFavorite(cafe)}
          />
          <button
            onClick={copyLinkToClipboard}
            className="flex items-center gap-1 text-darkBrown hover:text-darkBrown transition cursor-pointer"
          >
            <IoCopyOutline size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CafeHeader;
