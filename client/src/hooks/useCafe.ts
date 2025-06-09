import { cafeApi } from '@/api/cafeApi';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

const CAFE_KEYS = {
  all: ['cafes'] as const,
  list: (query: string | null, summary: string | null) =>
    [...CAFE_KEYS.all, 'list', query, summary] as const,
  detail: (id: string) => [...CAFE_KEYS.all, 'detail', id] as const,
};

export function useCafeList(
  pageSize: number = 10,
  query: string | null = null,
  summary: string | null = null
) {
  return useSuspenseInfiniteQuery({
    queryKey: CAFE_KEYS.list(query, summary),
    queryFn: ({ pageParam = 0 }) =>
      cafeApi.fetchCafeList({
        page: pageParam,
        pageSize,
        query,
        summary,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
}

export function useCafeDetail(id: string) {
  return useQuery({
    queryKey: CAFE_KEYS.detail(id),
    queryFn: () => cafeApi.fetchCafeById(id),
    enabled: !!id,
  });
}

export function useCafeCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cafeApi.createCafe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAFE_KEYS.list(null, null) });
    },
  });
}

export function useCafeUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cafeApi.updateCafe,
    onSuccess: (updatedCafe) => {
      queryClient.invalidateQueries({ queryKey: CAFE_KEYS.list(null, null) });
      queryClient.invalidateQueries({
        queryKey: CAFE_KEYS.detail(updatedCafe.id),
      });
    },
  });
}

export function useCafeDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cafeApi.deleteCafe,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: CAFE_KEYS.list(null, null) });
      queryClient.invalidateQueries({ queryKey: CAFE_KEYS.detail(deletedId) });
    },
  });
}
