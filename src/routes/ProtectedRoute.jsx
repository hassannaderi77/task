import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/authContext";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;