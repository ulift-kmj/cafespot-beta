import Layout from '@/components/commons/Layout';
import ProtectedRoute from '@/hoc/ProtectedRoute';
import CafeDetailPage from '@/pages/CafeDetailPage';
import CafeListPage from '@/pages/CafeListPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import LogoutPage from '@/pages/LogoutPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminCafeListPage from '@/pages/AdminCafeListPage';
import AdminEditCafePage from '@/pages/AdminEditCafePage';
import AdminNewCafePage from '@/pages/AdminNewCafePage';
import { createBrowserRouter, Outlet } from 'react-router';

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
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole='admin'>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        Component: AdminDashboardPage,
      },
      {
        path: 'cafes',
        Component: AdminCafeListPage,
      },
      {
        path: 'cafes/:id/edit',
        Component: AdminEditCafePage,
      },
      {
        path: 'cafes/new',
        Component: AdminNewCafePage,
      },
    ],
  },
]);
