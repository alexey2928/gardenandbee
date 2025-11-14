import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";

const ProtectedRoute = ({ children }) => {
  const context = useContext(AuthContext) || {}; // fallback if null

  const user = context.user ?? null;
  const authLoading = context.authLoading ?? true;

  // Show loading only while Firebase is checking the session
  if (authLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress size={60} />
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in but NOT admin
  if (!user.claims?.admin) {
    return <Navigate to="/" replace />;
  }

  // Authenticated & admin → allow access
  return children;
};

export default ProtectedRoute;
