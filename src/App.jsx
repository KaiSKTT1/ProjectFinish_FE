import React from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './layouts/UserLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminCoursesPage from './pages/admin/AdminCoursesPage.jsx'
import CreateCoursePage from './pages/admin/CreateCoursePage.jsx'
import EditCoursePage from './pages/admin/EditCoursePage.jsx'
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage.jsx'
import AdminOrdersPage from './pages/admin/AdminOrdersPage.jsx'
import AdminUsersPage from './pages/admin/AdminUsersPage.jsx'
import MainPage from './pages/user/MainPage.jsx'
import DetailCourse from './pages/user/DetailCourse.jsx'
import CoursesPage from './pages/user/CoursesPage.jsx'
import CoursesOfCategory from './pages/user/CoursesOfCategory.jsx'
import CartPage from './pages/user/CartPage.jsx'
import MyCoursesPage from './pages/user/MyCoursesPage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes - Dùng UserLayout làm wrapper */}
        <Route path="/" element={<UserLayout />}>
          {/* Trang chủ */}
          <Route index element={<MainPage />} />

          {/* Trang tất cả khóa học */}
          <Route path="courses" element={<CoursesPage />} />

          {/* Trang khóa học theo category */}
          <Route path="courses/:name/:id" element={<CoursesOfCategory />} />

          {/* Trang chi tiết khóa học */}
          <Route path="courses/:id" element={<DetailCourse />} />

          {/* Trang giỏ hàng */}
          <Route path="cart" element={<CartPage />} />

          {/* Trang khóa học của tôi */}
          <Route path="my-courses" element={<MyCoursesPage />} />
        </Route>

        {/* Trang login user - AuthLayout */}
        <Route path="/login" element={<AuthLayout />} />

        {/* Trang login admin - Độc lập, không có Header/Footer */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin routes - Protected with ROLE_ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="courses/create" element={<CreateCoursePage />} />
          <Route path="courses/edit/:id" element={<EditCoursePage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
