import { create } from 'zustand';

interface SearchFilterState {
  searchQuery: string;
  selectedSummary: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedSummary: (summary: string | null) => void;
  resetFilters: () => void;
}

export const useSearchFilterStore = create<SearchFilterState>((set) => ({
  searchQuery: '',
  selectedSummary: null,
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    // Update URL with query parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (query) {
      urlParams.set('query', query);
    } else {
      urlParams.delete('query');
    }
    window.history.replaceState(null, '', `/?${urlParams.toString()}`);
  },
  setSelectedSummary: (summary) => {
    set({ selectedSummary: summary });
    // Update URL with summary parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (summary) {
      urlParams.set('summary', summary);
    } else {
      urlParams.delete('summary');
    }
    window.history.replaceState(null, '', `/?${urlParams.toString()}`);
  },
  resetFilters: () => {
    set({ searchQuery: '', selectedSummary: null });
    // Clear URL parameters
    window.history.replaceState(null, '', '/');
  },
}));
