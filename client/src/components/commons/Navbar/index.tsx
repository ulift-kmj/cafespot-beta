import { FavoriteSidebar } from '@/components/commons/FavoriteSidebar';
import NavbarContainer from '@/components/commons/Navbar/NavbarContainer';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { summaryTranslations } from '@/constants/filter';
import { useSearchFilterStore } from '@/stores/useSearchFilterStore';
import { useState } from 'react';
import { PiSlidersHorizontal } from 'react-icons/pi';
import { Link } from 'react-router';
import { FilterModal } from './FilterModal';
import { SearchBar } from './SearchBar';

const Navbar = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { selectedSummary, resetFilters } = useSearchFilterStore();

  return (
    <NavbarContainer>
      <header className="flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-2" onClick={resetFilters}>
          <img
            src="/logo.png"
            alt="Cafe Spot Logo"
            className="w-60 h-30 -ml-12"
          />
        </Link>

        <div className="relative hidden md:flex items-center gap-2 mx-4 flex-1 justify-center">
          <SearchBar />

          <Popover open={showFilterModal} onOpenChange={setShowFilterModal}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 px-4 py-2 border border-primary text-primary rounded-full cursor-pointer whitespace-nowrap">
                {selectedSummary
                  ? summaryTranslations[
                      selectedSummary as keyof typeof summaryTranslations
                    ]
                  : '필터'}
                <PiSlidersHorizontal className="w-5 h-5" />
              </button>
            </PopoverTrigger>

            <FilterModal
              selectedSummary={selectedSummary || ''}
              translations={summaryTranslations}
              onClose={() => setShowFilterModal(false)}
            />
          </Popover>
        </div>

        <div className="relative flex items-center gap-4">
          <FavoriteSidebar />
        </div>
      </header>
    </NavbarContainer>
  );
};

export default Navbar;
