import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './layouts/UserLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ - UserLayout */}
        <Route path="/" element={<UserLayout />} />

        {/* Trang login user - AuthLayout */}
        <Route path="/login" element={<AuthLayout />} />

        {/* Trang login admin - AuthLayout nhưng khác Page */}
        <Route path="/admin/login" element={<AuthLayout isAdmin={true} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
