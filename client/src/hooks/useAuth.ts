import React from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import supabase from '@/utils/supabase';
import { authApi } from '@/api/authApi';

// 세션 조회 함수
const fetchSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

// 사용자 역할 조회 함수
const fetchUserRole = async (userId: string) => {
  return authApi.getUserRole(userId);
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  // 세션 쿼리
  const {
    data: session,
    isLoading: isSessionLoading,
    error: sessionError,
  } = useQuery({
    queryKey: ['authSession'],
    queryFn: fetchSession,
  });

  // 사용자 역할 쿼리
  const {
    data: role,
    isLoading: isRoleLoading,
    error: roleError,
  } = useQuery({
    queryKey: ['userRole', session?.user?.id],
    queryFn: () => fetchUserRole(session!.user.id),
    enabled: !!session?.user?.id,
  });

  // 로그인 뮤테이션
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await authApi.login(email, password);
      if (error) throw error;
      if (!data?.user) throw new Error('로그인에 실패했습니다.');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authSession'] });
    },
  });

  // 로그아웃 뮤테이션
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authApi.logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authSession'] });
    },
  });

  // 회원가입 뮤테이션
  const signUpMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await authApi.signUp(email, password);
      if (error) throw error;
      if (!data?.user) throw new Error('회원가입에 실패했습니다.');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authSession'] });
    },
  });

  // 세션 변경 구독
  React.useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ['authSession'] });
      queryClient.invalidateQueries({ queryKey: ['userRole'] });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return {
    // 서버 상태
    session,
    role,
    isLoading: isSessionLoading || isRoleLoading,
    error: sessionError || roleError,

    // 뮤테이션
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    signUp: signUpMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    loginError: loginMutation.error,
    signUpError: signUpMutation.error,
  };
};
