import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{
      loading,
      setLoading,
      isLoggedIn,
      setIsLoggedIn,
      userId,
      setUserId,
      accessToken,
      setAccessToken,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
