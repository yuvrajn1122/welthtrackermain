import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // Extract token from cookies

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  // Decode the token (without using a library like jwt-decode)
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedToken = JSON.parse(window.atob(base64));

  // Get the expiration time and compare with current time
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  if (decodedToken.exp < currentTime) {
    // Token expired, clear cookies and redirect to login
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear token cookie
    return <Navigate to="/login" replace />; // Redirect to login
  }

  // Check if the token will expire in less than 1 minute
  if (decodedToken.exp - currentTime <= 60) {
    // Token will expire in less than 1 minute, clear cookies and redirect to login
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Clear token cookie
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return <Outlet />; // If token is valid and not expiring soon, render child routes
};

export default PrivateRoute;
