import React from 'react';
const Signin = React.lazy(() => import('./Signin'));
const Signup = React.lazy(() => import('./Signup'));
const ForgotPassword = React.lazy(() => import('./ForgetPassword'));
const ResetPassword = React.lazy(() => import('./ResetPassword'));
const UnlockScreen = React.lazy(() => import('./UnlockScreen'));

export const authRouteConfig = [
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forget-password',
    element: <ForgotPassword />,
  },
  {
    path: '/confirm-signup',
    element: <UnlockScreen />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
];
