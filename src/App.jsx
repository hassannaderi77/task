import './App.css'
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SettingPage from './pages/SettingPage';
import Login from './pages/login';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';


function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App;