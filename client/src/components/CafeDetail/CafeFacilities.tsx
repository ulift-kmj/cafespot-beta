import { facilitiesData } from '@/constants/facility';
import type { FacilityType } from '@/types';

interface Facility {
  is_available: boolean;
  facility_type: FacilityType;
}

interface CafeFacilitiesProps {
  facilities: Facility[];
}

function CafeFacilities({ facilities }: CafeFacilitiesProps) {
  const facilityMap = facilities.reduce((acc, facility) => {
    acc[facility.facility_type] = facility.is_available;
    return acc;
  }, {} as Record<FacilityType, boolean>);

  return (
    <div className="border-b-2 border-gray-100 pb-5">
      <h3 className="text-xl font-bold mb-4 text-darkBrown">Facilities</h3>
      <ul className="grid grid-cols-4 gap-6 p-5">
        {facilitiesData.map(({ key, label, icon: Icon }) => (
          <li
            key={key}
            className={`flex flex-col items-center gap-2 ${
              facilityMap[key as FacilityType]
                ? 'text-primary'
                : 'text-gray-300'
            }`}
          >
            <Icon size={24} />
            <span className="text-gray-800 whitespace-nowrap">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CafeFacilities;
