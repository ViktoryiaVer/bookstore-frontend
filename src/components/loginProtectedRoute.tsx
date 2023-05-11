import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

interface LoginProtectedRouteProps {
  redirectPath?: string;
}

const LoginProtectedRoute: FC<LoginProtectedRouteProps> = ({
  redirectPath = "/login",
}) => {
  const location = useLocation();
  const { isLoggedIn } = useCurrentUser();
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default LoginProtectedRoute;
