import Layout from '@/components/commons/Layout';
import CafeDetailPage from '@/pages/CafeDetailPage';
import CafeListPage from '@/pages/CafeListPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import LogoutPage from '@/pages/LogoutPage';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignUpPage,
  },
  {
    path: '/logout',
    Component: LogoutPage,
  },
  // {
  //   path: '/admin',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       Component: AdminDashboardPage,
  //     },
  //     {
  //       path: 'cafes',
  //       Component: AdminCafePage,
  //     },
  //     {
  //       path: 'cafes/:id/edit',
  //       Component: AdminCafeEditPage,
  //     },
  //     {
  //       path: 'cafes/new',
  //       Component: AdminCafeNewPage,
  //     },
  //   ],
  // },
]);
