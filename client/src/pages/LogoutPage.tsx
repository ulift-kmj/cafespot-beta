// logout 페이지
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/commons/LoadingSpinner';

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoggingOut) {
    return <LoadingSpinner />;
  }

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center p-6'>
      <div className='w-full max-w-lg bg-white rounded-lg shadow-lg p-8 md:p-12'>
        <h1 className='text-3xl font-semibold text-center mb-6'>로그아웃</h1>
        <div className='flex flex-col gap-6'>
          <button
            onClick={handleLogout}
            className='w-full py-3 text-primary bg-secondary rounded-lg font-semibold hover:bg-secondary/80'
          >
            로그아웃
          </button>
          <div className='text-center'>
            <button
              onClick={() => navigate('/')}
              className='hover:text-primary text-secondary'
            >
              메인 페이지로 이동
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
