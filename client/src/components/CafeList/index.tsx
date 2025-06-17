import CafeCard from '@/components/CafeList/CafeCard';
import LoadingMore from '@/components/CafeList/LoadingMore';
import ErrorMessage from '@/components/commons/ErrorMessage';
import { useCafeList } from '@/hooks/useCafe';
import { useSearchFilterStore } from '@/stores/useSearchFilterStore';
import useDebounce from '@/hooks/useDebounce';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import type { CafeResponse } from '@/types';
import EmptyState from './EmptyState';
import CafeGrid from './CafeGrid';

export default function CafeList() {
  const { searchQuery, selectedSummary } = useSearchFilterStore();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useCafeList(10, debouncedSearchQuery, selectedSummary);

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const pages = (data?.pages ?? []) as CafeResponse[];
  const isEmpty = !pages.some((page) => page.data.length > 0);

  if (status === 'error') {
    return <ErrorMessage message="카페 목록을 불러오는데 실패했습니다." />;
  }

  return (
    <CafeGrid>
      {isEmpty ? (
        <EmptyState />
      ) : (
        pages.map((page) =>
          page.data.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} />)
        )
      )}

      <LoadingMore
        loadMoreRef={loadMoreRef}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </CafeGrid>
  );
}
