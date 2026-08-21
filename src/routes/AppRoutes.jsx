import { Routes, Route } from "react-router-dom";
import GuestRoute from "./GuestRoute";

import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";

import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import Login from "../pages/login";
import AboutUs from "../pages/AboutUs";

import Dashboard from "../pages/Dashboard";
import SettingPage from "../pages/SettingPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Route>

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Private Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<SettingPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;

// AppRoutes
// │
// ├── PublicLayout
// │     ├── /
// │     ├── /home
// │     ├── /login
// │     └── /aboutus
// │
// └── PrivateLayout
//       ├── /dashboard
//       └── /setting
