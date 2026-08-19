import { useState } from 'react'

import './App.css'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import SettingPage from './pages/SettingPage'

function App() {

  return (
    <>
     <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/setting" element={<SettingPage />} />
     </Routes>
    </>
  )
}

export default App
