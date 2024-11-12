import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Weather from '../pages/Weather';
import Loans from '../pages/Loans';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminProducts from '../pages/AdminProducts';

function PrivateRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user && allowedRoles.includes(user.role) ? 
    <>{children}</> : 
    <Navigate to="/login" />;
}

export default function Layout() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={
              <PrivateRoute allowedRoles={['admin', 'farmer']}>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/products" element={
              <PrivateRoute allowedRoles={['farmer']}>
                <Products />
              </PrivateRoute>
            } />
            <Route path="/admin/products" element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminProducts />
              </PrivateRoute>
            } />
            <Route path="/weather" element={
              <PrivateRoute allowedRoles={['admin', 'farmer']}>
                <Weather />
              </PrivateRoute>
            } />
            <Route path="/loans" element={
              <PrivateRoute allowedRoles={['farmer']}>
                <Loans />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}