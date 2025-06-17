import { summaryLabels } from '@/constants';
import type { SummaryType } from '@/types/cafe';

interface CafeSummaryProps {
  summaries: { summary_type: SummaryType; is_available: boolean }[];
}

function CafeSummary({ summaries }: CafeSummaryProps) {
  return (
    <div className="border-b-2 border-gray-100 pb-5">
      <h3 className="text-xl font-bold mb-4 text-darkBrown">Summary</h3>
      <div className="flex flex-wrap gap-3">
        {summaries
          .filter((summary) => summary.is_available)
          .map(({ summary_type }) => (
            <span
              key={summary_type}
              className="bg-primary text-white px-3 py-1 rounded-[10px] font-semibold text-sm"
            >
              {summaryLabels[summary_type as SummaryType]}
            </span>
          ))}
      </div>
    </div>
  );
}

export default CafeSummary;
