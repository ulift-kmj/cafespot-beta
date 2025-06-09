import type { Cafe } from '@/types/cafe';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { FavoriteContext } from './FavoriteContext';

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Cafe[]>(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (cafe: Cafe) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === cafe.id);
      return exists
        ? prev.filter((item) => item.id !== cafe.id)
        : [...prev, cafe];
    });
  };

  const isFavorite = (id: string) => favorites.some((item) => item.id === id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
