import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import CompactLayout from 'src/layouts/compact';
import AuthModernLayout from 'src/layouts/auth/modern';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// AUTH
const LoginPage = lazy(() => import('src/pages/auth'));
const VerifyPage = lazy(() => import('src/pages/auth'));
const RegisterPage = lazy(() => import('src/pages/auth'));
const NewPasswordPage = lazy(() => import('src/pages/auth'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth'));

// ----------------------------------------------------------------------

export const authRoutes = {
  path: 'auth',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthModernLayout>
          <LoginPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthModernLayout title="Manage the job more effectively with Minimal">
          <RegisterPage />
        </AuthModernLayout>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <VerifyPage /> },
        { path: 'new-password', element: <NewPasswordPage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
      ],
    },
  ],
};
