import type { FacilityType } from '@/types/cafe';
import {
  FaDog,
  FaTruck,
  FaShoppingBag,
  FaRestroom,
  FaUsers,
  FaApple,
  FaParking,
  FaWifi,
} from 'react-icons/fa';

export const facilityLabels: Record<FacilityType, string> = {
  wifi: '와이파이',
  parking: '주차',
  bathroom: '화장실',
  petFriendly: '반려동물',
  toGo: '포장',
  delivery: '배달',
  groupAvailable: '단체석',
  applePay: '애플페이',
};

export const facilitiesData = [
  { key: 'wifi', label: 'WiFi', icon: FaWifi },
  { key: 'parking', label: 'Parking', icon: FaParking },
  { key: 'petFriendly', label: 'Pet-friendly', icon: FaDog },
  { key: 'bathroom', label: 'Bathroom', icon: FaRestroom },
  { key: 'toGo', label: 'To Go', icon: FaShoppingBag },
  { key: 'delivery', label: 'Delivery', icon: FaTruck },
  { key: 'groupAvailable', label: 'Groups', icon: FaUsers },
  { key: 'applePay', label: 'Apple Pay', icon: FaApple },
];
