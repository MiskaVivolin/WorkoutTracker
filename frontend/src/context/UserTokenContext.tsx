import React, { createContext, useContext, useState } from 'react';

type UserTokenContextType = {
  userToken: string | null;
  setToken: (token: string | null) => void;
};

const UserTokenContext = createContext<UserTokenContextType | undefined>(undefined);

export const UserTokenProvider = ({children}: {children: React.ReactNode}) => {
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