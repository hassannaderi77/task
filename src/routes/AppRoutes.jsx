import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import GuestRoute from "./GuestRoute";

import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";
import PageLoading from "../components/ui/PageLoading";
import RoleRoute from "./RoleRoute";

import NotFound from "../pages/NotFound";
import HistoryPage from "../pages/HistoryPage";


const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Demo = lazy(() => import("../pages/Demo"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const SettingPage = lazy(() => import("../pages/SettingPage"));
const AdminPanel = lazy(() => import("../pages/AdminPanel"));


function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public Routes */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        
          <Route path="/demo" element={<Demo />} />
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
            <Route path="/history" element={<HistoryPage />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
  <Route element={<PrivateLayout />}>
    <Route path="/admin" element={<AdminPanel />} />
  </Route>
</Route>

        <Route path="*" element={<NotFound />} />
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
