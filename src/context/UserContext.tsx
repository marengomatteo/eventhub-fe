import { createContext, useState, useContext, ReactNode, FC, useEffect } from "react";
import { getBaseURL } from "../utils";

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

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getBaseURL("authentication").get("/me");
      setUserState(userData.data);
    };
    fetchUser();
  }, []);

  const [user, setUserState] = useState<User | null>(
    null
  );


  const setUser = (userData: User | null) => {
    setUserState(userData);

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
