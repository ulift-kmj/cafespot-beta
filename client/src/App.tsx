import '@/App.css';
import { FavoriteProvider } from '@/contexts/FavoriteProvider';
import { Outlet } from 'react-router';

function App() {
  return (
    <FavoriteProvider>
      <Outlet />
    </FavoriteProvider>
  );
}

export default App;
