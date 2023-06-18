import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { toast } from "react-toastify";

interface LoginProtectedRouteProps {
  redirectPath?: string;
}

const LoginProtectedRoute: FC<LoginProtectedRouteProps> = ({
  redirectPath = "/login",
}) => {
  const location = useLocation();
  const { isLoggedIn } = useCurrentUser();
  if (!isLoggedIn) {
    toast.error("Please, login to see this content");
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default LoginProtectedRoute;
