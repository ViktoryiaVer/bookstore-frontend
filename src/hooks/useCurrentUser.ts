import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useCurrentUser = () => {
  const { username, role } = useContext(UserContext) || {};
  const isAdmin = role === "ADMIN";
  const isLoggedIn = !!username;
  return { username, role, isAdmin, isLoggedIn };
};

export default useCurrentUser;
