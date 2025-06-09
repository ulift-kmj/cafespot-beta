export type FacilityType =
  | 'wifi'
  | 'parking'
  | 'bathroom'
  | 'petFriendly'
  | 'toGo'
  | 'delivery'
  | 'groupAvailable'
  | 'applePay';

export type SummaryType =
  | 'suburban'
  | 'large'
  | 'dessert'
  | 'rooftop'
  | 'bookCafe'
  | 'scenicView'
  | 'culturalComplex'
  | 'architectureTheme';

export type Cafe = {
  id: string;
  name: string;
  address: string;
  photos: string[];
  description: string;
  facilities: Partial<Record<FacilityType, boolean>>;
  summaries: Partial<Record<SummaryType, boolean>>;
};
