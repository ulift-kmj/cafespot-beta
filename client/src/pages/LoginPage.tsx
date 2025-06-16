import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/commons/LoadingSpinner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { session, login, isLoggingIn, loginError } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // 이미 로그인된 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isLoggingIn) {
    return <LoadingSpinner />;
  }

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center p-6'>
      <div className='w-full max-w-lg bg-white rounded-lg shadow-lg p-8 md:p-12'>
        <h1 className='text-3xl font-semibold text-center mb-6'>로그인</h1>
        {loginError && (
          <p className='text-destructive text-center mb-6'>
            {loginError.message}
          </p>
        )}
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
            required
          />
          <div className='relative w-full'>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
              required
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-muted-foreground'
            >
              {passwordVisible ? '숨기기' : '보기'}
            </span>
          </div>
          <button
            type='submit'
            className='w-full py-3 text-primary bg-secondary rounded-lg font-semibold hover:bg-secondary/80'
          >
            로그인
          </button>
          <div className='text-center'>
            <button
              type='button'
              onClick={() => navigate('/signup')}
              className='hover:text-primary text-secondary'
            >
              계정이 없으신가요? 회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
