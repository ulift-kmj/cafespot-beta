import { FavoriteContext } from '@/contexts/FavoriteContext';
import { useContext } from 'react';

export function useFavorite() {
  const ctx = useContext(FavoriteContext);
  if (!ctx)
    throw new Error('useFavorite must be used within a FavoriteProvider');
  return ctx;
}
