import { Routes, Route } from "react-router-dom";
import GuestRoute from "./GuestRoute";

import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";
import PageLoading from "../components/ui/PageLoading";
import RoleRoute from "./RoleRoute";

import { lazy, Suspense } from "react";

// const LandingPage = lazy(() => import("../pages/LandingPage"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const SettingPage = lazy(() => import("../pages/SettingPage"));

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public Routes */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/landing" element={<LandingPage />} /> */}
          <Route path="/aboutus" element={<AboutUs />} />
        </Route>

        {/* Guest Routes */}

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes */}

        <Route element={<ProtectedRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/setting" element={<SettingPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;

// AppRoutes
// │
// ├── PublicLayout
// │     ├── /landingPage
// │     ├── /
// │     ├── /login
// │     └── /aboutus
// │
// └── PrivateLayout
//       ├── /dashboard
//       └── /setting
