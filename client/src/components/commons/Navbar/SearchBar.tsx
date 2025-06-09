import { useSearchFilterStore } from '@/stores/useSearchFilterStore';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
  initialQuery?: string;
}

export const SearchBar = ({ initialQuery = '' }: SearchBarProps) => {
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const { setSearchQuery } = useSearchFilterStore();

  const handleSearchIconClick = () => {
    setSearchQuery(inputQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(inputQuery);
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-md">
      <input
        type="text"
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="카페 이름 또는 주소를 입력하세요"
        className="w-full px-4 py-2 text-gray-500 border-b-2 border-primary focus:outline-none focus:border-b-2 focus:border-yellow-500 placeholder-gray-400"
      />
      <button
        onClick={handleSearchIconClick}
        className="absolute right-3 text-gray-500 hover:text-primary"
      >
        <IoSearch className="w-5 h-5" />
      </button>
    </div>
  );
};
