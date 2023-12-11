import React, { useEffect } from 'react';
import { useRouterObserver } from '../hooks/useRouterObserver.ts';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Root: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const routeKey = useSelector((state: RootState) => state.router.currentRoute);

  useRouterObserver();

  useEffect(() => {
    if (!isLoggedIn && !routeKey.includes('signin')) {
      navigate('/signin', { replace: true });
    }
  }, [isLoggedIn, routeKey]);

  return <Outlet />;
};

export default Root;
