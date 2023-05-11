import { FC, useEffect } from "react";
import { doLogout } from "../services/authenticationService";

interface LogoutProps {}

const Logout: FC<LogoutProps> = () => {
  useEffect(() => {
    doLogout();
    window.location.href = "/";
  }, []);

  return null;
};

export default Logout;
