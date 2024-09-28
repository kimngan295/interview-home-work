import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />; // Điều hướng nếu không đăng nhập
  }

  return children; // Nếu đã đăng nhập, hiển thị nội dung
};

export default ProtectedRoute;
