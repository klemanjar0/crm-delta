import React from 'react';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const authContext = createContext(false);

export const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return <authContext.Provider value={isLoggedIn}>{props.children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
