import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { toast } from "react-toastify";

interface AdminProtectedRouteProps {
  redirectPath?: string;
}

const AdminProtectedRoute: FC<AdminProtectedRouteProps> = ({
  redirectPath = "/",
}) => {
  const { isLoggedIn, isAdmin } = useCurrentUser();
  const location = useLocation();
  let errorMessage: string = "You have insufficient rights to see this content";

  if (!isLoggedIn) {
    redirectPath = "/login";
    errorMessage = "Please, login to see this content";
  }

  if (!isAdmin) {
    toast.error(errorMessage);
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
