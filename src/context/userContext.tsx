import { FC, createContext } from "react";
import { getCurrentUser } from "../services/authenticationService";
import UserInfo from "../types/userInfoForContext";

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserInfo | undefined>({
  username: "",
  role: "",
});

export const UserProvider: FC<UserContextProps> = ({ children }) => {
  const user = getCurrentUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
