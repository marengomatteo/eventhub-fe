import { createContext, useState, useContext, ReactNode, FC } from "react";

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: "admin" | "user";
}
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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

export const isUserAdmin = () => {
  const { user } = useUser();
  return user?.role === "admin";
}
