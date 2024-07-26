import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AppContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("id");
      
      if (storedToken && storedUserId) {
        setAccessToken(storedToken);
        setUserId(storedUserId);
        setIsLoggedIn(true);
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setAccessToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

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
      logout,
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