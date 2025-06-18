import { PopoverContent } from '@/components/ui/popover';
import { useSearchFilterStore } from '@/stores/useSearchFilterStore';

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
  const { setSelectedSummary } = useSearchFilterStore();

  return (
    <PopoverContent className="w-auto p-4" align="center">
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(translations).map(([value, display]) => (
            <button
              key={value}
              onClick={() =>
                setSelectedSummary(selectedSummary === value ? '' : value)
              }
              className={`px-4 py-2 rounded-full border cursor-pointer ${
                selectedSummary === value
                  ? 'bg-primary text-white border-primary-400'
                  : 'text-[#D1B282] border-[#D1B282]'
              }`}
            >
              {display}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          닫기
        </button>
      </div>
    </PopoverContent>
  );
};
