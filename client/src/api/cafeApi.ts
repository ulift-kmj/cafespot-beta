import type { Cafe } from '@/types';
import supabase from '@/utils/supabase';

const fetchCafeList = async ({
  page,
  pageSize,
  query,
  summary,
}: {
  page: number;
  pageSize: number;
  query?: string;
  summary?: string;
}): Promise<{ data: Cafe[]; nextPage: number | null }> => {
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

  const nextPage = count && from + pageSize < count ? page + 1 : null;

  return {
    data,
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

  return data;
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

  return data;
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

  return data;
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
