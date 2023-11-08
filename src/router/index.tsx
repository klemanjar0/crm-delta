import { createBrowserRouter } from 'react-router-dom';
import Root from './Root.tsx';
import SignInPage from '../features/auth/pages/signin/SignInPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />, //<ExpandingText text={'Hello world!'} size={'large'} color={'white'} active fontWeight={900} />,
      },
      {
        path: 'settings',
        element: <div>Settings!</div>,
      },
    ],
  },
]);

export default router;
