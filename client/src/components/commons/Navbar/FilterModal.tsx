import { PopoverContent } from '@/components/ui/popover';
import { useSearchFilterStore } from '@/stores/useSearchFilterStore';
import { useState } from 'react';

interface FilterModalProps {
  selectedSummary: string;
  translations: Record<string, string>;
  onClose: () => void;
}

export const FilterModal = ({
  selectedSummary,
  translations,
  onClose,
}: FilterModalProps) => {
  const [inputSelectedSummary, setInputSelectedSummary] =
    useState(selectedSummary);
  const { setSelectedSummary } = useSearchFilterStore();

  const handleApply = () => {
    setSelectedSummary(inputSelectedSummary);
    onClose();
  };

  const handleCancel = () => {
    setInputSelectedSummary(selectedSummary);
    onClose();
  };

  return (
    <PopoverContent className="w-auto p-4" align="center">
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(translations).map(([value, display]) => (
            <button
              key={value}
              onClick={() =>
                setInputSelectedSummary((prev: string) =>
                  prev === value ? '' : value
                )
              }
              className={`px-4 py-2 rounded-full border cursor-pointer ${
                inputSelectedSummary === value
                  ? 'bg-primary text-white border-primary-400'
                  : 'text-[#D1B282] border-[#D1B282]'
              }`}
            >
              {display}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          취소
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-500 cursor-pointer"
        >
          적용하기
        </button>
      </div>
    </PopoverContent>
  );
};
