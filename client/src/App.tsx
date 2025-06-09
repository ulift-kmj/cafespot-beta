import { FavoriteProvider } from '@/contexts/FavoriteProvider';
import { Outlet } from 'react-router';
import './App.css';

function App() {
  return (
    <FavoriteProvider>
      <Outlet />
    </FavoriteProvider>
  );
}

export default App;
