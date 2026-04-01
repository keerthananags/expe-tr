import React from "react";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="p-8">No user data available</div>;
  }

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#0a0a0f", color: "#e5e7eb" }}>
      <h1 style={{ marginBottom: "1rem", fontSize: "1.75rem" }}>Profile</h1>
      <div style={{ background: "#111827", borderRadius: "12px", padding: "1.25rem", maxWidth: "520px" }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user._id}</p>
        <button
          style={{ marginTop: "1rem", padding: "0.65rem 1rem", borderRadius: "0.65rem", background: "#6c63ff", color: "#fff", border: "none", cursor: "pointer" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};