import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,10,15,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(108,99,255,0.1)",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 24px",
        height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "10px",
            background: "linear-gradient(135deg, #6c63ff, #818cf8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(108,99,255,0.4)",
          }}>
            <TrendingUp size={16} color="white" />
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800, fontSize: "18px",
            background: "linear-gradient(135deg, #6c63ff, #10d9a0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            FlowLedger
          </span>
        </Link>

        {/* User menu */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", padding: "8px 14px",
              cursor: "pointer", color: "#f1f5f9",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(108,99,255,0.3)";
              e.currentTarget.style.background = "rgba(108,99,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            {/* Avatar */}
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 700, color: "white",
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <span style={{ fontSize: "14px", fontWeight: 500 }}>{user?.name?.split(" ")[0]}</span>
            <ChevronDown size={14} style={{ color: "#6b7280", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "rgba(16,16,24,0.98)",
                  border: "1px solid rgba(108,99,255,0.15)",
                  borderRadius: "14px", padding: "8px",
                  minWidth: "200px",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* User info */}
                <div style={{
                  padding: "10px 12px 12px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  marginBottom: "6px",
                }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9" }}>{user?.name}</p>
                  <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{user?.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 12px", borderRadius: "10px",
                    background: "none", border: "none",
                    color: "#ff4d7d", fontSize: "14px", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background 0.15s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,77,125,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >
                  <LogOut size={14} /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};
