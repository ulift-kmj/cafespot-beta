import type { Cafe } from '@/types';
import supabase from '@/utils/supabase';

// Supabase 원본 데이터 타입
// photos: { url: string }[]
// summaries: { summary_type: string; is_available: boolean }[]
type CafeDb = Omit<Cafe, 'photos' | 'summaries'> & {
  photos: { url: string }[];
  summaries: { summary_type: string; is_available: boolean }[];
  facilities?: { facility_type: string; is_available: boolean }[];
};

const fetchCafeList = async ({
  page,
  pageSize,
  query,
  summary,
}: {
  page: number;
  pageSize: number;
  query: string | null;
  summary: string | null;
}): Promise<{ items: Cafe[]; nextPage: number | null }> => {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  let supabaseQuery = supabase.from('cafes').select(
    `
      *,
      photos (
        url
      ),
      summaries!inner (
        summary_type,
        is_available
      ),
      facilities (
        facility_type,
        is_available
      )
    `,
    { count: 'exact' }
  );

  if (query) {
    supabaseQuery = supabaseQuery.or(
      `name.ilike.%${query}%,address.ilike.%${query}%`
    );
  }

  if (summary) {
    supabaseQuery = supabaseQuery
      .eq('summaries.summary_type', summary)
      .eq('summaries.is_available', true);
  }

  const { data, error, count } = await supabaseQuery
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  const items = (data as CafeDb[]).map((cafe) => ({
    ...cafe,
    photos: cafe.photos.map((photo) => photo.url),
    summaries: cafe.summaries.reduce((acc, cur) => {
      acc[cur.summary_type] = cur.is_available;
      return acc;
    }, {} as { [key: string]: boolean }),
    facilities: cafe.facilities
      ? cafe.facilities.reduce((acc, cur) => {
          acc[cur.facility_type] = cur.is_available;
          return acc;
        }, {} as { [key: string]: boolean })
      : {},
  }));

  const nextPage = count && from + pageSize < count ? page + 1 : null;

  return {
    items,
    nextPage,
  };
};

const fetchCafeById = async (id: string): Promise<Cafe> => {
  const { data, error } = await supabase
    .from('cafes')
    .select(
      `
      *,
      photos (
        url
      ),
      summaries!inner (
        summary_type,
        is_available
      ),
      facilities (
        facility_type,
        is_available
      )
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;

  const cafe = data as CafeDb;
  return {
    ...cafe,
    photos: cafe.photos.map((photo) => photo.url),
    summaries: cafe.summaries.reduce((acc, cur) => {
      acc[cur.summary_type] = cur.is_available;
      return acc;
    }, {} as { [key: string]: boolean }),
    facilities: cafe.facilities
      ? cafe.facilities.reduce((acc, cur) => {
          acc[cur.facility_type] = cur.is_available;
          return acc;
        }, {} as { [key: string]: boolean })
      : {},
  };
};

const createCafe = async (newCafe: Omit<Cafe, 'id'>): Promise<Cafe> => {
  const { data, error } = await supabase
    .from('cafes')
    .insert(newCafe)
    .select(
      `
      *,
      photos (
        url
      ),
      summaries!inner (
        summary_type,
        is_available
      ),
      facilities (
        facility_type,
        is_available
      )
    `
    )
    .single();

  if (error) throw error;

  const cafe = data as CafeDb;
  return {
    ...cafe,
    photos: cafe.photos.map((photo) => photo.url),
    summaries: cafe.summaries.reduce((acc, cur) => {
      acc[cur.summary_type] = cur.is_available;
      return acc;
    }, {} as { [key: string]: boolean }),
    facilities: cafe.facilities
      ? cafe.facilities.reduce((acc, cur) => {
          acc[cur.facility_type] = cur.is_available;
          return acc;
        }, {} as { [key: string]: boolean })
      : {},
  };
};

const updateCafe = async ({ id, ...cafe }: Cafe): Promise<Cafe> => {
  const { data, error } = await supabase
    .from('cafes')
    .update(cafe)
    .eq('id', id)
    .select(
      `
      *,
      photos (
        url
      ),
      summaries!inner (
        summary_type,
        is_available
      ),
      facilities (
        facility_type,
        is_available
      )
    `
    )
    .single();

  if (error) throw error;

  const cafeDb = data as CafeDb;
  return {
    ...cafeDb,
    photos: cafeDb.photos.map((photo) => photo.url),
    summaries: cafeDb.summaries.reduce((acc, cur) => {
      acc[cur.summary_type] = cur.is_available;
      return acc;
    }, {} as { [key: string]: boolean }),
    facilities: cafeDb.facilities
      ? cafeDb.facilities.reduce((acc, cur) => {
          acc[cur.facility_type] = cur.is_available;
          return acc;
        }, {} as { [key: string]: boolean })
      : {},
  };
};

const deleteCafe = async (id: string): Promise<void> => {
  const { error } = await supabase.from('cafes').delete().eq('id', id);
  if (error) throw error;
};

export const cafeApi = {
  fetchCafeList,
  fetchCafeById,
  createCafe,
  updateCafe,
  deleteCafe,
};
