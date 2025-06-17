import LoadingSpinner from '@/components/commons/LoadingSpinner';

interface LoadingMoreProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

export default function LoadingMore({
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
}: LoadingMoreProps) {
  return (
    <div
      ref={loadMoreRef}
      className="col-span-full flex justify-center items-center p-4"
    >
      {isFetchingNextPage ? (
        <LoadingSpinner />
      ) : (
        hasNextPage && <LoadingSpinner />
      )}
    </div>
  );
}
