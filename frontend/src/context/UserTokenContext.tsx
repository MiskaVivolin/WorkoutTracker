import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserTokenContextType } from '../types/utilTypes';

const UserTokenContext = createContext<UserTokenContextType | undefined>(undefined);

export const UserTokenProvider = ({children}: {children: ReactNode}) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const setToken = (token: string | null) => {
    setUserToken(token);
  };

  const contextValue: UserTokenContextType = {
    userToken,
    setToken,
  };

  return (
    <UserTokenContext.Provider value={contextValue}>
      {children}
    </UserTokenContext.Provider>
  );
};

export const useUserToken = () => {
  const context = useContext(UserTokenContext);
  if (!context) {
    throw new Error('useUserToken must be used within a UserTokenProvider');
  }
  return context;
};