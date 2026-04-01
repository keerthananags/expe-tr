import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LampContainer } from "../components/ui/lamp";
import { ArrowRight, Shield, TrendingUp, PieChart } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    desc: "Visual charts that reveal your spending patterns at a glance.",
    color: "#6c63ff",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "JWT-protected routes. Your data stays yours, always.",
    color: "#10d9a0",
  },
  {
    icon: PieChart,
    title: "Category Insights",
    desc: "9 smart categories to organize income and expenses perfectly.",
    color: "#ff4d7d",
  },
];

export const Landing = () => (
  <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
    {/* Hero with Lamp */}
    <LampContainer>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
        style={{ textAlign: "center", maxWidth: "700px" }}
      >
        <span style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 500,
          background: "rgba(108,99,255,0.1)",
          color: "#6c63ff",
          border: "1px solid rgba(108,99,255,0.2)",
          marginBottom: "24px",
          letterSpacing: "0.05em",
        }}>
          ✦ Your Financial Command Center
        </span>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          lineHeight: 1.1,
          marginBottom: "24px",
          background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #10d9a0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Track Every<br />Rupee, Effortlessly
        </h1>

        <p style={{
          color: "#6b7280",
          fontSize: "1.1rem",
          maxWidth: "480px",
          margin: "0 auto 40px",
          lineHeight: 1.7,
        }}>
          Beautiful expense tracking with real-time insights,
          smart categorization, and protected data.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/register" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "14px 28px", borderRadius: "12px",
            background: "#6c63ff", color: "white",
            fontWeight: 600, fontSize: "15px",
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(108,99,255,0.35)",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#5a52e0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#6c63ff")}
          >
            Get Started Free <ArrowRight size={16} />
          </Link>
          <Link to="/login" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "14px 28px", borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)", color: "white",
            fontWeight: 600, fontSize: "15px", textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(108,99,255,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </LampContainer>

    {/* Features */}
    <div style={{
      maxWidth: "1100px", margin: "0 auto",
      padding: "80px 24px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
    }}>
      {features.map(({ icon: Icon, title, desc, color }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          style={{
            background: "rgba(22,22,31,0.85)",
            border: "1px solid rgba(108,99,255,0.1)",
            borderRadius: "20px",
            padding: "32px",
            transition: "border-color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}40`)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(108,99,255,0.1)")}
        >
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: `${color}15`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "20px",
          }}>
            <Icon size={22} style={{ color }} />
          </div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700, fontSize: "1.1rem",
            color: "#357dc4", marginBottom: "10px",
          }}>{title}</h3>
          <p style={{ color: "#747d8f", fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</p>
        </motion.div>
      ))}
    </div>

    {/* Bottom CTA */}
    <div style={{ textAlign: "center", padding: "40px 24px 80px" }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          display: "inline-block",
          padding: "40px 60px",
          background: "rgba(108,99,255,0.05)",
          border: "1px solid rgba(108,99,255,0.15)",
          borderRadius: "24px",
        }}
      >
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1.5rem", fontWeight: 700,
          color: "#f1f5f9", marginBottom: "20px",
        }}>
          Ready to take control of your finances?
        </p>
        <Link to="/register" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "14px 32px", borderRadius: "12px",
          background: "#6c63ff", color: "white",
          fontWeight: 600, fontSize: "15px", textDecoration: "none",
        }}>
          Start for Free <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </div>
);