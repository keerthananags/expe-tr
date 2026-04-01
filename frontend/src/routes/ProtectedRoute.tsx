import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, logout } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!user) {
        setChecking(false);
        return;
      }

      try {
        await api.get("/protected");
        setChecking(false);
      } catch (err) {
        logout();
        setChecking(false);
      }
    };

    verify();
  }, [user, logout]);

  if (loading || checking) return (
    <div className="flex items-center justify-center h-screen bg-night">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};