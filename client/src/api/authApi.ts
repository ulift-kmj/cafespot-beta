import type { AuthResponse } from '@supabase/supabase-js';
import supabase from '@/utils/supabase';

// 로그인
const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return { data, error };
};

// 회원가입
const signUp = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return { data, error };
};

// 로그아웃
const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// 사용자 역할 가져오기
const getUserRole = async (userId: string): Promise<'admin' | 'user'> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data?.role || 'user';
};

export const authApi = { login, signUp, logout, getUserRole };
