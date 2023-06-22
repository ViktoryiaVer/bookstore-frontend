import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { toast } from "react-toastify";
import { ROUTES } from "../../constants/routes";
import { TOASTS } from "../../constants/messages";

interface LoginProtectedRouteProps {
  redirectPath?: string;
}

const LoginProtectedRoute: FC<LoginProtectedRouteProps> = ({
  redirectPath = ROUTES.LOGIN,
}) => {
  const location = useLocation();
  const { isLoggedIn } = useCurrentUser();
  if (!isLoggedIn) {
    toast.error(TOASTS.LOGIN_REQUIRED);
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default LoginProtectedRoute;
