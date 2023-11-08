import { createBrowserRouter } from 'react-router-dom';
import Root from './Root.tsx';
import SignInPage from '../features/auth/pages/signin/SignInPage.tsx';
import LoginPage from '../features/auth/pages/login/LoginPage.tsx';

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
        ],
      },
      {
        path: 'settings/',
        element: <div>Settings!</div>,
      },
    ],
  },
]);

export default router;
