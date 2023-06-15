import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

interface AdminProtectedRouteProps {
  redirectPath?: string;
}

const AdminProtectedRoute: FC<AdminProtectedRouteProps> = ({
  redirectPath = "/",
}) => {
  const { isLoggedIn, isAdmin } = useCurrentUser();
  const location = useLocation();

  if (!isLoggedIn) redirectPath = "/login";

  if (!isAdmin) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
