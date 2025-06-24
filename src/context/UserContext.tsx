import { createContext, useState, useContext, ReactNode, FC } from "react";

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: "ADMIN" | "USER";
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const USER_STORAGE_KEY = 'eventhub_user';
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const setUser = (userData: User | null) => {
    setUserState(userData);
    if (userData) {
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } else {
      sessionStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve essere usato dentro UserProvider");
  }
  return context;
};


export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!sessionStorage.getItem(USER_STORAGE_KEY);
  }
  return false;
};
