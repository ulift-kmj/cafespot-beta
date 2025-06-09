import CafeCard from '@/components/CafeList/CafeCard';
import ErrorMessage from '@/components/commons/ErrorMessage';
import LoadingSpinner from '@/components/commons/LoadingSpinner';
import { useCafeList } from '@/hooks/useCafe';
import { useSearchFilterStore } from '@/stores/useSearchFilterStore';
import type { Cafe } from '@/types';
import { useEffect, useRef } from 'react';

interface InfiniteCafeResponse {
  data: Cafe[];
  nextPage: number | null;
}

export default function CafeList() {
  const { searchQuery, selectedSummary } = useSearchFilterStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useCafeList(10, searchQuery, selectedSummary);

  const observerRef = useRef<IntersectionObserver>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const pages = (data?.pages ?? []) as InfiniteCafeResponse[];
  const isEmpty = !pages.some((page) => page.data.length > 0);

  if (status === 'error') {
    return <ErrorMessage message="카페 목록을 불러오는데 실패했습니다." />;
  }

  return (
    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {isEmpty ? (
        <div className="col-span-full text-center text-gray-400 py-12 text-lg">
          조건에 맞는 카페가 없습니다.
        </div>
      ) : (
        pages.map((page) =>
          page.data.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} />)
        )
      )}

      <div ref={loadMoreRef} className="col-span-full flex justify-center p-4">
        {isFetchingNextPage ? (
          <LoadingSpinner />
        ) : (
          hasNextPage && <div className="h-8"></div>
        )}
      </div>
    </div>
  );
}
