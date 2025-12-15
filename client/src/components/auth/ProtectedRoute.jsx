// client/src/components/auth/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

/**
 * A wrapper component that checks for authentication before rendering a child element.
 * If the user is logged in, it renders the child.
 * Otherwise, it redirects to the login page.
 * * @param {object} props
 * @param {React.ReactElement} props.children - The protected component (e.g., <Dashboard />)
 */
export function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useAuth();
  
  // Display a loader while authentication status is being determined
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    // Redirect to the login page if not authenticated
    // The 'replace' prop ensures the login page replaces the history entry
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if authenticated
  return children;
}