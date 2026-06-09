import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import UserDashboard from "../pages/user/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";
import Reservations from "../pages/admin/Reservations";
import Users from "../pages/admin/Users";

import Payments
  from "../pages/admin/Payments";

import NewBooking
  from "../pages/user/NewBooking";

import MyBookings
  from "../pages/user/MyBookings";

import Profile
  from "../pages/user/Profile";

import Logs from "../pages/admin/Logs";

import NewReservationAdmin
  from "../pages/admin/NewReservationAdmin";

import Home from "../pages/public/Home";

import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Locales from "../pages/admin/Locales";


function AppRoutes() {
  return (

    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />
      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute role="admin">
            <Logs />
          </ProtectedRoute>
        }
      />
      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reservations"
        element={
          <ProtectedRoute role="admin">
            <Reservations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/new-reservation"
        element={
          <ProtectedRoute role="admin">
            <NewReservationAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/pagos"
        element={
          <ProtectedRoute role="admin">
            <Payments />
          </ProtectedRoute>
        }
      />

      {/* User */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role="cliente">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/new-booking"
        element={
          <ProtectedRoute role="cliente">
            <NewBooking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/my-bookings"
        element={
          <ProtectedRoute role="cliente">
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/profile"
        element={
          <ProtectedRoute role="cliente">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/locales"
        element={
          <ProtectedRoute role="admin">
            <Locales />
          </ProtectedRoute>
        }
      />
    </Routes>

  );

}

export default AppRoutes;