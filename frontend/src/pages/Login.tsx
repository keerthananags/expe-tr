import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, TrendingUp, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { LampContainer } from "../components/ui/lamp";

const S: any = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative" as const,
    fontFamily: "'DM Sans', sans-serif",
  },
  radial: {
    position: "absolute" as const,
    inset: 0,
    background:
      "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(108,99,255,0.18), transparent)",
    pointerEvents: "none" as const,
  },
  dots: {
    position: "absolute" as const,
    inset: 0,
    backgroundImage:
      "radial-gradient(circle, rgba(108,99,255,0.06) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    pointerEvents: "none" as const,
  },
  card: {
    position: "relative" as const,
    zIndex: 10,
    width: "100%",
    maxWidth: "440px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    background: "rgba(16,16,24,0.9)",
    border: "1px solid rgba(108,99,255,0.15)",
    borderRadius: "24px",
    padding: "40px 36px",
    boxShadow:
      "0 0 0 1px rgba(108,99,255,0.05), 0 24px 64px rgba(0,0,0,0.5), 0 0 80px rgba(108,99,255,0.08)",
    backdropFilter: "blur(24px)",
  },
  logo: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 8px 32px rgba(108,99,255,0.4)",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "26px",
    color: "#f1f5f9",
    textAlign: "center" as const,
    marginBottom: "6px",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center" as const,
    marginBottom: "32px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "#94a3b8",
    marginBottom: "6px",
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
  },
  inputWrap: {
    position: "relative" as const,
    marginBottom: "4px",
  },
  iconLeft: {
    position: "absolute" as const,
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#4b5563",
    pointerEvents: "none" as const,
    display: "flex",
  },
  eyeBtn: {
    position: "absolute" as const,
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#4b5563",
    cursor: "pointer",
    display: "flex",
    padding: 0,
  },
  errorText: {
    fontSize: "12px",
    color: "#ff4d7d",
    marginTop: "4px",
  },
  fieldGroup: {
    marginBottom: "18px",
  },
  submitBtn: (loading: boolean) => ({
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: loading
      ? "rgba(108,99,255,0.5)"
      : "linear-gradient(135deg, #6c63ff, #818cf8)",
    color: "white",
    fontWeight: 700,
    fontSize: "15px",
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    marginTop: "8px",
    boxShadow: "0 4px 24px rgba(108,99,255,0.35)",
    transition: "all 0.2s",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.01em",
  }),
  footer: {
    textAlign: "center" as const,
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "24px",
  },
  link: {
    color: "#818cf8",
    textDecoration: "none",
    fontWeight: 600,
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(16,217,160,0.08)",
    border: "1px solid rgba(16,217,160,0.15)",
    borderRadius: "10px",
    padding: "10px 14px",
    marginBottom: "28px",
    fontSize: "13px",
    color: "#10d9a0",
  },
};

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back! 👋");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string, hasError: boolean, hasRightIcon = false) => ({
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${
      hasError ? "#ff4d7d" : focused === field ? "#6c63ff" : "rgba(255,255,255,0.08)"
    }`,
    borderRadius: "12px",
    padding: hasRightIcon ? "12px 44px 12px 42px" : "12px 14px 12px 42px",
    fontSize: "14px",
    color: "#f1f5f9",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box" as const,
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: focused === field ? "0 0 0 3px rgba(108,99,255,0.15)" : "none",
  });

  return (
    <>
      <LampContainer>
      <style>{`
        input::-webkit-input-placeholder { color: rgba(241,245,249,0.75); }
        input::-moz-placeholder { color: rgba(241,245,249,0.75); }
        input:-ms-input-placeholder { color: rgba(241,245,249,0.75); }
        input:-moz-placeholder { color: rgba(241,245,249,0.75); }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
          -webkit-text-fill-color: #f1f5f9 !important;
          box-shadow: inset 0 0 0px 9999px rgba(16,16,24,0.9) !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={S.card}
      >
        <div style={S.logo}>
          <TrendingUp size={24} color="white" />
        </div>

        <h1 style={S.title}>Welcome Back</h1>
        <p style={S.subtitle}>Sign in to your FlowLedger account</p>

        {/* Trust badge */}
        <div style={S.badge}>
          <Sparkles size={14} />
          <span>Secure JWT-protected session</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={S.fieldGroup}>
            <label style={S.label}>Email Address</label>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><Mail size={15} /></span>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                style={inputStyle("email", !!errors.email)}
              />
            </div>
            {errors.email && <p style={S.errorText}>⚠ {errors.email}</p>}
          </div>

          {/* Password */}
          <div style={S.fieldGroup}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ ...S.label, margin: 0 }}>Password</label>
            </div>
            <div style={S.inputWrap}>
              <span style={S.iconLeft}><Lock size={15} /></span>
              <input
                type={showPw ? "text" : "password"}
                placeholder="Your password"
                value={form.password}
                onChange={handleChange("password")}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                style={inputStyle("password", !!errors.password, true)}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} style={S.eyeBtn}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && <p style={S.errorText}>⚠ {errors.password}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            style={S.submitBtn(loading)}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <span style={{
                  width: "16px", height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  display: "inline-block",
                }} />
                Signing in...
              </span>
            ) : "Sign In →"}
          </motion.button>
        </form>

        <p style={S.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={S.link}>Create one free</Link>
        </p>
      </motion.div>
    </LampContainer>

    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
      input::placeholder { color: #374151; }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 100px #10101800 inset !important;
        -webkit-text-fill-color: #f1f5f9 !important;
      }
    `}</style>
    </>
  );
};
