import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/reducers.ts';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas.ts';

const sagaMiddleware = createSagaMiddleware();

const initStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = initStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
