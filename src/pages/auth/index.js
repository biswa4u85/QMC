import React from 'react';
const Home = React.lazy(() => import('./Home'));
const Signin = React.lazy(() => import('./Signin'));
const Signup = React.lazy(() => import('./Signup'));
const ForgotPassword = React.lazy(() => import('./ForgetPassword'));
const ResetPassword = React.lazy(() => import('./ResetPassword'));
const UnlockScreen = React.lazy(() => import('./UnlockScreen'));
const Forgetusername = React.lazy(() => import('./Forgetusername'));
const Registration = React.lazy(() => import('./Registration'));

export const authRouteConfig = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
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
    element: <ForgotPassword />
  },
  {
    path: '/confirm-signup',
    element: <UnlockScreen />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/forget-username',
    element: <Forgetusername />,
  },
];
