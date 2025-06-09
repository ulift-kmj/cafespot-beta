import {
  FaApple,
  FaDog,
  FaParking,
  FaRestroom,
  FaShoppingBag,
  FaTruck,
  FaUsers,
  FaWifi,
} from 'react-icons/fa';

interface Facility {
  is_available: boolean;
  facility_type: string;
}

interface CafeFacilitiesProps {
  facilities: Facility[];
}

const facilitiesData = [
  { key: 'wifi', label: 'WiFi', icon: FaWifi },
  { key: 'parking', label: 'Parking', icon: FaParking },
  { key: 'petFriendly', label: 'Pet-friendly', icon: FaDog },
  { key: 'bathroom', label: 'Bathroom', icon: FaRestroom },
  { key: 'toGo', label: 'To Go', icon: FaShoppingBag },
  { key: 'delivery', label: 'Delivery', icon: FaTruck },
  { key: 'groupAvailable', label: 'Groups', icon: FaUsers },
  { key: 'applePay', label: 'Apple Pay', icon: FaApple },
];

function CafeFacilities({ facilities }: CafeFacilitiesProps) {
  const facilityMap = facilities.reduce((acc, facility) => {
    acc[facility.facility_type] = facility.is_available;
    return acc;
  }, {} as Record<string, boolean>);

  return (
    <div className="border-b-2 border-gray-100 pb-5">
      <h3 className="text-xl font-bold mb-4 text-darkBrown">Facilities</h3>
      <ul className="grid grid-cols-4 gap-6 p-5">
        {facilitiesData.map(({ key, label, icon: Icon }) => (
          <li
            key={key}
            className={`flex flex-col items-center gap-2 ${
              facilityMap[key] ? 'text-primary' : 'text-[#E0E0E0]'
            }`}
          >
            <Icon size={24} />
            <span
              className={`text-gray-800 ${
                key === 'petFriendly' || key === 'applePay'
                  ? 'whitespace-nowrap'
                  : ''
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CafeFacilities;
