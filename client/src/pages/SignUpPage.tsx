import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/commons/LoadingSpinner';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { session, signUp, isSigningUp, signUpError } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // 이미 로그인된 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    signUp({ email, password });
  };

  if (isSigningUp) {
    return <LoadingSpinner />;
  }

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center p-6'>
      <div className='w-full max-w-lg bg-white rounded-lg shadow-lg p-8 md:p-12'>
        <h1 className='text-3xl font-semibold text-center mb-6'>회원가입</h1>
        {signUpError && (
          <p className='text-red-600 text-center mb-6'>{signUpError.message}</p>
        )}
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
            required
          />
          <div className='relative w-full'>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
              required
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600'
            >
              {passwordVisible ? '숨기기' : '보기'}
            </span>
          </div>
          <div className='relative w-full'>
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder='비밀번호 확인'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
              required
            />
            <span
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600'
            >
              {confirmPasswordVisible ? '숨기기' : '보기'}
            </span>
          </div>
          {password !== confirmPassword && (
            <p className='text-red-600 text-center'>
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <button
            type='submit'
            className='w-full py-3 bg-secondary text-primary rounded-lg font-semibold hover:bg-secondary/80'
            disabled={isSigningUp || password !== confirmPassword}
          >
            {isSigningUp ? '회원가입 중...' : '회원가입'}
          </button>
          <div className='text-center'>
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='hover:text-primary text-secondary'
              disabled={isSigningUp}
            >
              이미 계정이 있으신가요? 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
