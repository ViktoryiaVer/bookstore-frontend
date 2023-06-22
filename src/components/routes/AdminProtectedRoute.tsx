import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { toast } from "react-toastify";
import { ROUTES } from "../../constants/routes";
import { TOASTS } from "../../constants/messages";

interface AdminProtectedRouteProps {
  redirectPath?: string;
}

const AdminProtectedRoute: FC<AdminProtectedRouteProps> = ({
  redirectPath = ROUTES.HOME,
}) => {
  const { isLoggedIn, isAdmin } = useCurrentUser();
  const location = useLocation();
  let errorMessage: string = TOASTS.FORBIDDEN;

  if (!isLoggedIn) {
    redirectPath = ROUTES.LOGIN;
    errorMessage = TOASTS.LOGIN_REQUIRED;
  }

  if (!isAdmin) {
    toast.error(errorMessage);
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
