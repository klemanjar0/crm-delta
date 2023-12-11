import { RouterProvider } from 'react-router-dom';
import './App.css';
import '../style.sass';
import router from './router';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store';
import useLocalStorage from './hooks/useLocalStorage.ts';
import { useEffect } from 'react';
import { setAccessToken } from './features/auth/redux/reducer.ts';

function App() {
  // const dispatch = useDispatch();
  // const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // const [persistedToken, setPersistedToken] = useLocalStorage('accessToken', accessToken);
  //
  // useEffect(() => {
  //   dispatch(setAccessToken(persistedToken));
  // }, []);
  //
  // useEffect(() => {
  //   setPersistedToken(accessToken);
  // }, [accessToken]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
