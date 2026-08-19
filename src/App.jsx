import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SettingPage from "./pages/SettingPage";
import Login from "./pages/login";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/Navbar";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;

// https://task-seven-gules.vercel.app/
