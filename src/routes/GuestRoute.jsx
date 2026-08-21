import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/authContext";

function GuestRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  console.log("GuestRoute:", { isAuthenticated });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
