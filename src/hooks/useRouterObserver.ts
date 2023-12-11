import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackScene, setCurrentRoute, setRouterKey } from '../router/redux/reducer.ts';
import { RootState } from '../store';

export const useRouterObserver = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPath = useSelector((state: RootState) => state.router.currentRoute);
  const backScene = useSelector((state: RootState) => state.router.backScene);

  useEffect(() => {
    dispatch(setRouterKey(location.key));

    const newPath = location.pathname;

    if (newPath !== currentPath) {
      dispatch(setCurrentRoute(location.pathname));

      //TODO History
      //window.history.pushState({}, '', location.pathname);
    }
  }, [location]);

  useEffect(() => {
    if (!backScene) {
      return;
    }
    navigate(backScene, { relative: 'path', replace: true });
    dispatch(setBackScene(null));
  }, [backScene]);
};
