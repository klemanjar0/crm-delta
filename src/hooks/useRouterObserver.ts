import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRoute, setRouterKey } from '../router/redux/reducer.ts';
import { RootState } from '../store';

export const useRouterObserver = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const currentPath = useSelector((state: RootState) => state.router.currentRoute);

  useEffect(() => {
    dispatch(setRouterKey(location.key));

    const newPath = location.pathname;

    if (newPath !== currentPath) {
      dispatch(setCurrentRoute(location.pathname));

      //TODO History
      //window.history.pushState({}, '', location.pathname);
    }
  }, [location]);
};
