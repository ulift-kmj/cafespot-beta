import { useSearchFilterStore } from '@/stores/useSearchFilterStore';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router';

export const SearchBar = () => {
  const { setSearchQuery, selectedSummary, searchQuery } =
    useSearchFilterStore();

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/?query=${searchQuery}&summary=${selectedSummary}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="카페 이름 또는 주소를 입력하세요"
        className="w-full px-4 py-2 text-gray-500 border-b-2 border-primary focus:outline-none focus:border-b-2 focus:border-yellow-500 placeholder-gray-400"
      />
      <button
        onClick={handleSearch}
        className="absolute right-3 text-gray-500 hover:text-primary"
      >
        <IoSearch className="w-5 h-5" />
      </button>
    </div>
  );
};
