import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './layouts/UserLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'
import MainPage from './pages/user/MainPage.jsx'
import DetailCourse from './pages/user/DetailCourse.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes - Dùng UserLayout làm wrapper */}
        <Route path="/" element={<UserLayout />}>
          {/* Trang chủ */}
          <Route index element={<MainPage />} />

          {/* Trang chi tiết khóa học */}
          <Route path="courses/:id" element={<DetailCourse />} />
        </Route>

        {/* Trang login user - AuthLayout */}
        <Route path="/login" element={<AuthLayout />} />

        {/* Trang login admin - AuthLayout */}
        <Route path="/admin/login" element={<AuthLayout isAdmin={true} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
