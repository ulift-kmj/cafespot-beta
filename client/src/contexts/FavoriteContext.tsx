import type { Cafe } from '@/types/cafe';
import { createContext } from 'react';

export interface FavoriteContextType {
  favorites: Cafe[];
  toggleFavorite: (cafe: Cafe) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);
