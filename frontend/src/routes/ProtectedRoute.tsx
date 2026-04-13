import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsAuthenticated(false);
        setChecking(false);
        return;
      }

      try {
        await api.get("/protected");
        setIsAuthenticated(true);
        setChecking(false);
      } catch (err) {
        logout();
        setIsAuthenticated(false);
        setChecking(false);
      }
    };

    verify();
  }, [user, logout]);

  // Handle back button - if not authenticated, redirect to login
  useEffect(() => {
    const handlePopState = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  // Prevent accessing protected routes without auth
  useEffect(() => {
    if (!checking && !isAuthenticated) {
      // Clear any history state that might allow back navigation to protected pages
      window.history.replaceState(null, "", "/login");
    }
  }, [checking, isAuthenticated]);

  if (loading || checking) return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#0a0a0f"
    }}>
      <div style={{
        width: "32px",
        height: "32px",
        border: "2px solid #6c63ff",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};