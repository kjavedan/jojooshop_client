import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { AuthGuard } from 'src/auth/guard';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

//USER
const UserProfilePage = lazy(() => import('src/pages/user/profile'));
const UserOrdersPage = lazy(() => import('src/pages/user/orders'));
const UserOrderDetailsPage = lazy(() => import('src/pages/user/order'));

// ----------------------------------------------------------------------

export const userRoutes = [
  {
    path: 'user',
    element: (
      <MainLayout>
        <AuthGuard>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </AuthGuard>
      </MainLayout>
    ),
    children: [
      { element: <UserProfilePage />, index: true },
      { path: 'profile', element: <UserProfilePage /> },
      { path: 'orders', element: <UserOrdersPage /> },
      { path: 'order/:id', element: <UserOrderDetailsPage /> },
    ],
  },
];
