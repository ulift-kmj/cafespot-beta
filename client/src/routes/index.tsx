import Layout from '@/components/commons/Layout';
import CafeDetailPage from '@/pages/CafeDetailPage';
import CafeListPage from '@/pages/CafeListPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout isDetailPage={false} />,
    children: [
      {
        index: true,
        Component: CafeListPage,
      },
      {
        path: '/cafe/:id',
        Component: CafeDetailPage,
      },
    ],
  },
]);
