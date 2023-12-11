import { createBrowserRouter } from 'react-router-dom';
import Root from './Root.tsx';
import SignInPage from '../features/auth/pages/signin/SignInPage.tsx';
import LoginPage from '../features/auth/pages/login/LoginPage.tsx';
import RegisterPage from '../features/auth/pages/register/RegisterPage.tsx';
import Dashboard from '../features/dashboard/pages/Dashboard/Dashboard.tsx';
import Planes from '../features/dashboard/pages/Planes/Planes.tsx';
import DefaultOutlet from '../features/dashboard/pages/DefaultOutlet/DefaultOutlet.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />,

        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
      // {
      //   path: 'settings/',
      //   element: <div>Settings!</div>,
      // },
      {
        path: '',
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <DefaultOutlet />,
          },
          {
            path: 'planes',
            element: <Planes />,
          },
          {
            path: 'flights',
            element: <div>flights</div>,
          },
          {
            path: 'pilots',
            element: <div>pilots</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
